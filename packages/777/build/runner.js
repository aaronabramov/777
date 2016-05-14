'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.run = undefined;var _create = require('babel-runtime/core-js/object/create');var _create2 = _interopRequireDefault(_create);var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _getIterator2 = require('babel-runtime/core-js/get-iterator');var _getIterator3 = _interopRequireDefault(_getIterator2);var _map = require('babel-runtime/core-js/map');var _map2 = _interopRequireDefault(_map);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var run = exports.run = function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(









  function _callee(callback) {var 
    visited, 
    stack, 
    dispatcher, 
    dispatch, 
    failed, 






    describe, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, 








    it, 








    unvisited;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:visited = new _map2.default();stack = [global.__global_describe__];dispatcher = new _dispatcher2.default();dispatch = dispatcher.dispatch;failed = false;if (callback) {dispatcher.register(callback);}case 6:if (!stack.length) {_context.next = 49;break;}describe = (0, _utils.last)(stack);if (visited.get(describe)) {_context.next = 45;break;}visited.set(describe, true);if (describe === global.__global_describe__) {dispatcher.dispatch('start', describe);} else {dispatcher.dispatch('suite_start', describe);}_iteratorNormalCompletion = true;_didIteratorError = false;_iteratorError = undefined;_context.prev = 14;_iterator = (0, _getIterator3.default)(describe.its);case 16:if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {_context.next = 29;break;}it = _step.value;_context.prev = 18;_context.next = 21;return runIt(dispatch, stack, it);case 21:_context.next = 26;break;case 23:_context.prev = 23;_context.t0 = _context['catch'](18);failed = true;case 26:_iteratorNormalCompletion = true;_context.next = 16;break;case 29:_context.next = 35;break;case 31:_context.prev = 31;_context.t1 = _context['catch'](14);_didIteratorError = true;_iteratorError = _context.t1;case 35:_context.prev = 35;_context.prev = 36;if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}case 38:_context.prev = 38;if (!_didIteratorError) {_context.next = 41;break;}throw _iteratorError;case 41:return _context.finish(38);case 42:return _context.finish(35);case 43:_context.next = 47;break;case 45:unvisited = describe.children.find(function (d) {return !visited.get(d);});
            if (unvisited) {
              stack.push(unvisited);} else 
            {
              stack.pop();
              if (describe === global.__global_describe__) {
                dispatch('end', describe);} else 
              {
                dispatch('suite_end', describe);}}case 47:_context.next = 6;break;case 49:return _context.abrupt('return', 





            { failed: failed });case 50:case 'end':return _context.stop();}}}, _callee, this, [[14, 31, 35, 43], [18, 23], [36,, 38, 42]]);}));return function run(_x) {return ref.apply(this, arguments);};}();var runIt = function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(


  function _callee2(dispatch, stack, it) {var 








    context, 

    failedInBeforeEach, 
    failedInIt, 
    firstFailedInAfterEach, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, 



    fn, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, 













    _fn, 








    finalError;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:dispatch('test_start', it);if (!isTestSkipped(it, stack)) {_context2.next = 5;break;}dispatch('test_skip', it);dispatch('test_end', it);return _context2.abrupt('return');case 5:context = (0, _create2.default)(null);failedInBeforeEach = void 0;failedInIt = void 0;firstFailedInAfterEach = void 0; // run every beforeEach, but stop as soon as at least one fails
            _context2.prev = 9;_iteratorNormalCompletion2 = true;_didIteratorError2 = false;_iteratorError2 = undefined;_context2.prev = 13;_iterator2 = (0, _getIterator3.default)(getBeforeEachHooks(stack));case 15:if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {_context2.next = 22;break;}fn = _step2.value;_context2.next = 19;return (0, _run_runnable_fn2.default)(fn, context);case 19:_iteratorNormalCompletion2 = true;_context2.next = 15;break;case 22:_context2.next = 28;break;case 24:_context2.prev = 24;_context2.t0 = _context2['catch'](13);_didIteratorError2 = true;_iteratorError2 = _context2.t0;case 28:_context2.prev = 28;_context2.prev = 29;if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}case 31:_context2.prev = 31;if (!_didIteratorError2) {_context2.next = 34;break;}throw _iteratorError2;case 34:return _context2.finish(31);case 35:return _context2.finish(28);case 36:_context2.next = 41;break;case 38:_context2.prev = 38;_context2.t1 = _context2['catch'](9);failedInBeforeEach = _context2.t1;case 41:if (failedInBeforeEach) {_context2.next = 50;break;}_context2.prev = 42;_context2.next = 45;return (0, _run_runnable_fn2.default)(it.fn, context);case 45:_context2.next = 50;break;case 47:_context2.prev = 47;_context2.t2 = _context2['catch'](42);failedInIt = _context2.t2;case 50:_iteratorNormalCompletion3 = true;_didIteratorError3 = false;_iteratorError3 = undefined;_context2.prev = 53;_iterator3 = (0, _getIterator3.default)(getAfterEachHooks(stack));case 55:if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {_context2.next = 68;break;}_fn = _step3.value;_context2.prev = 57;_context2.next = 60;return (0, _run_runnable_fn2.default)(_fn, context);case 60:_context2.next = 65;break;case 62:_context2.prev = 62;_context2.t3 = _context2['catch'](57);firstFailedInAfterEach || (firstFailedInAfterEach = _context2.t3);case 65:_iteratorNormalCompletion3 = true;_context2.next = 55;break;case 68:_context2.next = 74;break;case 70:_context2.prev = 70;_context2.t4 = _context2['catch'](53);_didIteratorError3 = true;_iteratorError3 = _context2.t4;case 74:_context2.prev = 74;_context2.prev = 75;if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}case 77:_context2.prev = 77;if (!_didIteratorError3) {_context2.next = 80;break;}throw _iteratorError3;case 80:return _context2.finish(77);case 81:return _context2.finish(74);case 82:finalError = void 0;
            if (failedInBeforeEach) {
              finalError = failedInBeforeEach;}


            if (failedInIt) {
              finalError = failedInIt;}


            if (firstFailedInAfterEach) {
              finalError = firstFailedInAfterEach;}


            if (finalError) {
              dispatch('test_fail', it, { error: finalError });} else 
            {
              dispatch('test_pass', it);}

            dispatch('test_end', it);if (!

            finalError) {_context2.next = 90;break;}throw (
              finalError);case 90:case 'end':return _context2.stop();}}}, _callee2, this, [[9, 38], [13, 24, 28, 36], [29,, 31, 35], [42, 47], [53, 70, 74, 82], [57, 62], [75,, 77, 81]]);}));return function runIt(_x2, _x3, _x4) {return ref.apply(this, arguments);};}();var _utils = require('./utils');var _dispatcher = require('./dispatcher');var _dispatcher2 = _interopRequireDefault(_dispatcher);var _run_runnable_fn = require('./run_runnable_fn');var _run_runnable_fn2 = _interopRequireDefault(_run_runnable_fn);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



function getBeforeEachHooks(stack) {
  return stack.reduce(function (hooks, describe) {
    return hooks.concat(describe.beforeEach);}, 
  []);}


function getAfterEachHooks(stack) {
  return stack.reduceRight(function (hooks, describe) {
    return hooks.concat(describe.afterEach);}, 
  []);}


// true if this test or any of the parent describe blocks are skipped OR
// if there is anything with `only === true` in the tree and it's not this
// test or any of its parent describes.
function isTestSkipped(it, stack) {
  return it.skipped || stack.some(function (describe) {return describe.skipped;}) || 
  global.__is_there_any_only_calls__ && !it.only && 
  !stack.some(function (describe) {return describe.only;});}