import {spawnSync} from 'child_process';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import chalk from 'chalk';

const babel = require('babel-core');
const ROOT_DIR = path.resolve(__dirname, '..');
const PACKAGE_DIR = path.resolve(ROOT_DIR, 'package');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const JS_FILES_PATTERN = path.resolve(ROOT_DIR, 'src/**/*.js');

const files = glob.sync(JS_FILES_PATTERN);
spawnSync('mkdir', ['-p', PACKAGE_DIR]);

process.stdout.write(chalk.inverse('Transforming source files:') + '\n');
files.forEach(file => {
  const destPath = path.resolve(PACKAGE_DIR, path.relative(SRC_DIR, file));
  const transformed = babel.transformFileSync(file).code;
  spawnSync('mkdir', ['-p', path.dirname(destPath)]);
  fs.writeFileSync(destPath, transformed);
  process.stdout.write(
    path.relative(ROOT_DIR, file) +
    chalk.green(' ⇒ ') +
    path.relative(ROOT_DIR, destPath) +
    '\n'
  );
});
