const isEmptyString = (str) => !str || str.trim().length === 0;
const isValidUrl = (str) => {
  // basic checks
  if (typeof str !== 'string' || isEmptyString(str)) return false;
  // check if we can use URL web API
  if (typeof URL !== "undefined") {
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


function htmlParse(htmlString) {
  // Basic validation
  if (!htmlString || typeof htmlString !== 'string' || htmlString.length === 0) return '';

  let decoded = null;

  // If DOMParse is available, parse and extract text content
  const parser = new DOMParser();
  if (parser !== undefined) {
    console.log('Using DOMParser to decode HTML entities.');
    const doc = parser.parseFromString(htmlString, "text/html");
    const error = doc.querySelector("parsererror");
    if (!error) {
      decoded = doc.documentElement.textContent;
    } else {
      console.warn("DOMParser error:", error.textContent);
    }
  }

  // If document is available, use a temporary textarea element
  if (typeof document !== 'undefined' && decoded === null) {
    let el = document.createElement("textarea");
    el.innerHTML = htmlString;
    decoded = el.value;
  }

  // Fallback: use the regex-based decoding from htmlEnDeCode
  if (decoded === null) {
    console.log('Falling back to regex-based HTML entity decoding.');
    decoded = htmlParse(htmlString);
  }

  console.log(`"${htmlString}" parsed to "${decoded}"`);
  return decoded;
}


async function getPageMetadata(url) {
  try {
    // Ensure we have a valid URL
    if (!isValidUrl(url)) return null;

    // Use Obsidian's built-in API requestUrl to fetch the page
    const response = await requestUrl({ url });

    // Get the text content of the response (which is the HTML)
    const html = response.text;
    if (!html) {
      console.warn('No HTML content retrieved from the URL.');
      return null;
    };

    // Get the HTML metadata:
    const title_pattern = /<title[^>]*>([\s\S]*?)<\/title>/i;
    const og_title_pattern = /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i;
    const descr_pattern = /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i;
    const og_descr_pattern = /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i;

    // (1) Extract <title>
    const titleMatch = html.match(title_pattern);
    const title = htmlParse(titleMatch ? titleMatch[1].trim() : '');

    // (2) Extract <meta name="description">
    const descrMatch = html.match(descr_pattern);
    const description = htmlParse(descrMatch ? descrMatch[1].trim() : '');

    // (3) Extract OpenGraph title <meta property="og:title" content="...">
    const ogTitleMatch = html.match(og_title_pattern);
    const ogTitle = htmlParse(ogTitleMatch ? ogTitleMatch[1].trim() : '');

    // (4) Extract OpenGraph description <meta property="og:description" content="...">
    const ogDescrMatch = html.match(og_descr_pattern);
    const ogDescription = htmlParse(ogDescrMatch ? ogDescrMatch[1].trim() : '');

    return { title, description, ogTitle, ogDescription };
  } catch (err) {
    console.error('Failed to fetch metadata:', err);
    return null;
  }
}

module.exports = function () {
  return {
    getPageMetadata,
    htmlEnDeCode,
  };
};
