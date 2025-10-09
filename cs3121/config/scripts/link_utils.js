module.exports = function (tp) {
  if (!tp) {
    throw new Error(
      'This utility function must be run within a Templater context.'
    );
  }

  const TFile = tp.obsidian.TFile;
  const app = tp.app;

  const validateRequiredArguments = (file, sourcePath) => {
    let errorsMap = new Map();
    const origin = new Error().stack.split('\n')[2].trim();
    if (!(file instanceof TFile)) {
      console.warn('Error: Invalid or missing file argument.');
      errorsMap.set('file', false);
    }
    if (sourcePath && typeof sourcePath !== 'string') {
      console.warn(
        'Error: sourcePath must be a string if provided. Defaulting to current file path.'
      );
      errorsMap.set('sourcePath', false);
    }
    if (errorsMap.size > 0) console.warn(`at ${origin}`);
    return errorsMap;
  };

  /**
   * Generate a markdown link to a specific header in a file.
   * @param {TFile} file The file to link to
   * @param {string} sourcePath The path of the file where the link will be inserted. Defaults to current file if not provided.
   * @param {string} headerText The text of the header to link to
   * @param {string} [displayText] The text to display for the link. Defaults to the header text if not provided.
   */
  function generateAnchorLink(file, sourcePath, headerText, displayText) {
    const errors = validateRequiredArguments(file, sourcePath);
    if (errors.has('file')) return '';
    if (errors.has('sourcePath')) sourcePath = tp.file.path(true);
    if (!headerText || typeof headerText !== 'string') {
      console.warn('Error: headerText must be a non-empty string.');
      return '';
    }
    if (displayText && typeof displayText !== 'string') displayText = undefined;

    headerText = tp.obsidian.stripHeadingForLink(headerText);
    displayText = displayText || headerText;
    const headerLink = app.fileManager.generateMarkdownLink(
      file, // file to link to
      sourcePath, // where the link is stored in
      `#${headerText}`, // A subpath, starting with #, used for linking to headings or blocks.
      displayText // display text
    );
    return headerLink;
  }

  /**
   * Generate a markdown link to a file's H1 header (if it exists and is the first header),
   * otherwise to the file itself.
   * @param {*} tp
   * @param {TFile} file The file to link to
   * @param {string} sourcePath The path of the file where the link will be inserted. Defaults to current file if not provided.
   * @param {object} config Configuration options
   * @param {boolean} config.linkToFirstHeader Whether to link to the first H1 header if it exists (default: true)
   * @param {boolean} config.useAliases Whether to use the file's aliases as the display text if available (default: false)
   * @returns {string} The markdown link
   */
  function generateLink(file, sourcePath, config = {}) {
    const defaultConfig = {
      linkToFirstHeader: false, // Whether to link to the first H1 header if it exists
      useAliases: true, // Whether to use the file's aliases as the display text if available
      breadcrumb: false, // Whether to include parent folder names in the display text
    };

    // Validate arguments
    const errors = validateRequiredArguments(file, sourcePath);
    if (errors.has('file')) return '';
    if (errors.has('sourcePath')) sourcePath = tp.file.path(true);

    // Merge user config with default config
    config = { ...defaultConfig, ...config };
    if (typeof config.linkToFirstHeader !== 'boolean')
      config.linkToFirstHeader = defaultConfig.linkToFirstHeader;
    if (typeof config.useAliases !== 'boolean')
      config.useAliases = defaultConfig.useAliases;
    if (typeof config.breadcrumb !== 'boolean')
      config.breadcrumb = defaultConfig.breadcrumb;

    // If sourcePath is the same as file.path, disable breadcrumb to avoid redundancy
    if (sourcePath === file.path) config.breadcrumb = false;

    const { linkToFirstHeader, useAliases, breadcrumb } = config;

    // Get file cache
    const fileCache = app.metadataCache.getFileCache(file);
    const { headings, frontmatter } = fileCache || {};

    // Determine display text
    let displayText = file.basename; // default to filename without extension
    if (useAliases) {
      const aliases = frontmatter?.aliases;
      if (aliases) {
        if (Array.isArray(aliases) && aliases.length > 0) {
          displayText = aliases[0]; // use the first alias
        } else if (typeof aliases === 'string' && aliases.trim() !== '') {
          displayText = aliases; // use the single alias string
        }
      }
    }

    // Add breadcrumb if enabled
    if (breadcrumb) {
      const parentFolder = file.parent;
      displayText = parentFolder
        ? `${parentFolder.name} > ${displayText}`
        : displayText;
    }

    // If no headings or not linking to first header, return link to file
    if (!headings || headings.length === 0 || !linkToFirstHeader) {
      return app.fileManager.generateMarkdownLink(file, sourcePath, '', displayText);
    }

    // If the first heading is not level 1, return link to file
    const firstHeading = headings[0];
    if (firstHeading.level !== 1) {
      return app.fileManager.generateMarkdownLink(file, sourcePath);
    }

    // Generate link to the unique H1 heading
    const headerText = tp.obsidian.stripHeadingForLink(firstHeading.heading);
    const headerLink = app.fileManager.generateMarkdownLink(
      file, // file to link to
      sourcePath, // where the link is stored in
      `#${headerText}`, // A subpath, starting with #, used for linking to headings or blocks.
      displayText // display text
    );
    return headerLink;
  }

  return {
    generateLink,
    generateAnchorLink,
  };
};
