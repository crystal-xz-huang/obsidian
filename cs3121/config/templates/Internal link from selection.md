[[<% tp.file.cursor()%>|<%*
  let displayText = tp.file.selection().trim();
  if (!displayText) displayText = 'here →';
  tR += displayText
_%>
]]