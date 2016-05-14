import getPackages from './_getPackages';
import {spawnSync} from 'child_process';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import chalk from 'chalk';

const babel = require('babel-core');
const BUILD_DIR = 'build';
const SRC_DIR = 'src';
const JS_FILES_PATTERN = '**/*.js';


function buildPackage(p) {
  const srcDir = path.resolve(p, SRC_DIR);
  const pattern = path.resolve(srcDir, JS_FILES_PATTERN);
  const files = glob.sync(pattern);
  const buildDir = path.resolve(p, BUILD_DIR);
  spawnSync('mkdir', ['-p', buildDir]);

  process.stdout.write(
    chalk.inverse(`Building package: ${path.basename(p)}\n`)
  );

  files.forEach(file => {
    const destPath = path.resolve(buildDir, path.relative(srcDir, file));
    const transformed = babel.transformFileSync(file).code;
    spawnSync('mkdir', ['-p', path.dirname(destPath)]);
    fs.writeFileSync(destPath, transformed);
    process.stdout.write(
      path.relative(p, file) +
      chalk.green(' ⇒ ') +
      path.relative(p, destPath) +
      '\n'
    );
  });
}

getPackages().forEach(buildPackage);
