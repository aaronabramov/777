import deepEqual from 'deep-equal';
import {assertNoExpectedValue} from './utils';

export default {
  toBe(actual, expected, {isNot} = {}) {

    if (!isNot ^ (actual === expected)) {
      return {
        message: `expected ${actual} to ${isNot ? '!==' : '==='} ${expected}`,
      };
    }
  },

  toBeDefined(actual, expected, {isNot} = {}) {
    assertNoExpectedValue(expected);
    if (!isNot ^ (undefined !== actual)) {
      return {
        message: `expected ${expected} ${isNot ? 'not' : ''} to be defined`,
      };
    }
  },

  toBeFalsy(actual, expected, {isNot} = {}) {
    assertNoExpectedValue(expected);

    if (!isNot ^ !actual) {
      return {
        message: `expected ${actual}${isNot ? ' not' : ''} to be falsy`,
      };
    }
  },

  toMatch(actual, expected, {isNot} = {}) {
    if (!isNot ^ !!actual.match(expected)) {
      return {
        message: `expected ${actual}${isNot ? ' not' : ''} to match ${expected}`,
      };
    }
  },

  toThrow(actual, expected, {isNot} = {}) {
    if (typeof actual !== 'function') {
      throw new Error('expected argument to be a function');
    }

    let error;

    try {
      actual();
    } catch (err) {
      error = err;
    }

    if (!expected) {
      if (!isNot ^ !!error) {
        const message = isNot ?
          `expected the function to not throw, but it threw ${formatError(error)}` :
          `expected the function to throw, but it didn't`;

        return {message};
      }
    } else if (typeof expected === 'string' || expected.constructor.name === 'RegExp') {
      if (!isNot ^ !!(error && error.message.match(expected))) {
        const message = isNot ?
          `expected the function to not throw an error matching ${expected}, but it did` :
          `expected the function to throw an error matching ${expected}, but it didn't`;

        return {message};
      }
    } else if (typeof expected === 'function') {
      if (!isNot ^ (error && (error.constructor === expected))) {
        const message = isNot ?
          `expected the function to not throw '${expected}' error, but it did` :
          `expected the function to throw '${expected}' error, but it didn't`;

        return {message};
      }
    } else {
      throw new Error(`unexpected argument: ${expected}`);
    }
  },

  toDeepEqual(actual, expected, {isNot} = {}) {
    if (!isNot ^ deepEqual(actual, expected, {strict: true})) {
      const message = isNot ?
        `expected to not be equal` :
        `expected '${JSON.stringify(actual)}' to deep equal '${JSON.stringify(expected)}'`;

      return {message};
    }
  },
};

function formatError(err) {
  return err.toString();
}
