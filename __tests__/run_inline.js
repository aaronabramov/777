// @flow

import path from 'path';
import fs from 'fs';
import {spawnSync} from 'child_process';

const ROOT_PATH = path.resolve(__dirname, '..');
const TEMP_DIR = path.resolve(ROOT_PATH, '.inline_test_tmp');

type RunResult = {
  stdout: ?string,
  stderr: ?string,
  status: number,
};

export default function runInline(string: string): RunResult {
  const cwd = ROOT_PATH;
  const tempTestFile = path.resolve(TEMP_DIR, Date.now() + '.js');

  spawnSync('mkdir', ['-p', TEMP_DIR], {cwd});
  const contents = `import {it, describe, beforeEach, afterEach} from '../src';${string}`;

  fs.writeFileSync(tempTestFile, contents, 'utf8');
  const result = spawnSync('babel-node', ['src/cli.js', tempTestFile]);
  fs.unlinkSync(tempTestFile);

  return {
    stdout: result.stdout && result.stdout.toString(),
    stderr: result.stderr && result.stderr.toString(),
    status: result.status,
  };
}
