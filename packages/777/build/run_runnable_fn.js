'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);exports.default = 


runRunnableFunction;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function runRunnableFunction(
fn, 
context) 
{
  return new _promise2.default(function (resolve, reject) {
    try {
      if (fn.length > 0) {// arity is 1 (done cb is passed)
        fn.call(context, function (err) {return err ? reject(err) : resolve();});
        return;}


      var promise = fn.call(context);

      if (promise instanceof _promise2.default) {
        return promise.then(resolve, reject);}


      if (promise === undefined) {
        return resolve();}


      reject(new Error('Unexpected return. Expected Promise or undefined'));} 
    catch (err) {
      reject(err);}});}