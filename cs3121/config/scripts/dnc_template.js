async function prompt_template(tp) {
  let moduleName = "";
  const pathParts = tp.file.path.split("/");
  if (pathParts.length > 1) {
    moduleName = pathParts[1];
  }

  const templatePath = `templates/${moduleName}_template.md`;
  const templateFile = app.vault.getAbstractFileByPath(templatePath);
  if (templateFile && templateFile instanceof TFile) {
    await tp.file.applyTemplate(templateFile.path);
  } else {
    console.log(`Template file not found at path: ${templatePath}`);
  }

  let title = tp.file.title;
  if (title.startsWith("Untitled")) {
    title = await tp.system.prompt("Enter a title for this note");
    title = tp.user.case_convert.toTitleCase(title);
    await tp.file.rename(title);
  }
}