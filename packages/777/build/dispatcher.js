'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 






Dispatcher = function () {







  function Dispatcher() {(0, _classCallCheck3.default)(this, Dispatcher);
    this.callbacks = [];
    this.dispatch = this.dispatch.bind(this);}(0, _createClass3.default)(Dispatcher, [{ key: 'dispatch', value: function dispatch(



    event, 
    object, 
    data) 
    {
      this.callbacks.forEach(function (cb) {return cb(event, object, data);});} }, { key: 'register', value: function register(


    fn) {
      this.callbacks.push(fn);} }]);return Dispatcher;}();exports.default = Dispatcher;