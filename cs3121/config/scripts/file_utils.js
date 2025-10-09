/**
 * Utility functions for file and folder operations in Obsidian using Templater.
 * @param {*} tp The Templater context object.
 * @returns {Object} An object containing utility functions: isIndex, isIgnored, pathContains, splitPath.
 * @throws Will throw an error if not run within a Templater context.
 * @description
 * This function returns the following utility functions:
 * - isIndex(f): Check if a TFile is an index file based on name patterns and frontmatter tags.
 * - isIgnored(f): Check if a TFile or TFolder should be ignored based on hidden/system/archive/index patterns.
 * - pathContains(f, keyword, include_underscore, case_insensitive): Check if any path segment contains the keyword as a whole word.
 * - splitPath(f, lowercase): Split the path into parts, excluding the file extension if present.
 * @example
 * const { isIndex, isIgnored, pathContains, splitPath } = tp.user.file_utils();
 * const file = tp.file.find_tfile("example.md");
 * console.log(isIndex(file)); // true or false
 * console.log(isIgnored(file)); // true or false
 * console.log(pathContains(file, 'project')); // true or false
 * console.log(splitPath(file)); // ['folder', 'subfolder', 'example']
 */
module.exports = function (tp) {
  /**
   * REGEX PATTERNS
   * to match a pathname or filename: add (^|\/) at the start and (\.md$|\/|$) at the end
   * (^|\/) matches either start of string or /
   * (\/|$) matches either / or end of string => only matches folders
   * (\.md)?(\/|$) matches an optional .md extension followed by either / or end of string => matches files or folders
   * (\.md$|\/|$) matches either .md$, / or end of string (stricter than above because it exclude /.md/path matches)
   */
  const EXCALIDRAW = /.*\.excalidraw\.md$/i;
  const HIDDEN = /(^|\/)\s*[^A-Za-z0-9]+/;
  const SYSTEM =
    /(^|\/)(?=[^/]*\b(template|temp|config|meta|settings|setting)\b)[^/]*(?:\.md)?(\/|$)/i;
  const INDEX =
    /(^|\/)(?=[^/]*\b(index|home|main|about|overview|outline)\b)[^/]*(?:\.md)?(\/|$)/i;
  const ARCHIVE = /(^|\/)(?=[^/]*\b(archive|archived|archives)\b)[^/]*(?:\.md)?(\/|$)/i;

  const TFile = tp.obsidian.TFile;
  const TFolder = tp.obsidian.TFolder;

  if (!tp || !tp.obsidian) {
    throw new Error(
      'This utility function must be run within a Templater context.'
    );
  }

  /**
   * Split the path into parts, excluding the file extension if present.
   * Only the first extension is removed, so multi-dot filenames are preserved.
   * @param {TFile|TFolder|string} f - A TFile or TFolder object, or a string path
   * @boolean lowercase - Whether to convert parts to lowercase (default: false)
   * @returns {Array} - An array of path parts in lowercase, excluding the file extension
   */
  const splitPath = (f, lowercase = true) => {
    if (!(f instanceof TFile || f instanceof TFolder) && typeof f !== 'string') {
      console.error('splitPath: Invalid input, expected TFile, TFolder or string. Got:', f);
      return [];
    }
    const path = f instanceof TFile || f instanceof TFolder ? f.path : f;
    return (lowercase ? path.toLowerCase() : path)
      .replace(/\.[^/.]+$/, '') // remove the last file extension if present
      .split('/');
  };

  /**
   * Given a TAbstractFile (TFile or TFolder) or a string path,
   * check if the path contains the given keyword as a whole word in any path segment.
   * @param {TFile|TFolder|string} f - A TFile or TFolder object, or a string path
   * @param {string} keyword - The keyword to search for (non-empty string)
   * @param {boolean} [include_underscore=false] - Whether to treat underscores as word delimiters
   * @param {boolean} [case_insensitive=true] - Whether the match is case-insensitive
   * @returns {boolean} True if the keyword is found as a word (underscores included by default) in any path segment, false otherwise
   * @description
   * Words are defined as sequences of alphanumeric characters separated by spaces, hyphens (-), dots (.) only.
   * Underscores in words are included by default. For example:
   * - "my-file.name" => ["my", "file", "name"]
   * - "my_file-name" => ["my_file", "name"]
   * - "my file.name" => ["my", "file", "name"]
   *
   * To treat underscores as word delimiters, set `include_underscore` to true.
   * To make the match case-sensitive, set `case_insensitive` to false.
   * @example
   * pathContains(file, 'project') // true if any segment contains 'project' as a whole word
   * pathContains(file, 'project_01') // true if any segment contains 'project_01' as a whole word
   * pathContains(file, 'project-01') // false, '-' is a delimiter
   * pathContains(file, 'project.01') // false, '.' is a delimiter
   * pathContains('path/to/temp_file.md', 'temp') // false, 'temp_file' is one word
   * pathContains('path/to/temp_file.md', 'temp', true) // true, 'temp_file' is split into ['temp', 'file']
   */
  const pathContains = (f, keyword, include_underscore = false, case_insensitive = true) => {
    if (!(f instanceof TFile || f instanceof TFolder) && typeof f !== 'string') {
      console.error('pathContains: Invalid input, expected TFile, TFolder or string. Got:', f);
      return false;
    }
    if (typeof keyword !== 'string' || keyword.trim() === '') {
      console.error('pathContains: Invalid keyword, expected non-empty string. Got:', keyword);
      return false;
    }
    const pattern = include_underscore
      ? /[\s\-_\.]+/  // delimit by space, hyphen, underscore, dot e.g. my_file-name.txt => ['my', 'file', 'name', 'txt']
      : /[\s\-\.]+/   // delimit by space, hyphen, dot only (no underscore) e.g. my_file-name.txt => ['my_file', 'name', 'txt']
    ;
    const parts = splitPath(f);
    const lowerKeyword = case_insensitive ? keyword.toLowerCase() : keyword;
    return parts.some(part => part.split(pattern).includes(lowerKeyword));
  };

  const isIndex = (f) => {
    if (!(f instanceof TFile)) return false;
    const cache = tp.app.metadataCache.getFileCache(f);
    if (cache?.frontmatter?.tags?.includes('#index-pages')) return true;
    if (cache?.frontmatter?.tags?.includes('#main-pages')) return true;
    if (f.parent && f.basename === f.parent.name) return true;
    if (INDEX.test(f.path)) return true;
    return false;
  };

  const isIgnored = (f) => {
    if (!(f instanceof TFile || f instanceof TFolder)) return false;
    if (HIDDEN.test(f.path)) return true;
    if (EXCALIDRAW.test(f.name)) return true;
    if (SYSTEM.test(f.path)) return true;
    if (ARCHIVE.test(f.path)) return true;
    if (isIndex(f)) return true;
    return false;
  };

  return { isIndex, isIgnored, pathContains, splitPath };
};
