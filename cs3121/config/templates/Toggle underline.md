<%*
  function toggle_underline(tp) {
    let selectedText = tp.file.selection();
    selectedText = selectedText.trim();
    if (!selectedText) return selectedText;

    let replacement;
    if (/^<u>(.+)<\/u>$/.test(selectedText)) {
      replacement = selectedText.replace(/^<u>(.+)<\/u>$/, '$1');
    } else {
      replacement = `<u>${selectedText}</u>`;
    }

    return replacement;
  }

  tR += toggle_underline(tp)
-%>