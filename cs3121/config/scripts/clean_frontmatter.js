function cleanTagsArray(file, tags) {
  const unwantedTag = (tag) => {
    const unwanted = ['source', 'type', 'module', 'week'];
    return unwanted.some((prefix) => tag.startsWith(prefix));
  };

  let newTags = [];

  // (1) initial filtering and mapping
  newTags = tags
    .map((tag) => {
      if (tag === 'type/problem') return 'examples';
      if (tag === 'type/algorithm') return 'algorithms';
      if (tag === 'type/concept') return 'notes/concepts';
      return tag;
    })
    .filter((tag) => !unwantedTag(tag));

  // (2) add tags based on folder structure
  const mapFolderToTag = {
    'Divide and Conquer': ['topic/divide-and-conquer'],
    'Dynamic Programming': ['topic/dynamic-programming'],
    'Greedy Algorithms': ['topic/greedy'],
    'Graph Algorithms': ['topic/graph', 'algorithms'],
  };
  Object.entries(mapFolderToTag).forEach(([folderName, tagsToAdd]) => {
    if (file.path.includes(folderName)) {
      tagsToAdd.forEach((tag) => {
        if (!tags.includes(tag)) {
          newTags.push(tag);
        }
      });
    }
  });

  // (3) remove duplicates
  newTags = Array.from(new Set(newTags));
  return newTags;
}

const printTagChanges = (originalTags, newTags) => {
  const removedTags = originalTags.filter((tag) => !newTags.includes(tag));
  const addedTags = newTags.filter((tag) => !originalTags.includes(tag));
  if (removedTags.length === 0 && addedTags.length === 0) {
    console.log('%c[=] No tag changes', 'color: gray');
  }
  removedTags.forEach((tag) => {
    console.log(`%c[-] Removed tag: ${tag}`, 'color: red');
  });
  addedTags.forEach((tag) => {
    console.log(`%c[+] Added tag: ${tag}`, 'color: green');
  });
};

async function cleanFrontmatter(tp) {
  const generateLink = (note, sourcePath) => {
    if (!note) return null;
    return tp.app.fileManager.generateMarkdownLink(note, sourcePath);
  };

  await Promise.all(
    tp.app.vault.getMarkdownFiles().map(async (file) => {
      try {
        const pathSegments = file.path.split('/');
        if (
          !pathSegments.includes('modules') ||
          pathSegments.includes('mocs') ||
          file.extension !== 'md'
        ) {
          return;
        }
        await tp.app.fileManager.processFrontMatter(file, (frontmatter) => {
          console.log(`Processing file: ${file.path}`);
          // Add modules links
          const moduleFolders = [
            'Greedy Algorithms',
            'Dynamic Programming',
            'Divide and Conquer',
          ];
          moduleFolders.forEach((module) => {
            if (pathSegments.includes(module)) {
              const moduleNote = tp.app.vault.getAbstractFileByPath(
                `mocs/Modules/${module}.md`
              );
              const link = generateLink(moduleNote, file.path);
              if (link && Array.isArray(frontmatter.modules)) {
                if (!frontmatter.modules.includes(link)) {
                  frontmatter.modules.push(link);
                }
              } else if (link) {
                frontmatter.modules = [link];
              }
              // Make sure its not in the categories field
              if (
                frontmatter.categories &&
                Array.isArray(frontmatter.categories)
              ) {
                frontmatter.categories = frontmatter.categories.filter(
                  (cat) => cat !== module
                );
              }
            }
          });

          const originalTags = frontmatter.tags ? [...frontmatter.tags] : [];
          const newTags = cleanTagsArray(file, originalTags);
          printTagChanges(originalTags, newTags);
          // Delete tags field if empty, else update
          if (newTags.length === 0) {
            delete frontmatter.tags;
          } else {
            frontmatter.tags = newTags;
          }
          return frontmatter;
        });
      } catch (err) {
        console.error(`Failed to process ${file.path}\n\n${err}`);
      }
    })
  );
  console.log('Frontmatter cleaning complete.');
}

module.exports = cleanFrontmatter;
