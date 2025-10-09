<%*
const callouts = {
	  "bug":            "🟥 Bug",
	  "danger":         "🟥 Danger | Error",
	  "fail":           "🟥 Fail | Failure | Missing",
    "warning":        "🟥 Warning",
    "caution":        "🟧 Caution",
    "help":           "🟧 Help | FAQ | Question",
    "attention":      "🟨 Attention",
    "success":        "🟩 Success | Done | Check",
    "abstract":       "🟦 Abstract | Summary | TLDR",
    "hint":           "🟦 Hint | Important | Tip",
    "info":           "🟦 Info",
    "note":           "🟦 Note",
    "todo":           "🟦 Todo",
    "example":        "🟪 Example",
    "code":           "🟪 Code",
    "quote":          "⬜️ Quote | Cite",
};

const typeNames = [];
const typeLabels = [];

Object.keys(callouts)
	// Uncomment the line below to sort the callouts order alphabetically
	.forEach((key, index) => {
	    typeNames.push(key);
	    // Add number prefix to each option for keyboard selection
	    typeLabels.push(`${index+1}. ${callouts[key]}`);
	});

let calloutType = await tp.system.suggester(
    typeLabels,
    typeNames,
    false,
    "Select callout type (use numbers 1-" + typeLabels.length + " to select)"
);

// Stop here when the prompt was cancelled (ESC).
if (!calloutType) {
    return;
}

// Extract the main name from the label to pre-fill the header
let defaultTitle = callouts[calloutType].split(' ').pop();

let title = await tp.system.prompt("Callout Header:", defaultTitle);

// let foldState = await tp.system.suggester(
//     ["1. Static", "2. Expanded", "3. Collapsed"],
//     ["", "+", "-"],
//     false,
//     "Select callout folding option (use numbers 1-3 to select)"
// );

let content = await tp.file.selection();

// Format each line of content to be part of the callout
const formattedContent = content.split('\n').map(line => `> ${line}`).join('\n');
_%>

> [!<% calloutType %>] <% title %>
<% formattedContent %> <%* tp.file.cursor() %>