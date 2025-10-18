module.exports = {
  markdown: (tp) => generateMarkdownLink(tp),
  wiki: (tp) => generateWikiLink(tp),
}

const emptyString = (str) => !str || str.trim().length === 0;

/**
 * Create an external link from the clipboard URL,
 * fetching the webpage metadata for the display text.
 * @param {*} tp
 * @returns {string} The markdown link
 */
const generateMarkdownLink = async (tp) => {
  const url = await tp.system.clipboard(); // get URL from clipboard

  let mdLink = '';

  // Validate URL format
  const url_pattern = /^(https?:\/\/[^\s]+)$/i;
  if (!url || emptyString(url) || !url_pattern.test(url)) {
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


const generateWikiLink = (tp) => {
  // Internal Link (WikiLink) with selected text as display text
  const selected_text = tp.file.selection();
  if (selected_text && !emptyString(selected_text)) {
    return `[[<% tp.file.cursor()%>|${selected_text}]]`;
  }
  return `[[<% tp.file.cursor()%>]]`;
};
