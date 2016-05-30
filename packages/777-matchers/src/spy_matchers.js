import {assertNoExpectedValue} from './utils';

export default {
  toHaveBeenCalled(actual, expected, {isNot} = {}) {
    assertNoExpectedValue(expected);
    assertSpy(actual);

    if (!isNot ^ !!actual.calls.count()) {
      const message = isNot ?
        `expected a spy to not be called, but it was called ${actual.calls.count()} times` :
        `expected a spy to be called but it wasn't`;
      throw new Error(message);
    }
  },

  toHaveBeenCalledTimes(actual, expected, {isNot} = {}) {
    assertSpy(actual);

    if (!isNot ^ (actual.calls.count() === expected)) {
      const message = isNot ?
        `expected a spy to not be called ${expected} times, but it was called ${actual.calls.count()} times` :
        `expected a spy to be called ${expected} times, but it was called ${actual.calls.count()} times`;
      throw new Error(message);
    }
  },
};

function assertSpy(spy) {
  if (!spy || !spy.thisIsASpy) {
    throw new Error('This matcher can only execute on a Spy function');
  }
}
