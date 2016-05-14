import {run} from './runner';
import glob from 'glob';
import path from 'path';
import spec from '777-reporter-spec';

const cwd = process.cwd();
const args = process.argv.slice(2);
const files = args
  .map(file => path.resolve(process.cwd(), file))
  .reduce((prev, file) => prev.concat(glob.sync(file)), []);

process.stdout.write(
  'Files:\n' +
  files.map(f => path.relative(cwd, f)).join('\n') +
  '\n\n');
files.forEach(require);

run(spec).then(({failed}) => {
  process.on('exit', () => {
    process.exit(failed ? 1 : 0);
  });
});
