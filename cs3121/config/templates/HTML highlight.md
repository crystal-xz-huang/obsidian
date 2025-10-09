<%*
  const highlights = [
    'Yellow',
    'Pink',
    'Blue',
    'Green',
    'Red',
    'Grey',
    'Orange',
    'Purple',
  ]
  let highlight = await tp.system.suggester(highlights, highlights, false, 'Pick a highlight color');
  if (!highlight) {
    tp.user.notice('Error', 'No highlight color selected. Aborting.');
    tr += tp.file.selection()
  } else {
    highlight = highlight.toLowerCase();
    tR += `<mark class=${highlight}>${tp.file.selection()}</mark>`
  }
-%>