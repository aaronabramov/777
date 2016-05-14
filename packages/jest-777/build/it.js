'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 



It = 





function It(name, fn) {(0, _classCallCheck3.default)(this, It);
  this.name = name;
  this.fn = fn;
  this.skipped = false;
  this.only = false;};exports.default = It;