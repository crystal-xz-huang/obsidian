/**
 * Decode HTML entities in a string
 * @see https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
 * @param {string} value - The string to decode
 * @returns {string} - The decoded string
 */
function htmlDecode(value) {
  if (value == null) return value;

  // === Helper functions ===
  const entityToChar = {
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
  };
  const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const fromCodePointSafe = (cp) => {
    try {
      return String.fromCodePoint(cp);
    } catch {
      return cp <= 0xffff ? String.fromCharCode(cp) : '';
    }
  };
  const entityToCharRegex = new RegExp(
    '(' +
      Object.keys(entityToChar)
        .map(escapeRegex)
        .sort((a, b) => b.length - a.length)
        .join('|') +
      '|&#[0-9]{1,7};?|&#x[0-9a-fA-F]{1,6};?)',
    'g'
  );
  const replacer = (match, capture) => {
    if (capture in entityToChar) return entityToChar[capture];
    if (capture.startsWith('&#x') || capture.startsWith('&#X')) {
      const hex = capture.slice(3).replace(/;$/, '');
      const cp = parseInt(hex, 16);
      return Number.isFinite(cp) ? fromCodePointSafe(cp) : capture;
    }
    if (capture.startsWith('&#')) {
      const num = capture.replace(/[&#;]/g, '');
      const cp = parseInt(num, 10);
      return Number.isFinite(cp) ? fromCodePointSafe(cp) : capture;
    }
    return capture;
  };

  // === Main function body ===
  const str = String(value);

  // Prefer DOM path when available
  if (typeof document !== 'undefined') {
    const el = document.createElement('textarea');
    el.innerHTML = str;
    return el.value;
  }

  // Fallback: regex-based decoding
  return str.replace(entityToCharRegex, replacer);
}

function htmlParse(html) {
  // === Helper functions ===
  const clean = (v) => (v ? v.trim() : '');

  const domParse = (html) => {
    if (typeof DOMParser === 'undefined') return null;
    const doc = new DOMParser().parseFromString(html, 'text/html');

    // Check for parse errors
    if (doc.querySelector('parsererror')) return null;

    // Extract the relevant metadata
    const title = doc.querySelector('title')?.textContent;
    const ogTitle = doc
      .querySelector('meta[property="og:title"]')
      ?.getAttribute('content');

    const description = doc
      .querySelector('meta[name="description"]')
      ?.getAttribute('content');
    const ogDescription = doc
      .querySelector('meta[property="og:description"]')
      ?.getAttribute('content');

    // Return the extracted metadata as strings
    return {
      title: clean(ogTitle) || clean(title),
      description: clean(ogDescription) || clean(description),
    };
  };

  const regexParse = (html) => {
    const titlePattern = /<title[^>]*>([\s\S]*?)<\/title>/i;
    const ogTitlePattern =
      /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i;
    const descrPattern =
      /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i;
    const ogDescrPattern =
      /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i;

    const titleMatch = html.match(titlePattern)?.[1];
    const title = htmlDecode(clean(titleMatch));

    const ogTitleMatch = html.match(ogTitlePattern)?.[1];
    const ogTitle = htmlDecode(clean(ogTitleMatch));

    const descrMatch = html.match(descrPattern)?.[1];
    const description = htmlDecode(clean(descrMatch));

    const ogDescrMatch = html.match(ogDescrPattern)?.[1];
    const ogDescription = htmlDecode(clean(ogDescrMatch));

    return {
      title: title || ogTitle,
      description: description || ogDescription,
    };
  };

  // === Main function body ===
  if (!html || typeof html !== 'string' || html.length === 0) return null;

  // Try using DOMParser if available
  const domResult = domParse(html);
  if (domResult) return domResult;

  // Fallback to regex parsing
  return regexParse(html);
}

function isValidUrl(v) {
  if (!v || typeof v !== 'string') return false;
  try {
    new URL(v);
    return true;
  } catch (e) {
    const url_pattern = /^(https?:\/\/[^\s]+)$/i;
    return url_pattern.test(v);
  }
}

function getUrlFinalSegment(url) {
  try {
    const segments = new URL(url).pathname.split('/');
    const last = segments.pop() || segments.pop(); // handle potential trailing slash
    return last || 'File';
  } catch (_) {
    return 'File';
  }
}

async function getPageTitle(url) {
  const DEFAULT_ERROR = 'Title Unavailable | Site Unreachable';
  if (!isValidUrl(url)) {
    return DEFAULT_ERROR;
  }

  try {
    const response = await requestUrl({ url });
    const ct = (
      response.headers?.['content-type'] ||
      response.headers?.['Content-Type'] ||
      ''
    ).toLowerCase();

    // If not HTML, return last path segment
    if (!ct.includes('text/html')) return getUrlFinalSegment(url);

    // Get the HTML content
    const html = response.text || '';
    if (!html) return getUrlFinalSegment(url);

    // Get the HTML metadata
    const meta = htmlParse(html);
    if (meta && meta.title) return meta.title;
    return getUrlFinalSegment(url);
  } catch (e) {
    return DEFAULT_ERROR;
  }
}

async function getPageDescription(url) {
  const DEFAULT_ERROR = 'Description Unavailable | Site Unreachable';
  if (!isValidUrl(url)) {
    return DEFAULT_ERROR;
  }

  try {
    const response = await requestUrl({ url });
    const ct = (
      response.headers?.['content-type'] ||
      response.headers?.['Content-Type'] ||
      ''
    ).toLowerCase();

    // If not HTML, return default
    if (!ct.includes('text/html')) return DEFAULT_ERROR;

    // Get the HTML content
    const html = response.text || '';
    if (!html) return DEFAULT_ERROR;

    // Get the HTML metadata
    const meta = htmlParse(html);
    if (meta && meta.description) return meta.description;
    return DEFAULT_ERROR;
  } catch (e) {
    return DEFAULT_ERROR;
  }
}

module.exports = {
  title: getPageTitle,
  description: getPageDescription,
}
