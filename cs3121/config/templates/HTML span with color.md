<%*
  const colors = [
    'Yellow',
    'Pink',
    'Blue',
    'Green',
    'Red',
    'Grey',
    'Orange',
    'Purple',
  ]
  let color = await tp.system.suggester(colors, colors, false, 'Pick a color');
  if (!color) {
    tp.user.notice('Error', 'No color selected. Aborting.');
    tR += tp.file.selection()
  } else {
   color = color.toLowerCase();
    tR += `<span class=${color}>${tp.file.selection()}</span>`
  }
-%>