<%*
//=== State ===
let content = '';
let frontmatter = '---\n';

//=== General Utilities ===
const isNullOrEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

const isFile = (file) => file instanceof tp.obsidian.TFile;
const isFolder = (file) => file instanceof tp.obsidian.TFolder;

const generateLink = (file, sourcePath) => {
  if (!file) return null;
  return app.fileManager.generateMarkdownLink(file, sourcePath);
};

//=== Frontmatter & Content Helpers ===
const initializeFrontmatterAndContent = () => {
  content = '';
  frontmatter = '---\n';
};

const finalizeFrontmatterAndContent = () => {
  frontmatter += '---\n\n';
  return frontmatter + content;
};

const appendContent = (text) => {
  content += text + '\n\n';
};

const appendFrontmatter = (field, value) => {
  if (isNullOrEmpty(value)) return;

  if (Array.isArray(value)) {
    frontmatter += `${field}: [${value.join(', ')}]\n`;
  } else {
    frontmatter += `${field}: ${value}\n`;
  }
};

//=== Feature: Rename File on Creation ===
const promptRenameFile = async () => {
  let title = tp.file.title;
  if (!title.startsWith('Untitled')) return;

  title = await tp.system.prompt('File name');
  title = tp.user.case_convert.toTitleCase(title);
  appendContent(`# ${title}`);

  let existing = tp.file.find_tfile(title);
  if (!existing) {
    await tp.file.rename(title);
    return;
  }

  appendContent(`> WARNING: File named [[${existing.basename}]] already exists.`);

  let counter = 1;
  let newTitle = `${title} ${counter}`;

  while (tp.file.find_tfile(newTitle)) {
    counter += 1;
    newTitle = `${title} ${counter}`;
  }

  await tp.file.rename(newTitle);
};

//=== Feature: Tag Suggestions ===
const suggestTags = async () => {
  const allTags = Object.keys(tp.app.metadataCache.getTags())
    .map((x) => x.replace('#', ''))
    .sort();

  const selectedTags = await tp.system.multi_suggester(
    (item) => item,
    allTags,
    false,
    'Enter tags for this note (press ESC to cancel)'
  );

  if (selectedTags && selectedTags.length > 0) {
    appendFrontmatter('tags', selectedTags);
  }
};

//=== Feature: Module Suggestions ===
const suggestModules = async () => {
  const indexFolderPath = 'mocs/Modules';
  const modulesFolderPath = 'modules';

  const indexTFolder = tp.app.vault.getAbstractFileByPath(indexFolderPath);
  const modulesTFolder = tp.app.vault.getAbstractFileByPath(modulesFolderPath);

  if (!indexTFolder || !isFolder(indexTFolder)) {
    console.error(`Index folder not found at path: ${indexFolderPath}`);
    return;
  }

  if (!modulesTFolder || !isFolder(modulesTFolder)) {
    console.error(`Modules folder not found at path: ${modulesFolderPath}`);
    return;
  }

  const indexes = modulesTFolder.children.filter(
    (file) => isFile(file) && file.extension === 'md'
  );
  const modules = modulesTFolder.children.filter((subfolder) => isFolder(subfolder));

  const indexModuleMap = {};
  indexes.forEach((indexFile) => {
    const sanitizedIndexName = indexFile.basename.toLowerCase();

    const correspondingModule = modules.find((modFolder) => {
      const sanitizedModuleName = modFolder.name.toLowerCase().replace(/^\d+\s*/, '');
      return sanitizedIndexName.includes(sanitizedModuleName);
    });

    if (correspondingModule) {
      indexModuleMap[indexFile.path] = correspondingModule;
    }
  });

  const currentFilePath = tp.file.path;
  let selectedModule;

  for (const [indexPath, moduleFolder] of Object.entries(indexModuleMap)) {
    if (currentFilePath.startsWith(moduleFolder.path)) {
      selectedModule = moduleFolder;
      break;
    }
  }

  if (selectedModule) {
    const modulesLink = generateLink(selectedModule, currentFilePath);
    appendFrontmatter('modules', [modulesLink]);
    return;
  }

  const selectedIndexPath = await tp.system.suggester(
    (item) => item.basename,
    indexes,
    false,
    'Select a module to link this note to (press ESC to skip)'
  );

  if (selectedIndexPath && indexModuleMap[selectedIndexPath]) {
    const moduleFolder = indexModuleMap[selectedIndexPath];
    const modulesLink = generateLink(moduleFolder, currentFilePath);
    appendFrontmatter('modules', [modulesLink]);
  } else if (selectedIndexPath) {
    console.error(`No corresponding module folder found: ${selectedIndexPath}`);
  }
};

//=== Main Flow ===
initializeFrontmatterAndContent();
await promptRenameFile();
await suggestTags();
await suggestModules();
tR += finalizeFrontmatterAndContent();
-%>

<% tp.file.cursor() %>