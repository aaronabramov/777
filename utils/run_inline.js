// @flow

import path from 'path';
import fs from 'fs';
import {spawnSync} from 'child_process';

const ROOT_PATH: string = path.resolve(__dirname, '..');

type RunResult = {
  stdout: ?string,
  stderr: ?string,
  status: number,
};

type Options = {
  cwd?: string,
};

export default function runInline(string: string, options: ?Options): RunResult {
  if (!options) {
    options = {};
  }

  const cwd = options.cwd || ROOT_PATH;
  const tmpDir = path.resolve(cwd, '.inline_test_tmp');
  const tempTestFile = path.resolve(tmpDir, Date.now() + '.js');
  const cliPath = path.resolve(__dirname, '..', 'packages/777/src/cli');
  const runnerPath = path.resolve(__dirname, '..', 'packages/777/src');

  spawnSync('mkdir', ['-p', tmpDir], {cwd});
  const contents = `import {it, describe, beforeEach, afterEach} from '${runnerPath}';${string}`;

  fs.writeFileSync(tempTestFile, contents, 'utf8');
  const result = spawnSync('babel-node', [cliPath, tempTestFile]);
  fs.unlinkSync(tempTestFile);

  return {
    stdout: result.stdout && result.stdout.toString(),
    stderr: result.stderr && result.stderr.toString(),
    status: result.status,
  };
}
