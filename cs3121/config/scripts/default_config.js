const TOC_config = {
  // =============
  // TABLE OF CONTENTS
  // =============

  // TOC STYLE - USE CALLOUT OR HEADING
  // Add a heading before the list, or format as a callout (block-quote)
  // Mutually exclusive options, callout has higher priority
  heading: false,
  callout: true,

  // HEADER STYLE
  // Text above the list, or the callout/heading text
  title: 'Table of Contents',
  // Heading level (e.g., 2 for '## Table of Contents')
  headingLevel: 2,

  // CALLOUT STYLE
  // Callout type (e.g., summary, note, tip, etc.)
  calloutType: 'summary',

  // TOC START/END MARKERS
  // Markers to identify the start and end of the TOC block
  // These markers will be used to update an existing TOC in the file
  startMarker: '%%toc-start%%',
  endMarker: '%%toc-end%%',

  // TOC LOCATION
  // If a TOC already exists it will be updated in the same location.
  // Otherwise, if insertAtCursor is false, then default location is top of file (below any frontmatter). OR...
  // - Insert below first header instead of top of file
  insertBelowHeader: false,
  // - Insert at bottom of file
  insertAtBottom: false,
  // - Insert TOC at cursor position (highest priority, overrides other options)
  insertAtCursor: true,
};

const directoryListing_config = {
  // =============
  // DIRECTORY LISTING
  // =============

  // INDEX STYLE - USE CALLOUT OR HEADING
  // Add a heading before the list, or format as a callout (block-quote)
  // Mutually exclusive options, callout has higher priority
  heading: false,
  callout: true,

  // HEADER STYLE
  // Text above the list, or the callout/heading text
  title: 'Index',
  // Heading level (e.g., 2 for '## Index')
  headingLevel: 2,

  // CALLOUT STYLE
  // Callout type (e.g., summary, note, tip, etc.)
  calloutType: 'summary',

  // INDEX START/END MARKERS
  // Markers to identify the start and end of the index block
  // These markers will be used to update an existing index in the file
  startMarker: '%%index-start%%',
  endMarker: '%%index-start%%',

  // INDEX LOCATION
  // Location used when no markers are found in the file
  // Mutually exclusive options, insertAtCursor has higher priority
  // If insertAtCursor is false, then default location is top of file (below any frontmatter). OR...
  // - Insert below first header instead of top of file
  insertBelowHeader: false,
  // - Insert at bottom of file
  insertAtBottom: false,
  // - Insert TOC at cursor position (highest priority, overrides other options)
  insertAtCursor: true,
};

const siblingLinks_config = {
  // =============
  // SIBLING LINKS
  // =============

  // STYLE - USE CALLOUT OR HEADING
  // Add a heading before the list, or format as a callout (block-quote)
  // Mutually exclusive options, callout has higher priority
  heading: true,
  callout: false,
  navbar: false, // if true, overrides heading and callout to create a horizontal navbar

  // HEADER STYLE
  // Text above the list, or the callout/heading text
  title: 'See Also',
  // Heading level (e.g., 2 for '## See also')
  headingLevel: 6,

  // CALLOUT STYLE
  // Callout type (e.g., summary, note, tip, etc.)
  calloutType: 'summary',

  // START/END MARKERS
  // Markers to identify the start and end of the index block
  // These markers will be used to update an existing index in the file
  startMarker: '%%sibling-links-start%%',
  endMarker: '%%sibling-links-start%%',

  // LOCATION
  // Location used when no markers are found in the file
  // Mutually exclusive options, insertAtCursor has higher priority
  // If insertAtCursor is false, then default location is top of file (below any frontmatter). OR...
  // - Insert below first header instead of top of file
  insertBelowHeader: false,
  // - Insert at bottom of file
  insertAtBottom: false,
  // - Insert TOC at cursor position (highest priority, overrides other options)
  insertAtCursor: true,
};


function navConfig() {
  const resolveConfig = (userConfig, defaultConfig) => {
    // Merge user config with default config
    let config = { ...defaultConfig, ...userConfig };

    // Validate config values
    if (typeof config.callout !== 'boolean')
      config.callout = defaultConfig.callout;
    if (typeof config.heading !== 'boolean')
      config.heading = defaultConfig.heading;
    if (typeof config.navbar !== 'boolean')
      config.navbar = defaultConfig.navbar;
    if (typeof config.headingLevel !== 'number' ||
      config.headingLevel < 1 ||
      config.headingLevel > 6
    ) {
      config.headingLevel = defaultConfig.headingLevel;
    }
    if (typeof config.title !== 'string' || config.title.trim() === '') {
      config.title = defaultConfig.title;
    }
    if (typeof config.calloutType !== 'string' || config.calloutType.trim() === '') {
      config.calloutType = defaultConfig.calloutType;
    }
    if (typeof config.insertAtCursor !== 'boolean')
      config.insertAtCursor = defaultConfig.insertAtCursor;
    if (typeof config.insertAtBottom !== 'boolean')
      config.insertAtBottom = defaultConfig.insertAtBottom;

    // insertAtCursor and insertAtBottom/insertBelowHeader are mutually exclusive
    if (config.insertAtCursor) {
      // If insertAtCursor is true, disable the other two options
      config.insertAtBottom = false;
      config.insertBelowHeader = false;
    } else if (config.insertAtBottom && config.insertBelowHeader) {
      // If both are true, default to insertAtBottom
      config.insertBelowHeader = false;
    } else if (!config.insertAtBottom && !config.insertBelowHeader) {
      // If both are false, default to insertAtBottom
      config.insertAtBottom = true;
    }

    // Special case: if navbar is true, override heading and callout
    if (config.navbar) {
      config.heading = false;
      config.callout = false;
    }

    return config;
  }

  return {
    TOC: TOC_config,
    directoryListing: directoryListing_config,
    siblingLinks: siblingLinks_config,
    resolveConfig, // function to merge and validate user config
  };
}

module.exports = navConfig;