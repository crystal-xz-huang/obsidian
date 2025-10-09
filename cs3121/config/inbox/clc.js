/**
 * clp.js
 * Console log messages with colored backgrounds and optional prefixes.
 * @see https://www.npmjs.com/package/console-log-plus
 * @params {Object} options - Options for the colored log function
 * @param {string} options.type - Type of log: 'ok', 'error', 'warning', 'attention', 'success', 'info', 'default'
 * @param {string} options.prefix - Optional prefix to add before the message
 * @param {string} options.message - The log message
 * @returns {void}
 * @example
 * tp.user.clc({ type: 'error', message: 'An error occurred' });
 * tp.user.clc({ type: 'success', prefix: 'awesome', message: 'Task completed' });
 */
function consoleLogColor({ type = 'default', prefix = '', message = '' } = {}) {
  const styles = [
    { name: 'ok', background: 'purple', color: 'white' },
    { name: 'error', background: '#dc3545', color: 'white' },
    { name: 'warning', background: 'darkorange', color: 'white' },
    { name: 'attention', background: '#ffdc00', color: 'black' },
    { name: 'success', background: '#bada55', color: 'black' },
    { name: 'info', background: '#abdcfb', color: 'black' },
    { name: 'default', background: 'white', color: 'black' },
  ];
  const types = styles.map((s) => s.name);

  // Utility function to log the call site of an error
  const logTrace = (message) => {
    const err = new Error(message);
    const origin = err.stack.split('\n')[2].trim();
    console.warn(message);
    console.warn(`at ${origin}`);
    return;
  }

  if (typeof message !== 'string' || message.trim() === '') {
    logTrace(`'message' must be a non-empty string.`);
    return;
  }
  if (typeof type !== 'string' || !types.includes(type)) {
    logTrace(`'type' must be one of: ${types.join(', ')}. Defaulting to 'default'.`);
    type = 'default';
  }
  if (typeof prefix !== 'string') {
    logTrace(`'prefix' must be a string. Defaulting to empty string.`);
    prefix = type;
  }
  let background = styles.find((s) => s.name === type).background;
  let color = styles.find((s) => s.name === type).color;
  const prefixString = prefix ? `[${prefix}] ` : type ? `[${type}] ` : '';
  const messageStyle = `background:${background}; color:${color}; padding: 2px 6px; margin-block: 2px;`;
  console.log(`${prefixString}%c${message}`, messageStyle);
}

module.exports = consoleLogColor;
