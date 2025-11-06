<%*
/*
THIS IS A JAVASCRIPT TEMPLATER FOR OBSIDIAN NOTES
It creates either an inline footnote or a regular footnote
https://github.com/SilentVoid13/Templater/discussions/1367
*/

// Input: Prompt the user for the footnote type
const footnoteType = await tp.system.suggester(["Inline Footnote", "Regular Footnote"], ["Inline Footnote", "Regular Footnote"], true);

if (footnoteType === "Inline Footnote") {
  const inlineFootnoteContent = await tp.system.prompt("Write your inline footnote here", null, true);
  await tp.file.cursor_append(`^[${inlineFootnoteContent}]`);
} else {
  const footnoteTitle = await tp.system.prompt("Name your footnote", null, true);
  await tp.file.cursor_append(`[^${footnoteTitle}]`);
}
%>