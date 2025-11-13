/**
 * Opens a file in a new pane or tab within Obsidian.
 * @param {TFile} TFile The TFile object representing the file to open
 * @returns {void}
 */
function openFileInNewPane(TFile) {
  let firstLeaf = null;
  let secondLeaf = null;
  app.workspace.iterateRootLeaves((leaf) => {
    if (leaf.type === 'leaf') {
      if (!firstLeaf) {
        firstLeaf = leaf;
      } else if (!secondLeaf) {
        secondLeaf = leaf;
      }
    }
  });

  // === DEBUG ===
  const prevActiveLeaf = app.workspace.getLeaf(false);

  if (secondLeaf) {
    // Open the file in the second leaf (new tab)
    app.workspace.setActiveLeaf(secondLeaf);
    app.workspace.getLeaf('tab').openFile(TFile);
    console.log('Opened in second leaf (new tab).');
  } else {
    // Open the file in a new vertical pane
    app.workspace.getLeaf('split', 'vertical').openFile(TFile);
    console.log('Opened in new vertical pane.');
  }

  // === DEBUG ===
  const currActiveLeaf = app.workspace.getLeaf(false);
  console.log('Previous Active Leaf:', prevActiveLeaf);
  console.log('Current Active Leaf:', currActiveLeaf);
  console.log(
    'activeLeaf === prevActiveLeaf:',
    currActiveLeaf === prevActiveLeaf
  );
}

async function promptOpenFile(tp) {
  const ignorePattern = /^\s*[^a-zA-Z0-9]/;
  const ignoreFolders = [
    'assets',
    'attachments',
    'bases',
    'templates',
    'config',
    'files',
    'excalidraw',
  ];
  const ignoreFile = (file) => {
    const filename = file.name.toLowerCase();
    const parentName = file.parent.name.toLowerCase();
    const lowerPath = file.path.toLowerCase();
    if (ignorePattern.test(filename)) return true;
    if (ignorePattern.test(parentName) || ignorePattern.test(lowerPath))
      return true;
    for (const folder of ignoreFolders) {
      if (lowerPath.startsWith(folder) || lowerPath.includes(`/${folder}/`)) {
        return true;
      }
    }
    return false;
  };

  const activeFile = await app.workspace.getActiveFile();

  const files = app.vault
    .getMarkdownFiles()
    // exclude ignored files and the active file
    .filter((file) => !ignoreFile(file) && file.path !== activeFile?.path)
    // sort by active file's folder proximity, then filename alphabetically
    .sort((a, b) => {
      const aInSameFolder = a.parent.path === activeFile.parent.path ? 0 : 1;
      const bInSameFolder = b.parent.path === activeFile.parent.path ? 0 : 1;
      if (aInSameFolder !== bInSameFolder) {
        return aInSameFolder - bInSameFolder;
      }
      return a.name.localeCompare(b.name);
    });

  // Ask the user to select a file. ESC is also allowed.
  const filenames = files.map((file, index) => `[${index + 1}] ${file.path}`);
  const selected = await tp.system.suggester(
    filenames,
    files,
    false,
    'Select a file to open (ESC to cancel)',
    30
  );

  if (selected) {
    openFileInNewPane(selected);
  } else {
    console.log('File selection cancelled.');
  }
}

module.exports = promptOpenFile;
