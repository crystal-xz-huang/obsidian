/**
 * Show an app notification
 * @see https://docs.obsidian.md/Reference/TypeScript+API/Notice
 * For creating HTML elements to 
 * @see https://docs.obsidian.md/Plugins/User+interface/HTML+elements#Create+HTML+elements+using+%60createEl()%60
 * @param {string} label The label to show in bold
 * @param {string|undefined} message The message to show (optional). If not provided,the label will be shown but unbolded.
 * @param {number} duration Duration in ms (Defaults to 7s). If duration is 0, the notice will not disappear automatically
 */
function notice(label, message = undefined, duration = 7000) {
  const notice = new Notice('', duration);
  if (message === undefined) {
    notice.setMessage(label);
    return;
  } else {
    notice.messageEl.append(
      createEl('strong', { text: `${label}:  ` }),
      `\n${message}`
    );
  }
}

module.exports = notice;
