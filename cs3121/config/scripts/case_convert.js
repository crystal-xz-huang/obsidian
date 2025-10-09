/**
 * @function stringConvert
 * @returns {Object} - An object containing functions which converts cases.
 * @example
 * const { toSnakeCase, toKebabCase, toSentenceCase, toTitleCase } = tp.user.case_convert();
 * const str = "example string";
 * const snake = toSnakeCase(str); // "example_string"
 * or
 * const stringConvert = tp.user.case_convert();
 * const snake = stringConvert.toSnakeCase(str);
 * or
 * const snake = tp.user.case_convert().toSnakeCase(str);
 */

// A string is a pair of pattern (which defines the case of individual words) and a delimiter (which defines how the words are joined together)
const PATTERNS = [
  'lower',  // lower case (all letters lowercase)
  'upper', // UPPER CASE (all letters capitalized)
  'capital', // Capital Case (first letter of each word capitalized)
  'camel', // camelCase (first letter lowercase, subsequent words capitalized)
  'sentence', // Sentence case (first letter of the string capitalized, the rest lowercase)
  'title', // Title Case (first letter of each word capitalized, except for certain small words)
]
const DELIMITERS = [
  'underscore', // underscore (_) separated
  'hyphen', // hyphen (-) separated
  'space', // space ( ) separated
  'path', // path (/) separated
]

// kebab-case
// pattern: lower, delimiter: hyphen
function toKebabCase(str) {
  if (!str) return '';
  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '') // trim leading/trailing non-alphanumerics
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}_${b.toLowerCase()}`) // camelCase to snake_case
    .replace(/[^A-Za-z0-9]+|_+/g, '-') // replace non-alphanumerics and underscores with hyphen
    .toLowerCase(); // to lowercase
}

// snake_case
// pattern: lower, delimiter: underscore
function toSnakeCase(str) {
  if (!str) return '';

  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => a + '_' + b.toLowerCase())
    .replace(/[^A-Za-z0-9]+|_+/g, '_')
    .toLowerCase();
}

// Sentence case
// pattern: sentence, delimiter: space
function toSentenceCase(str) {
  if (!str) return '';

  const textcase = String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}_${b.toLowerCase()}`)
    .replace(/[^A-Za-z0-9]+|_+/g, ' ')
    .toLowerCase();

  return textcase.charAt(0).toUpperCase() + textcase.slice(1);
}

// path/case
// pattern: lower, delimiter: path
function toPathCase(str) {
  if (!str) return '';

  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/([a-z])([A-Z])/g, function (m, a, b) {
      return a + '_' + b.toLowerCase();
    })
    .replace(/[^A-Za-z0-9]+|_+/g, '/')
    .toLowerCase();
}

// text case
// pattern: lower, delimiter: space
function toTextCase(str) {
  if (!str) return '';

  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => a + '_' + b.toLowerCase())
    .replace(/[^A-Za-z0-9]+|_+/g, ' ')
    .toLowerCase();
}

// Title Case
// pattern: title, delimiter: space
function toTitleCase(str) {
  if (!str) return '';
  // List of acronyms to preserve capitalization
  const ACRONYMS = [
    'COMP',
    'DSA',
    'HTML',
    'CSS',
    'JS',
    'JSX',
    'TS',
    'TSX',
    'API',
    'SQL',
  ];
  // Words that shouldn’t be capitalized unless it’s the first or last word of a title
  const SMALL_WORDS = [
    'a',
    'an',
    'and',
    'as',
    'at',
    'but',
    'because',
    'by',
    'en',
    'for',
    'from',
    'if',
    'in',
    'into',
    'like',
    'neither',
    'nor',
    'nor',
    'of',
    'off',
    'on',
    'once',
    'onto',
    'only',
    'or',
    'over',
    'past',
    'per',
    'so',
    'some',
    'than',
    'that',
    'the',
    'to',
    'up',
    'upon',
    'when',
    'where',
    'while',
    'with',
    'without',
    'yet',
    'v',
    'versus',
    'via',
    'vs',
  ];
  const words = str.split(/\s+/);
  return words
    .map((word, i) => {
      const lower = word.toLowerCase();
      // 1. Preserve acronyms from the list
      if (ACRONYMS.includes(word.toUpperCase())) return word.toUpperCase();
      // 2. Handle acronyms or mixed-case (NASA, JSdoc, eBay)
      if (word === word.toUpperCase() || /[A-Z]/.test(word.slice(1)))
        return word;
      // 3. Handle hyphenated words (Jo-ann, e-mail, self-help -> Jo-Ann, E-Mail, Self-Help)
      if (word.includes('-')) {
        return word
          .split('-')
          .map((part) => toTitleCase(part)) // recursive
          .join('-');
      }
      // 3. Don't capitalize lowercase exceptions unless it's the first or last word
      const isFirstOrLast = i === 0 || i === words.length - 1;
      if (!isFirstOrLast && SMALL_WORDS.includes(lower)) return lower;
      // 4. Normal word capitalization (handles contractions)
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

module.exports = () => {
  return {
    toKebabCase,
    toSnakeCase,
    toSentenceCase,
    toPathCase,
    toTextCase,
    toTitleCase,
  };
};