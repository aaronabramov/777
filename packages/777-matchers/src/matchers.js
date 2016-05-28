export default {
  toBe(actual, expected, {isNot} = {}) {

    if (!isNot ^ (actual === expected)) {
      return {
        message: `expected ${actual} to ${isNot ? '!==' : '==='} ${expected}`,
      };
    }
  },

  toBeDefined(actual, expected, {isNot} = {}) {
    assertUndefined(expected);
    if (!isNot ^ (undefined !== actual)) {
      return {
        message: `expected ${expected} ${isNot ? 'not' : ''} to be defined`,
      };
    }
  },

  toBeFalsy(actual, expected, {isNot} = {}) {
    assertUndefined(expected);

    if (!isNot ^ !actual) {
      return {
        message: `expected ${actual}${isNot ? ' not' : ''} to be falsy`,
      };
    }
  },
};

function assertUndefined(expected) {
  if (expected) {
    throw new Error('this matcher does not accept arguments');
  }
}
