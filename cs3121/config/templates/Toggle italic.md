<%*
  const editor = tp.app.workspace.activeLeaf.view.editor;
  if (!editor) {
    console.error('Error: No active editor found.');
    return '';
  }

  let curPosition = editor.getCursor().line;
  let lineText = editor.getLine(curPosition);

  let selectedText = tp.file.selection();
  selectedText = selectedText.trim();

  let replacement;
  if (/^<i>[\s\S]+<\/i>$/.test(selectedText)) {
    replacement = selectedText.replace(/^<i>([\s\S]+)<\/i>$/, '$1');
  } else if (/^\*[\s\S]+\*$/.test(selectedText)) {
    replacement = selectedText.replace(/^\*([\s\S]+)\*$/, '$1');
  } else {
    replacement = `<i>${selectedText}</i>`;
  }

  editor.replaceSelection(replacement);
-%>