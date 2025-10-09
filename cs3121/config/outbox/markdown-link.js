// Validation helpers
const isEmptyString = (str) => !str || str.trim().length === 0;
const isValidUrl = (str) => {
  // basic checks
  if (typeof str !== 'string' || isEmptyString(str)) return false;
  // check if we can use URL web API
  if (typeof URL !== "undefined") {
    try {
      new URL(str);
      return true;
    } catch (e) {
      return false;
    }
  }
  // fallback to regex check: must start with http:// or https://
  // followed by at least one non-whitespace character
  const url_pattern = /^(https?:\/\/[^\s]+)$/i;
  return url_pattern.test(str);
};

/**
 * Generate a markdown link from the clipboard's URL with an
 * auto-generated display text based on the page metadata (if available).
 * If the clipboard content is not a valid URL, it defaults to an empty link.
 * @param {*} tp
 * @returns {string} Markdown link string e.g. [Display Text](URL)
 */
const generateMarkdownLink = async (tp) => {
  // Get the URL from the clipboard
  const url = await tp.system.clipboard();
  let mdLink = '';

  // Validate URL format
  if (!isValidUrl(url)) {
    new Notice("Error: Invalid URL.\nPlease check the console for details.", 5000);
    console.error('Invalid URL:', url);
    mdLink = `[](<% tp.file.cursor() %>)`;
    return mdLink;
  }

  // Fetch page metadata (title, description) using web scraper
  const { getPageMetadata } = tp.user.webScraper();
  const metadata = await getPageMetadata(url);
  console.log(metadata);
  if (!metadata) {
      mdLink = `[<% tp.file.cursor() %>](${url})`;
    return mdLink;
  }

  // Fallback: title -> description -> url
  const display_text = metadata.title || metadata.ogTitle || metadata.description || metadata.ogDescription || `<% tp.file.cursor() %>`;
  return `[${display_text}](${url})`;
};
