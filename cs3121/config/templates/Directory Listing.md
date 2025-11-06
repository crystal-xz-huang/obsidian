<%*
  const { isIndex } = tp.user.file_utils(tp);
  const currentFile = tp.file.find_tfile(tp.file.path(true));
  const isIndexFile = isIndex(currentFile);

  let confirm = isIndexFile;
  if (!isIndexFile) {
    confirm = await tp.system.suggester(
      ["[✓]  Yes (i'll remember to add #index-pages later)", '[✕]  No'],
      [true, false],
      false,
      `The current file is not marked as an index file. Continue?`
    ) ?? false;
  }

  if (confirm !== true) {
    tp.user.notice('Error', 'Aborted: current file is not an index file.');
  } else {
    tR += await tp.user.generateDirectoryListing(tp, currentFile, false);
    const msg = [`Generated outline for the "${tp.file.folder(true)}" folder.`];
    if (!isIndexFile) {
      msg.push('Remember to add #index-pages to your file!');
    }
    const duration = isIndexFile ? 5000 : 0;
    tp.user.notice('Success', msg.join('\n'), duration);
  }
-%>
