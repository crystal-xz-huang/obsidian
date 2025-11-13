<%*
// Utility function for debugging
const debugLog = (label, data) => console.log(`${label} \n\n`, data);

// Get the active file info and its metadata
const activeFile = await tp.app.workspace.getActiveFile();
const mdCache = await tp.app.metadataCache.getFileCache(activeFile);

// Show file info
const { headings, sections } = mdCache || {};
console.log("-------- File MetadataCache --------");
// debugLog("Headings:", headings || "No headings found");
// debugLog("Sections:", sections || "No sections found");
  const selectedTags = await tp.system.multi_suggester((item) => item, Object.keys(tp.app.metadataCache.getTags()).map(x => x.replace("#", "")).sort(), false, 'Select tags for this note (optional)');
console.log(selectedTags)
%>