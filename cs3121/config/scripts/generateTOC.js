/**
 * Normalize heading levels to ensure consistent indentation in the TOC.
 * Ensures the minimum heading level is 1, and adjusts levels to maintain relative hierarchy.
 * @param {Array} headings - Array of heading objects with 'level' property
 * @returns {Array} Normalized array of heading objects
 */
function normalizeHeadingIndentation(headings) {
  if (!Array.isArray(headings) || headings.length === 0) return [];
  // Step 1: normalize so minimum = 1
  const minLevel = Math.min(...headings.map((h) => h.level));
  const levelOffset = minLevel > 1 ? minLevel - 1 : 0;
  let normalized = headings.map((h) => ({
    ...h,
    level: h.level - levelOffset,
  }));
  // Step 2: adjust relative hierarchy
  let stack = [];
  normalized = normalized.map((h, i) => {
    if (i === 0) {
      h.level = 1;
      stack = [1];
      return h;
    }
    if (h.level > normalized[i - 1].level) {
      // going deeper → only allow one level deeper
      h.level = normalized[i - 1].level + 1;
      stack.push(h.level);
    } else if (h.level === normalized[i - 1].level) {
      // same level → sibling
      h.level = normalized[i - 1].level;
      stack[stack.length - 1] = h.level;
    } else {
      // going back up → find closest ancestor level
      while (stack.length && stack[stack.length - 1] >= h.level) {
        stack.pop();
      }
      h.level = stack.length > 0 ? stack[stack.length - 1] : 1;
    }
    return h;
  });
  return normalized;
}

/**
 * Generate a list of wikilinks to all headings in the given file,
 * with the option to format as a callout (block-quote).
 * Keeps the list indentation consistent even if the headings are not in order
 * e.g. h1, h3 -> level 1, level 2
 * @param {Object} tp Templater object
 * @param {TFile} file The file whose headings will be listed.
 * @param {string} sourcePath The path of the file where the links will be inserted. Defaults to current file if not provided.
 * @param {boolean} callout Whether to format as a callout (block-quote)
 * @param {Array} exclusions List of heading texts to exclude from the TOC (case-insensitive)
 * @returns {string} List of wikilinks to all headings in the current file
 * @description
 * - `tp.app.metadataCache.getFileCache(file)` to get the file cache, which includes headings
 * - `tp.obsidian.stripHeadingForLink(heading)` Prepares headings for linking by stripping out some bad combinations of special characters that could break links.
 * - `tp.app.fileManager.generateMarkdownLink(toFile, sourcePath, subpath, displayText)` to generate markdown links to headings
 */
function generateListOfHeadings(
  tp,
  file,
  sourcePath,
  callout = false,
  exclusions = []
) {
  const { generateAnchorLink } = tp.user.link_utils(tp);

  // Get headings from the file's metadata cache
  const app = tp.app;
  const fileCache = app.metadataCache.getFileCache(file);
  const { headings, frontmatter } = fileCache || {};

  if (!headings) {
    console.log(`No headings found in ${sourcePath}.`);
    return '';
  }

  // Filter out excluded headings (case-insensitive)
  const isIgnored = (h) => {
    const headingText = h.heading.toLowerCase();
    const fileTitle = file.basename.toLowerCase();
    const fileAliases = fileCache.frontmatter?.aliases || [];
    const aliasList = Array.isArray(fileAliases)
      ? fileAliases.map((a) => a.toLowerCase())
      : [fileAliases.toLowerCase()];

    // Exclude if in exclusions list
    if (Array.isArray(exclusions) && exclusions.length > 0){
      exclusions = exclusions.map((e) => e.toLowerCase());
      if (exclusions.includes(headingText)) return true;
    }

    // Exclude if h1 and matches file title or any alias
    const aliasMatch = aliasList.includes(headingText);
    const titleMatch = headingText === fileTitle;
    const isH1 = h.level === 1;
    const onlyH1 = headings.filter((hd) => hd.level === 1).length === 1;
    return isH1 && onlyH1 && (titleMatch || aliasMatch);
  };

  let filteredHeadings = headings.filter((h) => !isIgnored(h));
  if (filteredHeadings.length === 0) {
    console.log(`No valid headings found in ${sourcePath} after exclusions.`);
    return '';
  }

  // Process headings to generate TOC entries, keeping the list indentation consistent
  // even if the headings are not in order, or starting from h2 or h3
  let normalizedHeadings = normalizeHeadingIndentation(filteredHeadings);
  let headers = normalizedHeadings
    .map((h) => {
      const headerLevel = h.level - 1; // zero-based level for indentation
      const headerLink = generateAnchorLink(file, sourcePath, h.heading);
      // Add indentation (4 spaces per level) and bullet-point (-)
      const formatted = `${'    '.repeat(headerLevel) + '- ' + headerLink}`;
      // If callout, prepend  block-quote (>)
      return callout ? `>${formatted}` : formatted;
    })
    .join('\n');

  return headers;
}

async function generateTOC(tp, file, sourcePath, callout = false) {
  if (!(file instanceof tp.obsidian.TFile) || (sourcePath && typeof sourcePath !== 'string')) {
    console.error('Invalid arguments. Expected (tp, TFile, string|undefined, boolean|undefined).');
    return '';
  }
  // Default callout to false if not a boolean
  if (typeof callout !== 'boolean') callout = false;
  // Default to current file path if not provided
  if (!sourcePath) sourcePath = tp.file.path(true);

  const START_MARKER = '%%toc-start%%';
  const END_MARKER = '%%toc-end%%';
  const EXCLUSIONS = ['Table of Contents'];

  const list = generateListOfHeadings(tp, file, sourcePath, callout, EXCLUSIONS);
  const header = callout
    ? '>[!summary]+ Table of Contents\n>\n'
    : '## Table of Contents\n\n';

  const newTOC = `${START_MARKER}\n\n${header}${list}\n\n${END_MARKER}`;
  const app = tp.app;

  // If no start/end markers are found in the file,
  // return the full TOC with markers for manual insertion
  const content = await app.vault.read(file);
  if (!content.includes(START_MARKER) || !content.includes(END_MARKER)) {
    return newTOC;
  }

  // If markers are found, replace the content between them
  const tocRegex = new RegExp(`${START_MARKER}[\\s\\S]*?${END_MARKER}`, 'm');
  const updatedContent = content.replace(tocRegex, newTOC);

  // Write the updated content back to the file
  await app.vault.modify(file, updatedContent);
  return '';
}

module.exports = generateTOC;
