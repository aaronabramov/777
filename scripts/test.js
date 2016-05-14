import path from 'path';
import {spawnSync} from 'child_process';
import getPackages from './_getPackages';
import chalk from 'chalk';


function runCommand(cmd, args, cwd) {
  cwd || (cwd = process.cwd());

  process.stdout.write(
    chalk.inverse.underline(
      `Running: ${cmd} ${args.join(' ')} @ ` +
      `${path.relative(process.cwd(), cwd)}\n`
    )
  );

  spawnSync(cmd, args, {cwd, stdio: 'inherit'});
}

const packages = getPackages();

packages.forEach((p) => {
  process.stdout.write(
    chalk.inverse(`\nTesting package: ${path.basename(p)}\n`)
  );
  runCommand('npm', ['install'], p);
  runCommand('npm', ['test'], p);
});
