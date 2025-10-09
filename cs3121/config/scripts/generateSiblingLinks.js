/**
 * Create a list of links to sibling notes in the current note's folder.
 * This script generates a markdown list of links to all notes in the same directory
 * as the current note, excluding the current note itself.
 *
 * Usage:
 * 1. Place this script in your Obsidian vault under `config/scripts/`.
 * 2. Run the script while editing a note to insert the list of sibling notes.
 *
 * Note: Ensure you have the necessary permissions to read files in the vault.
 */
function getSiblingLinks(tp, callout = false) {
  const debugLog = (label, data) => console.log(`${label} \n\n`, data);
  const { isIndex, isIgnored } = tp.user.file_utils(tp);
  const { generateLink } = tp.user.link_utils(tp);

  // Get the current file and its directory
  const currentDir = tp.app.vault.getFolderByPath(tp.file.folder(true));
  if (!currentDir) {
    console.error(
      `Error: Current directory not found for path: ${tp.file.path}`
    );
    return '';
  }
  if (currentDir.children.length === 0) {
    debugLog('Empty directory:', currentDir.path);
    return '';
  }

  const currentFileName = tp.file.name;
  const currentDirName = currentDir.name;

  // Read all files in the current directory
  // Filter out non-markdown files and the current file itself
  const siblingNotes = currentDir.children.filter(
    (file) =>
      file instanceof tp.obsidian.TFile &&
      file.extension === 'md' &&
      file.name !== currentFileName &&
      file.name !== currentDirName &&
      !isIndex(file) &&
      !isIgnored(file)
  );

  if (siblingNotes.length === 0) {
    debugLog('No sibling notes found in directory:', currentDir.path);
    return '';
  }

  // Generate markdown links for each sibling note
  return siblingNotes
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((file) => {
      const link = generateLink(file, tp.file.path(true), {
        linkToFirstHeader: true,
        useAliases: true,
        breadcrumb: false,
      });
      const item = `- ${link}`;
      return callout ? `>${item}` : item;
    })
    .join('\n');
}

async function generateSiblingLinks(tp, config = {}) {
  const { siblingLinks: defaultConfig, resolveConfig } = tp.user.default_config();

  const START_MARKER = config.startMarker || '%%sibling-links-start%%';
  const END_MARKER = config.endMarker || '%%sibling-links-end%%';

  // Get the current file
  const file = tp.file.find_tfile(tp.file.path(true));
  if (!(file instanceof tp.obsidian.TFile)) {
    console.error('Error: Current file not found or invalid.');
    return '';
  }

  // Resolve and validate config
  config = resolveConfig(config, defaultConfig);

  // Generate the list of sibling links
  const links = getSiblingLinks(tp, config.callout);
  if (!links) {
    console.log('No sibling links to insert.');
    return '';
  }

  // Prepare the heading if required
  let header = '';
  if (config.callout) {
    header = `>[!${config.calloutType}]+ ${config.title}\n`;
  } else {
    const hashes = '#'.repeat(config.headingLevel);
    header = `${hashes} ${config.title}\n`;
  }

  const newLinksSection = header
    ? `${START_MARKER}\n\n${header}${links}\n\n${END_MARKER}`
    : `${START_MARKER}\n${links}\n${END_MARKER}`;

  // Insert or replace the sibling links section in the current file
  const content = await tp.app.vault.read(file);
  if (!content.includes(START_MARKER) || !content.includes(END_MARKER)) {
    // If no start/end markers are found in the file, return for manual insertion
    console.log(
      `No start/end marker found in ${file.path}. Please insert the following section manually:`
    );
    console.log(newLinksSection);
    return newLinksSection;
  }

  // If start/end markers are found, replace the content between them
  const regex = new RegExp(`${START_MARKER}[\\s\\S]*?${END_MARKER}`, 'm');
  const newContent = content.replace(regex, newLinksSection);
  await tp.app.vault.modify(file, newContent);
  console.log('Sibling links section updated.');
  return '';
}

module.exports = generateSiblingLinks;
