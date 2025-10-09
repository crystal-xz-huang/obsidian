function consoleLogCustom() {
  const debugLog = (message) => {
    const err = new Error(message);
    // Get the call site (3rd line of stack trace)
    const origin = err.stack.split('\n')[3].trim();
    console.warn(message);
    console.warn(`at ${origin}`);
    return;
  }

  const titleLog = (label) => {
    const styles = [
      'text-transform: uppercase',
      'font-size: 16px',
      'font-weight: bold',
      'padding: 8px',
      'border-radius: 4px',
      'background-color: #222',
      'color: #bada55',
      'font-family: Courier',
    ];
    console.log(`%c${label}`, styles.join('; '));
  };

  const headerLog = (label, data = null) => {
    const header = label.toUpperCase();
    if (!data) {
      console.log(`%c-------- ${header} --------`, 'font-weight: bold;');
    } else {
      console.log(`%c-------- ${header} --------`, 'font-weight: bold;');
      console.log(`${data}`);
      console.log('\n');
    }
  };

  /**
   * Log a list of files, highlighting included/excluded files.
   * If no filteredFiles is given, just lists all files in gray.
   * @param {string} label A non-empty string label for the log header
   * @param {Array} allFiles An array of TFile objects to log
   * @param {Array} [filteredFiles] An optional array of TFile objects that are included (will be highlighted in green). If not given, all files will be logged in gray.
   * @returns {void}
   */
  const filesLog = (label, allFiles, filteredFiles) => {
    if (!label) {
      const err = new Error(`Missing or empty required argument: 'label'`);
      const firstLine = err.stack.split('\n')[1].trim();
      console.warn(err.message);
      console.warn(`at ${firstLine}`);
      return;
    }
    if (
      !Array.isArray(allFiles) ||
      !allFiles.every((f) => f && typeof f.path === 'string')
    ) {
      const err = new Error(`Invalid 'allFiles' argument. Expected TFile[], got ${typeof allFiles}`);
      const firstLine = err.stack.split('\n')[1].trim();
      console.warn(err.message);
      console.warn(`at ${firstLine}`);
      return;
    }

    // if filteredFiles is given, validate it
    if (filteredFiles !== undefined) {
      if (
        !Array.isArray(filteredFiles) ||
        !filteredFiles.every((f) => f && typeof f.path === 'string')
      ) {
        const err = new Error(`Invalid 'filteredFiles' argument. Expected TFile[], got ${typeof filteredFiles}`);
        const firstLine = err.stack.split('\n')[1].trim();
        console.warn(err.message);
        console.warn(`at ${firstLine}`);
        return;
      }
    }

    // Print header
    const header = label.toUpperCase();
    console.log(`%c-------- ${header} --------`, 'font-weight: bold;');

    // If no files, just print message and return
    if (allFiles.length === 0) {
      console.log('No files found');
      console.log('\n');
      return;
    }

    // If no filteredFiles is given, just list all files in gray
    if (!filteredFiles) {
      console.log(`Found ${allFiles.length} files:`);
      allFiles.forEach((file) => {
        console.log('%c- %s', 'color: gray;', file.path);
      });
      console.log('\n');
      return;
    }

    // At this point, filteredFiles is given and valid
    const HAS_MATCHES = filteredFiles.length > 0;
    let heading =
      HAS_MATCHES === 0
        ? 'No files matched the filter criteria'
        : `${filteredFiles.length} / ${allFiles.length} files matched the filter criteria`;
    console.log(heading);

    // Create a Set of filtered file paths for quick lookup
    const filteredPaths = new Set(filteredFiles.map((f) => f.path));

    // Log each file, highlighting included/excluded files
    allFiles.forEach((file) => {
      if (filteredPaths.has(file.path)) {
        // Included file - highlight in green
        console.log('%c- %s', 'color: green; font-weight: bold;', file.path);
      } else {
        // Excluded file - gray out
        console.log('%c- %s', 'color: red;', file.path);
      }
    });
    console.log('\n');
  };


  return {
    trace: debugLog,
    title: titleLog,
    header: headerLog,
    files: filesLog,
  }
};