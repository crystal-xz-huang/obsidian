async function generateLatexEnvironment(tp) {
  let options = {
    argmax: {
      label: '[argmax]: argmax with subscript',
      start: '\\operatorname*{arg,max}_a{',
      end: '}',
    },
    sum: {
      label: '[sum]: substack below the sum operator',
      start: '\\sum_{\\substack{',
      end: '}} ',
    },
    box: {
      label: '[box]: boxed equation',
      start: '\\bbox[7px, border: 1px solid gray]{',
      end: '}',
    },
    empheq: {
      label: '[empheq]: empheq with left and right braces',
      start:'\\begin{empheq}[left=\\empheqlbrace, right=\\empheqrbrace]{align}\n',
      end: '\n\\end{empheq}',
    },
    equation: {
      label: '[equation]: single equation',
      start: '\\begin{equation}\n',
      end: '\n\\end{equation}',
    },
    align: {
      label: '[align]: multiple equations with alignment points (&)',
      start: '\\begin{align}\n',
      end: '\n\\end{align}',
    },
    gather: {
      label: '[gather]: multiple equations centered, no alignment',
      start: '\\begin{gather}\n',
      end: '\n\\end{gather}',
    },
    split: {
      label: '[split]: split a single equation into multiple lines',
      start: '\\begin{split}\n',
      end: '\n\\end{split}',
    },
    cases: {
      label: '[cases]: piecewise function',
      start: '\\begin{cases}\n',
      end: '\n\\end{cases}',
    },
    matrix: {
      label: '[matrix]: matrix without brackets',
      start: '\\begin{matrix}\n',
      end: '\n\\end{matrix}',
    },
    bmatrix: {
      label: '[bmatrix]: matrix with brackets []',
      start: '\\begin{bmatrix}\n',
      end: '\n\\end{bmatrix}',
    },
    pmatrix: {
      label: '[pmatrix]: matrix with parentheses ( )',
      start: '\\begin{pmatrix}\n',
      end: '\n\\end{pmatrix}',
    },
    tabular: {
      label: '[tabular]: table environment',
      start: '\\begin{tabular}{|c|c|}\n\\hline\n',
      end: '\n\\hline\n\\end{tabular}',
    },
    "maths bold": {
      label: '[maths bold]: bold math expression',
      start: '\\pmb{',
      end: '}',
    }
  };

  // sort options alphabetically by label
  options = Object.fromEntries(
    Object.entries(options).sort((a, b) => a[1].label.localeCompare(b[1].label))
  );

  const envTypes = Object.keys(options);
  const choice = await tp.system.suggester(
    envTypes.map((key) => options[key].label),
    envTypes,
    false,
    'Select LaTeX environment'
  );
  if (choice) {
    const env = options[choice];
    const replacement = `${env.start}${tp.file.selection()}${env.end}`;
    tp.app.workspace.activeLeaf.view.editor.replaceSelection(replacement);
  }
}


async function alignEquations(tp, environment) {
  const environments = ['align', 'gather', 'split', 'empheq', 'cases'];
  const cases = ['empheq', 'cases'];

  const delimiter = cases.includes(environment) ? '\\\\' : '&\\\\[6pt]';

  let content = tp.file.selection();
  if (!environments.includes(environment)) return content;

  // Add \\ at the end of each line except the last
  let lines = content.split('\n');
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].trim() !== '') {
      lines[i] = lines[i] + ` ${delimiter}`;
    }
  }
  content = lines.join('\n');

  // Wrap with selected environment
}

async function generateLatexColor(tp) {
  let expresion = tp.file.selection();
  const colors = [
    'red',
    'yellow',
    'blue',
    'green',
    'orange',
    'purple',
    'pink',
    'fuchsia',
    'cyan',
    'black',
  ];
  const color = await tp.system.suggester(colors, colors);
  if (color) {
    const replacement = `{\\color{${color}} ${expresion}}`;
    tp.app.workspace.activeLeaf.view.editor.replaceSelection(replacement);
  }
}

module.exports = {
  environment: generateLatexEnvironment,
  color: generateLatexColor,
};
