// @flow
/* eslint-disable no-console */

import chalk from 'chalk';
import invariant from '../invariant';

import type {DispatcherData, DispatcherEvent, DispatcherObject} from '../types';
let indent = 0;

let passed;
let failed;
let skipped;
passed = failed = skipped = 0;

function getIndent() {
  return Array(indent + 1).join('  ');
}

let errors = [];

export default function(
  event: DispatcherEvent,
  object: ?DispatcherObject,
  data: ?DispatcherData
): void {
  switch (event) {
  case 'suite_start':
    invariant(object);
    console.log(getIndent() + object.name);
    indent += 1;
    break;

  case 'test_fail':
    invariant(object);
    console.log(getIndent() + chalk.red('✘'), object.name);
    invariant(data && data.error);
    errors.push({object, error: data.error});
    failed += 1;
    break;

  case 'test_pass':
    invariant(object);
    console.log(getIndent() + chalk.green('✔'), object.name);
    passed += 1;
    break;

  case 'suite_end':
    indent -= 1;
    break;

  case 'test_skip':
    invariant(object);
    console.log(getIndent() + chalk.yellow('•', object.name));
    skipped += 1;
    break;

  case 'end':
    console.log(
      chalk.green(`\npassed ${passed}`),
      chalk.red(`failed ${failed}`),
      chalk.yellow(`skipped ${skipped}`),
    );
    errors.forEach(({object, error}) => {
      console.log(object.name + ':');
      console.log(chalk.red(error.stack));
    });
  }
}
