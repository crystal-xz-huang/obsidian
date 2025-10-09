function mapFileHeadingsToLinks(tp, file, parentFolder = null) {
  const headings = tp.app.metadataCache.getFileCache(file).headings || [];
  const file_title = encodeURIComponent(file.basename);

  const dict = {};
  for (const item of headings) {
    const header_text = item.heading
      .replace(/\[\[(?:[^\|\n]*?\|)?(.*?)\]\]/g, '$1') // strip [[wikilinks]]
      .replace(/\[(.*?)\]\(.*?\)/g, '$1'); // strip [links](url)
    const header_url = encodeURIComponent(item.heading.replace(/:|\?|&/g, ''));
    const link = `[${header_text}](${file_title}.md#${header_url})`;

    // display text is: foldername > term
    const display_text = parentFolder
      ? `${parentFolder.name} > ${header_text}`
      : header_text;
    dict[display_text] = link;
  }

  // sort alphabetically by display text
  const sortedDict = Object.fromEntries(
    Object.entries(dict).sort((a, b) => a[0].localeCompare(b[0]))
  );

  return sortedDict;
}

function isReferenceFile(tp, item) {
  return (
    item instanceof tp.obsidian.TFile &&
    item.extension === 'md' &&
    item.basename.toLowerCase().includes('glossary')
  );
}

function isReferenceFolder(tp, item) {
  return (
    (item instanceof tp.obsidian.TFolder &&
      item.name.toLowerCase().includes('glossary')) ||
    item.name.toLowerCase().includes('reference')
  );
}

// Recursive helper
function collectReferencesinFolder(tp, folder, dict = {}) {
  for (const item of folder.children) {
    if (isReferenceFile(tp, item)) {
      Object.assign(dict, mapFileHeadingsToLinks(tp, item, folder));
    } else if (isReferenceFolder(tp, item)) {
      collectReferencesinFolder(tp, item, dict);
    }
  }
  return dict;
}

// Walk up the folder hierarchy to find all reference folders
function collectReferencesUpwards(tp, start) {
  let current = start;
  let dict = {};
  while (current) {
    collectReferencesinFolder(tp, current, dict);
    current = current.parent;
  }
  return dict;
}

async function suggestReferences(tp) {
  const parentFolder = tp.app.vault.getFolderByPath(tp.file.folder(true));
  if (!parentFolder) {
    tp.user.notice('Active file is not in a folder.', 'error');
    return;
  }

  const references = collectReferencesUpwards(tp, parentFolder);
  // Show a modal with a list of terms to choose from,
  // arranged alphabetically
  let selectedTerm = await tp.system.suggester(
    Object.keys(references),    // Display text of each item
    Object.values(references),  // Values of each item
    false,
    'Select a reference'
  );

  return selectedTerm || '';
}

module.exports = suggestReferences;
