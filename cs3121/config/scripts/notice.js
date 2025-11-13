/**
 * Show an app notification
 * @param {string} title - The title of the notice
 * @param {string} message - The message body of the notice
 * @param {number} duration - Duration in milliseconds (default: 7000ms)
 * @see https://docs.obsidian.md/Reference/TypeScript+API/Notice
 * @see https://docs.obsidian.md/Plugins/User+interface/HTML+elements#Create+HTML+elements+using+%60createEl()%60
 */
function notice(title, message, duration = 7000) {
  const notice = new Notice('', duration);
  const messageEl = notice.messageEl;
  messageEl.createEl('strong', { text: title });
  messageEl.createEl('div', { text: message });
}

module.exports = notice;
