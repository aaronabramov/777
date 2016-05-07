import chalk from 'chalk';

let indent = 0;

function getIndent() {
  return Array(indent + 1).join('  ');
}

export default function(event, data) {
  switch (event) {
  case 'suite_start':
    indent += 1;
    console.log(getIndent() + data.name);
    break;

  case 'test_fail':
    console.log(getIndent() + chalk.red('✘ '), data.name);
    break;

  case 'test_pass':
    console.log(getIndent() + chalk.green('✔ '), data.name);
    break;

  case 'suite_end':
    indent -= 1;
    break;
  }

}
