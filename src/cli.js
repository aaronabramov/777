import {run} from './runner';
import glob from 'glob';
import path from 'path';
import spec from './reporters/spec';

const args = process.argv.slice(2);
const files = args
  .map(file => path.resolve(process.cwd(), file))
  .reduce((prev, file) => prev.concat(glob.sync(file)), []);

files.forEach(require);

run(spec).then(({failed}) => {
  if (failed) {
    process.exit(1);
  } else {
    process.exit(0);
  }
});
