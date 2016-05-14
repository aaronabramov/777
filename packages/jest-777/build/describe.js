'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 




Describe = 










function Describe(name) {(0, _classCallCheck3.default)(this, Describe);
  this.name = name;
  this.its = [];
  this.children = [];
  this.beforeEach = [];
  this.beforeAll = [];
  this.afterEach = [];
  this.afterAll = [];
  this.skipped = false;
  this.only = false;};exports.default = Describe;