'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = 



















function (
event, 
object, 
data) 
{
  switch (event) {
    case 'suite_start':
      (0, _invariant2.default)(object);
      console.log(getIndent() + object.name);
      indent += 1;
      break;

    case 'test_fail':
      (0, _invariant2.default)(object);
      console.log(getIndent() + _chalk2.default.red('✘'), object.name);
      (0, _invariant2.default)(data && data.error);
      errors.push({ object: object, error: data.error });
      failed += 1;
      break;

    case 'test_pass':
      (0, _invariant2.default)(object);
      console.log(getIndent() + _chalk2.default.green('✔'), object.name);
      passed += 1;
      break;

    case 'suite_end':
      indent -= 1;
      break;

    case 'test_skip':
      (0, _invariant2.default)(object);
      console.log(getIndent() + _chalk2.default.yellow('•', object.name));
      skipped += 1;
      break;

    case 'end':
      console.log([
      _chalk2.default.green('\npassed ' + passed), 
      _chalk2.default.red('failed ' + failed), 
      _chalk2.default.yellow('skipped ' + skipped)].
      join(', '));
      errors.forEach(function (_ref) {var object = _ref.object;var error = _ref.error;
        console.log(object.name + ':');
        console.log(_chalk2.default.red(error.stack));});}};var _chalk = require('chalk');var _chalk2 = _interopRequireDefault(_chalk);var _invariant = require('../invariant');var _invariant2 = _interopRequireDefault(_invariant);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /* eslint-disable no-console */var indent = 0;var passed = void 0;var failed = void 0;var skipped = void 0;passed = failed = skipped = 0;function getIndent() {return Array(indent + 1).join('  ');}var errors = [];