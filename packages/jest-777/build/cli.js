'use strict';var _runner = require('./runner');
var _glob = require('glob');var _glob2 = _interopRequireDefault(_glob);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _spec = require('./reporters/spec');var _spec2 = _interopRequireDefault(_spec);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var args = process.argv.slice(2);
var files = args.
map(function (file) {return _path2.default.resolve(process.cwd(), file);}).
reduce(function (prev, file) {return prev.concat(_glob2.default.sync(file));}, []);

files.forEach(require);

(0, _runner.run)(_spec2.default).then(function (_ref) {var failed = _ref.failed;
  process.on('exit', function () {
    process.exit(failed ? 1 : 0);});});