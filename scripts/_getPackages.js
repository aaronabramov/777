import path from 'path';
import glob from 'glob';

const pattern = path.resolve(__dirname, '../packages/*/package.json');

// return an array of directories contaiting independent packages
export default function() {
  return glob
  .sync(pattern)
  .map(p => path.dirname(p));
}
