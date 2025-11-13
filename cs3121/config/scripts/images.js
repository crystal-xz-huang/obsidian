module.exports = {
  updatePaths: updateImagePaths,
  clearUnused: clearUnusedImages,
};

async function updateImagePaths() {
  const imageFiles = getImages();

  // Rename `.excalidraw.png` and `.excalidraw.svg` to just `.png` and `.svg`
  const excalidrawImages = imageFiles.filter((file) =>
    file.name.match(/\.excalidraw\.(png|svg)$/)
  );

  await Promise.all(
    excalidrawImages.map(async (file) => {
      const newFileName = file.name.replace('.excalidraw.png', '.png');
      const newFilePath = await app.fileManager.getAvailablePathForAttachment(
        newFileName
      );
      await app.fileManager.renameFile(file, newFilePath);
    })
  );

  /**
   *  Make sure all media files are in the configured attachments folder.
   *  Now, the problem is I don't know how to get the configured attachments folder.
   *  A possible workaround is to just get the path for a sample attachment file, then extract the folder part from that path.
   */
  let attachmentFolder = 'assets/attachments/'; // default fallback
  const samplePath = await app.fileManager.getAvailablePathForAttachment(
    'sample.png'
  );
  const lastSlashIndex = samplePath.lastIndexOf('/');
  if (lastSlashIndex !== -1)
    attachmentFolder = samplePath.substring(0, lastSlashIndex + 1);

  // Move all image files to the attachments folder
  const filesToMove = imageFiles.filter(
    (file) => !file.path.startsWith(attachmentFolder)
  );

  await Promise.all(
    filesToMove.map(async (file) => {
      const newFilePath = await app.fileManager.getAvailablePathForAttachment(
        file.name
      );
      await app.fileManager.renameFile(file, newFilePath);
    })
  );

  const totalCount = excalidrawImages.length + filesToMove.length;
  const notice = new Notice('', 7000);
  const messageEl = notice.messageEl;
  messageEl.createEl('strong', { text: 'Success' });
  if (totalCount === 0) {
    messageEl.createEl('div', { text: 'No images to update.' });
  } else {
    messageEl.createEl('div', { text: `Updated ${totalCount} image(s).` });
  }
}

async function clearUnusedImages(tp) {
  const imageFiles = getImages();

  // Find images that are not linked from any note
  const unusedImages = imageFiles.filter((file) => {
    const backlinks = getBacklinks(file);
    return backlinks.length === 0;
  });

  if (unusedImages.length === 0) {
    new Notice('No unused images found.', 7000);
    return;
  }

  // Confirm deletion
  const deleteImagesNotice = new Notice('', 0);
  const messageEl = deleteImagesNotice.messageEl;
  deleteImagesNotice.messageEl.createEl('div', {
    text: `Delete ${unusedImages.length} unused image(s)?`,
  });
  // Show list of unused images
  const listEl = messageEl.createEl('ul');
  listEl.setAttr('padding-inline-start', '16px');
  unusedImages.forEach((file) => {
    listEl.createEl('li', { text: file.basename });
  });
  // Add confirm and cancel buttons
  const contentEl = deleteImagesNotice.containerEl;
  contentEl.setAttr('margin', 'auto');
  contentEl
    .createEl('button', { text: 'Cancel' })
    .addEventListener('click', () => {
      deleteImagesNotice.hide();
    });
  contentEl.setAttr('margin', 'auto');
  contentEl
    .createEl('button', {
      cls: 'mod-cta',
      text: 'Confirm',
    })
    .addEventListener('click', async () => {
      for (const file of unusedImages) {
        await app.vault.trash(file, true);
      }
      deleteImagesNotice.hide();
      new Notice(`${unusedImages.length} image(s) in total deleted.`, 7000);
    });
}

function getImages() {
  const extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'];
  // Get all image files in the vault
  const imageFiles = app.vault
    .getFiles()
    .filter((file) => extensions.includes(file.extension));

  return imageFiles;
}

function getBacklinks(file) {
  const backlinks = app.metadataCache.resolvedLinks;

  const linkedFiles = Object.entries(backlinks)
    .filter(([sourcePath, links]) => links[file.path])
    .map(([sourcePath]) => app.vault.getFileByPath(sourcePath));

  return linkedFiles;
}
