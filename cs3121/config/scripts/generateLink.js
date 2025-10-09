const emptyString = (str) => !str || str.trim().length === 0;

const generateMarkdownLink = async (tp) => {
  // External Link (Markdown) with clipboard URL if valid
  const selected_text = tp.file.selection();
  const url = await tp.system.clipboard(); // get URL from clipboard

  let mdLink = '';

  // Assumption is:
  // - Selected text is used as display text if available
  // - Clipboard URL is used as link if valid URL
  if (selected_text && !emptyString(selected_text)) {
    mdLink = `[${selected_text}](<% tp.file.cursor() %>)`;
    return mdLink;
  }

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

module.exports = function () {
  return { generateMarkdownLink, generateWikiLink };
};
