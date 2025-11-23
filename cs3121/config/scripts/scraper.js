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

/**
 * Parse HTML to extract title and description metadata
 * @param {string} html - The HTML string to parse
 * @returns {Object|null} - An object with 'title' and 'description' properties, or null if parsing fails
 */
function htmlParse(html) {
  // === Helper functions ===
  const clean = (v) => (v ? v.trim() : '');

  const domParse = (html) => {
    if (typeof DOMParser === 'undefined') return null;
    const doc = new DOMParser().parseFromString(html, 'text/html');
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

    console.log({ title, ogTitle, description, ogDescription });

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

/**
 * Parse JSON text to extract title and description
 * @param {string} jsonText - The JSON string to parse
 * @returns {Object|null} - An object with 'title' and 'description' properties, or null if parsing fails
 */
function jsonParse(jsonText) {
  const clean = (v) => (v ? String(v).trim() : '');

  try {
    let data = JSON.parse(jsonText);
    if (!data) return null;

    // If data is an array, take the first element
    if (Array.isArray(data)) data = data[0];

    let title = null;
    let description = null; // selftext or description field
    let suffix = null;

    JSON.stringify(data, (key, value) => {
      let field = key.toLowerCase();
      if (field === 'title' && !title) title = clean(value);
      if (field === 'selftext' && !description) description = clean(value);
      if (field === 'description' && !description) description = clean(value);
      if (field === 'subreddit_name_prefixed' && !suffix) suffix = clean(value);
      return value;
    });

    if (suffix && title && !title.includes(suffix)) {
      title = `${title} : ${suffix}`;
    }
    return { title, description };
  } catch (e) {
    return null;
  }
}

//====== Helper function to validate URLs ====//
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
  // try {
  //   const segments = new URL(url).pathname.split('/');
  //   const last = segments.pop() || segments.pop(); // handle potential trailing slash
  //   return last || 'File';
  // } catch (_) {
  //   return 'File';
  // }
  try {
    const parsedUrl = new URL(url);
    const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
    return pathSegments.length > 0
      ? decodeURIComponent(pathSegments.pop())
      : `File - ${parsedUrl.hostname}`;
  } catch (e) {
    return 'File';
  }
}

const parseUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    console.log('Parsed URL:', parsedUrl);
    // Special handling for Reddit URLs to get JSON endpoint
    if (!parsedUrl.hostname.includes('reddit.com')) return url;
    const urlObj = new URL(url);
    if (!urlObj.pathname.endsWith('/')) urlObj.pathname += '/';
    if (!urlObj.pathname.endsWith('.json')) urlObj.pathname += '.json';
    return urlObj.toString();
  } catch (e) {
    return url;
  }
};

const isHtmlResponse = (response) => {
  if (!response || !response.headers) return false;
  const ct =
    response.headers['content-type'] || response.headers['Content-Type'] || '';
  return ct.toLowerCase().includes('text/html');
};

const isJsonResponse = (response) => {
  if (!response || !response.headers) return false;
  const ct =
    response.headers['content-type'] || response.headers['Content-Type'] || '';
  return ct.toLowerCase().includes('application/json');
};

async function getPageTitle(url) {
  if (!isValidUrl(url)) return 'Invalid URL';
  url = parseUrl(url);
  try {
    const response = await requestUrl({ url });
    if (!response || response.status !== 200) return 'Site Unreachable';

    // If not HTML, return last path segment
    const isHtml = isHtmlResponse(response);
    const isJson = isJsonResponse(response);
    console.log({ isHtml, isJson });
    if (!isHtml && !isJson) return getUrlFinalSegment(url);

    const text = response.text;
    if (!text) return getUrlFinalSegment(url);

    if (isHtml) {
      const meta = htmlParse(text);
      if (meta && meta.title) return meta.title;
    } else if (isJson) {
      const meta = jsonParse(text);
      if (meta && meta.title) return meta.title;
    }

    return getUrlFinalSegment(url);
  } catch (e) {
    console.error('Error fetching page title:', e.message);
    return 'Title Unavailable | Site Unreachable';
  }
}

async function getPageDescription(url) {
  const DEFAULT_ERROR = 'Description Unavailable | Site Unreachable';
  if (!isValidUrl(url)) {
    return 'Title Unavailable | Site Unreachable';
  }

  try {
    const response = await requestUrl({ url });
    if (!response || response.status !== 200) {
      return DEFAULT_ERROR;
    }

    // Get content type
    const ct = (
      response.headers?.['content-type'] ||
      response.headers?.['Content-Type'] ||
      ''
    ).toLowerCase();

    // If not HTML, return error
    if (!ct.includes('text/html')) {
      return DEFAULT_ERROR;
    }

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
};
