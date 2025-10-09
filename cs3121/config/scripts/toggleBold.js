/**
 * Toggles bold formatting for the selected text in Obsidian in <b>...</b> format.
 * @param {*} tp
 * @returns The modified text with bold toggled.
 *
 * WARN: Does not handle toggling of parent elements. That is, if the selection is within an existing bold section,
 * it will only toggle the bold formatting for the selected text itself.
 */

function toggleBold(tp) {
  const BOLD_TAG = /<\/?b>/g;
  const STAR_BOLD = /\*\*/g;

  const editor = tp.app.workspace.activeLeaf.view.editor;
  if (!editor) {
    console.error('Error: No active editor found.');
    return '';
  }

  // Get the cursor position
  let curPosition = editor.getCursor().line;

  // Get the entire line of text at the cursor position
  let lineText = editor.getLine(curPosition);

  // Get the selected text
  let selectedText = tp.file.selection();
  let editorSelectedText = tp.app.workspace.activeLeaf.view.editor.getSelection();

  // Get start and end positions of the selection
  let selectionStart = editor.getCursor('from');
  let selectionEnd = editor.getCursor('to');

  // If nothing is selected → treat cursor as word toggle
  selectedText = selectedText.trim();
  if (!selectedText) {
    selectedText = getWordAt(lineText, selectionStart.ch);
  }
  let startIdx = lineText.indexOf(selectedText, selectionStart.ch);
  if (startIdx === -1) startIdx = selectionStart.ch;
  const endIdx = startIdx + selectedText.length;

  let replacement;

  // CASE 1: already wrapped in <b>...</b> → strip the tags
  if (/^<b>[\s\S]+<\/b>$/.test(selectedText)) {
    replacement = selectedText.replace(/^<b>([\s\S]+)<\/b>$/, '$1');

    // CASE 2: already wrapped in **...** → strip the **
  } else if (/^\*\*[\s\S]+\*\*$/.test(selectedText)) {
    replacement = selectedText.replace(/^\*\*([\s\S]+)\*\*$/, '$1');

    // CASE 3: selection is inside a bolded region → remove surrounding markers in line
  } else if (isSelectionInBold(lineText, startIdx, endIdx)) {
    const before = lineText.slice(0, startIdx);
    const middle = lineText.slice(startIdx, endIdx);
    const after = lineText.slice(endIdx);

    const stripped = (before + middle + after)
      .replace(BOLD_TAG, '')
      .replace(STAR_BOLD, '');
    replacement = stripped.slice(startIdx, startIdx + middle.length);

    // CASE 4: selection touches or neighbors a bold → merge
  } else if (touchesBold(lineText, startIdx, endIdx)) {
    const merged = expandToBold(lineText, startIdx, endIdx);
    const stripped = merged.replace(STAR_BOLD, '').replace(BOLD_TAG, '');
    replacement = `<b>${stripped}</b>`;

    // CASE 5: default: wrap in <b>...</b>
  } else {
    replacement = `<b>${selectedText}</b>`;
  }

  editor.replaceSelection(replacement);

  // Return the replacement text to Templater
  // return replacement;
}

function getWordAt(line, index) {
  const left = line.slice(0, index).search(/\S+$/);
  const right = line.slice(index).search(/\s/);
  if (right < 0) return line.slice(left);
  return line.slice(left, index + right);
}

function isSelectionInBold(line, start, end) {
  const before = line.slice(0, start);
  const after = line.slice(end);
  return (
    (/(<b>[^<]*)$/.test(before) && /^([^<]*<\/b>)/.test(after)) ||
    (/\*\*[^*]*$/.test(before) && /^[^*]*\*\*/.test(after))
  );
}

function touchesBold(line, start, end) {
  const before = line[start - 4] + line.slice(start - 3, start);
  const after = line.slice(end, end + 4);
  return (
    before.includes('<b') ||
    before.includes('**') ||
    after.includes('</b>') ||
    after.includes('**')
  );
}

function expandToBold(line, start, end) {
  // Expand outward to cover whole bold region
  let left = start;
  let right = end;

  while (left > 0 && !line.slice(left - 3, left + 1).match(/<b|\*\*/)) {
    left--;
  }
  while (
    right < line.length &&
    !line.slice(right, right + 4).match(/<\/b|\*\*/)
  ) {
    right++;
  }

  return line.slice(left, right);
}

module.exports = toggleBold;
