/**
 * Recursively index a folder and its subfolders/files into a markdown list
 * @param {*} tp
 * @param {TFile} file - The current file to insert the outline into
 * @param {TFolder} rootFolder - The root folder to index
 * @param {number} level - The current indentation level (used for recursion)
 * @returns {string[]} Array of markdown list items representing the folder structure
 */
function doIndexFolder(tp, file, rootFolder, level = 1) {
  const TFolder = tp.obsidian.TFolder;
  const TFile = tp.obsidian.TFile;
  const { generateLink } = tp.user.link_utils(tp);
  const { toTitleCase } = tp.user.case_convert();

  if (!rootFolder || !(rootFolder instanceof TFolder)) {
    console.error(
      `Error: Invalid "rootFolder" argument. Expected TFolder, got ${typeof rootFolder}.`
    );
    return '';
  }

  let ret = '';

  // Sort: files first, folders second
  const children = [...rootFolder.children].sort((a, b) => {
    if (a instanceof TFile && b instanceof TFolder) return -1;
    if (a instanceof TFolder && b instanceof TFile) return 1;
    const a_name = a instanceof TFile ? a.basename : a.name;
    const b_name = b instanceof TFile ? b.basename : b.name;
    return a_name.localeCompare(b_name);
  });

  // Iterate through files and folders, generating markdown list items
  for (const f of children) {
    let label =
      f instanceof TFile
        ? generateLink(f, file.path, { linkToFirstHeader: false, useAliases: true, breadcrumb: false })
        : `**${toTitleCase(f.name)}:**`;

    let formatted = `${'    '.repeat(level - 1)}- ${label}\n`;
    ret += formatted;

    // Recurse into subfolders/files
    if (f instanceof TFolder) {
      ret += doIndexFolder(tp, file, f, level + 1);
    }
  }

  return ret;
}

async function generateFolderOutline(tp, file, config = {}) {
  const { resolveConfig, directoryListing: defaultConfig } = tp.user.default_config();
  config = resolveConfig(config, defaultConfig);

  // Validate and set defaults for config options
  const START_MARKER = config.startMarker || '%%index-start%%';
  const END_MARKER = config.endMarker || '%%index-end%%';

  const app = tp.app;

  if (!file || !(file instanceof tp.obsidian.TFile)) {
    console.error(`Error: Invalid "file" argument. Expected TFile, got ${typeof file}.`);
    return '';
  }

  const folder = app.vault.getFolderByPath(file.parent.path);
  if (!folder) {
    console.error(`Error: Failed to find parent folder for: ${file.parent.path}`);
    return '';
  }

  // Prepare the heading
  let header = '';
  if (config.callout) {
    header = `\n>[!${config.calloutType}]+ ${config.title}\n>\n`;
  } else {
    const hashes = '#'.repeat(config.headingLevel);
    header = `${hashes} ${config.title}\n\n`;
  }

  // Filter out the current file from the outline
  folder.children = folder.children.filter(
    (item) => !(item instanceof tp.obsidian.TFile && item.path === file.path)
  );

  const listings = doIndexFolder(tp, file, folder, 1, config.callout);
  if (!listings) {
    console.error('No files or folders found in the current directory.');
    return '';
  }

  // If callout, each line needs to start with '>'
  const list = config.callout
    ? listings
        .split('\n')
        .map((line) => (line.trim() ? `>${line}` : line))
        .join('\n')
    : listings;

  let newIndexSection = `${START_MARKER}\n${header}${list}\n${END_MARKER}`;

  // If no start/end markers are found in the file,
  // return the full TOC with markers for manual insertion
  const content = await app.vault.read(file);
  if (!content.includes(START_MARKER) || !content.includes(END_MARKER)) {
    return newIndexSection;
  }

  // If markers are found, replace the content between them
  const indexRegex = new RegExp(`${START_MARKER}[\\s\\S]*?${END_MARKER}`, 'm');
  const updatedContent = content.replace(indexRegex, newIndexSection);
  // Write the updated content back to the file
  await app.vault.modify(file, updatedContent);
  return '';
}

module.exports = generateFolderOutline;
