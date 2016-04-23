import chalk from 'chalk';

function getIndent(n) {
  return Array(n + 1).join('  ');
}

export default function(event, data) {
  switch (event) {
  case 'suite_start':
    console.log(getIndent(data.getDepth()), data.id);
    break;

  case 'test_fail':
    console.log(getIndent(data.getDepth()), chalk.red('✘ '), data.id);
    break;

  case 'test_pass':
    console.log(getIndent(data.getDepth()), chalk.green('✔ '), data.id);
  }
}
