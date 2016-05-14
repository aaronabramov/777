'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.



























describe = describe;exports.












it = it;exports.












beforeEach = beforeEach;exports.



afterEach = afterEach;var _describe = require('./describe');var _describe2 = _interopRequireDefault(_describe);var _it = require('./it');var _it2 = _interopRequireDefault(_it);var _utils = require('./utils');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var GLOBAL_DESCRIBE_NAME = '__global_describe__';global.__global_describe__ = new _describe2.default(GLOBAL_DESCRIBE_NAME);global.__describe_stack__ = [global.__global_describe__];global.__is_there_any_only_calls__ = false;function addDescribe(name, fn) {var describe = new _describe2.default(name);(0, _utils.last)(global.__describe_stack__).children.push(describe);global.__describe_stack__.push(describe);fn();global.__describe_stack__.pop();return describe;}function addIt(name, fn) {var it = new _it2.default(name, fn);(0, _utils.last)(global.__describe_stack__).its.push(it);return it;}function describe(name, fn) {addDescribe(name, fn);}describe.skip = function (name, fn) {addDescribe(name, fn).skipped = true;};describe.only = function (name, fn) {addDescribe(name, fn).only = true;global.__is_there_any_only_calls__ = true;};function it(name, fn) {addIt(name, fn);}it.skip = function (name, fn) {addIt(name, fn).skipped = true;};it.only = function (name, fn) {addIt(name, fn).only = true;global.__is_there_any_only_calls__ = true;};function beforeEach(fn) {(0, _utils.last)(global.__describe_stack__).beforeEach.push(fn);}function afterEach(fn) {
  (0, _utils.last)(global.__describe_stack__).afterEach.push(fn);}