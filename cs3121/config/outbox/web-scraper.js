const isEmptyString = (str) => !str || str.trim().length === 0;
const isValidUrl = (str) => {
  // basic checks
  if (typeof str !== 'string' || isEmptyString(str)) return false;
  // check if we can use URL web API
  if (typeof URL !== 'undefined') {
    try {
      new URL(str);
      return true;
    } catch (e) {
      return false;
    }
  }
  // fallback to regex check: must start with http:// or https://
  // followed by at least one non-whitespace character
  const url_pattern = /^(https?:\/\/[^\s]+)$/i;
  return url_pattern.test(str);
};

/**
 * Simple HTML encoder/decoder
 * Handles the basic HTML entities by default.
 * @see https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
 */
const htmlEnDeCode = (function () {
  let charToEntityRegex, entityToCharRegex, charToEntity, entityToChar;

  function resetCharacterEntities() {
    charToEntity = {};
    entityToChar = {};

    // Add default entities (see list below)
    // [Reference]: https://html.spec.whatwg.org/multipage/named-characters.html
    // [Wikipedia Reference]: https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references
    addCharacterEntities({
      '&amp;': '&',
      '&gt;': '>',
      '&lt;': '<',
      '&quot;': '"',
      '&#39;': "'",
      '&nbsp;': ' ',
      '&copy;': '©',
      '&reg;': '®',
      '&eacute;': 'é',
      '&mdash;': '—',
      '&ndash;': '–',
      '&hellip;': '…',
      '&apos;': "'",
    });
  }

  function addCharacterEntities(newEntities) {
    const charKeys = [];
    const entityKeys = [];
    for (const key in newEntities) {
      const echar = newEntities[key];
      entityToChar[key] = echar;
      charToEntity[echar] = key;
      charKeys.push(echar);
      entityKeys.push(key);
    }
    charToEntityRegex = new RegExp('(' + charKeys.join('|') + ')', 'g');
    entityToCharRegex = new RegExp(
      '(' + entityKeys.join('|') + '|&#[0-9]{1,5};?|&#x[0-9a-fA-F]{1,4};?)',
      'g'
    );
  }

  function htmlEncode(value) {
    const htmlEncodeReplaceFn = function (match, capture) {
      return charToEntity[capture];
    };
    return !value
      ? value
      : String(value).replace(charToEntityRegex, htmlEncodeReplaceFn);
  }

  function htmlDecode(value) {
    const htmlDecodeReplaceFn = function (match, capture) {
      if (capture in entityToChar) return entityToChar[capture];
      if (capture.startsWith('&#x') || capture.startsWith('&#X')) {
        return String.fromCharCode(parseInt(capture.substr(3), 16));
      }
      if (capture.startsWith('&#')) {
        const num = capture.replace(/[&#;]/g, '');
        return String.fromCharCode(parseInt(num, 10));
      }
      return capture;
    };

    return !value
      ? value
      : String(value).replace(entityToCharRegex, htmlDecodeReplaceFn);
  }

  resetCharacterEntities();

  return {
    htmlEncode,
    htmlDecode,
    addCharacterEntities,
  };
})();

function decodeHtmlEntities(str) {
  if (!str || typeof str !== 'string') return '';
  // Try using a temporary DOM element if available
  if (typeof document !== 'undefined') {
    const el = document.createElement('textarea');
    el.innerHTML = str;
    return el.value;
  }
  // Fallback to regex-based decoding
  return htmlEnDeCode.htmlDecode(str);
}

function parseHtml(html) {
  if (!html || typeof html !== 'string' || html.length === 0) return null;

  // Use DOMParser if available
  if (typeof DOMParser !== 'undefined') {
    try {
      const doc = new DOMParser().parseFromString(html, 'text/html');

      const title = doc.querySelector('title')?.textContent.trim() || '';

      const description =
        doc
          .querySelector('meta[name="description"]')
          ?.getAttribute('content')
          ?.trim() || '';

      const ogTitle =
        doc
          .querySelector('meta[property="og:title"]')
          ?.getAttribute('content')
          ?.trim() || '';

      const ogDescription =
        doc
          .querySelector('meta[property="og:description"]')
          ?.getAttribute('content')
          ?.trim() || '';
      return { title, description, ogTitle, ogDescription };
    } catch (e) {
      console.warn('DOMParser parse failed', e);
      return null;
    }
  }

  // Regex fallback if DOMParser is not available
  console.warn('DOMParser not available, using regex fallback.');
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = decodeHtmlEntities(titleMatch ? titleMatch[1].trim() : '');

  const descrMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const description = decodeHtmlEntities(descrMatch ? descrMatch[1].trim() : '');

  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
  const ogTitle = decodeHtmlEntities(ogTitleMatch ? ogTitleMatch[1].trim() : '');

  const ogDescrMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
  const ogDescription = decodeHtmlEntities(ogDescrMatch ? ogDescrMatch[1].trim() : '');

  return { title, description, ogTitle, ogDescription };
}

async function fetchPageMetadata(url) {
  if (!isValidUrl(url)) return null;

  try {
    const response = await requestUrl({ url });
    const html = response.text;
    if (!html) {
      console.warn('No HTML content retrieved from the URL.');
      return null;
    }
  } catch (e) {
    console.error('Error fetching URL:', e);
    return null;
  }

  // Try using DOMParser if available
  let { title, description, ogTitle, ogDescription } = parseHtml(html);
  return { title, description, ogTitle, ogDescription };
}
