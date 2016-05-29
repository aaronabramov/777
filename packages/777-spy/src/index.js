export function spyOn(obj, fnName) {
  if (!obj) {
    throw new Error(`can't spy on a method of non-existing object`);
  }

  if (!obj.hasOwnProperty(fnName) || typeof obj[fnName] !== 'function') {
    throw new Error(`property ${fnName} of ${obj} is not a function`);
  }

  const spy = _createSpy({obj, fnName});
  obj[fnName] = spy;

  return spy;
}

export function createSpy() {
  return _createSpy();
}

function _createSpy({obj, fnName} = {}) {
  let originalFn;

  if (obj) {
    originalFn = obj[fnName];
  }

  const calls = [];

  const spyConfig = {
    callThrough: false,
    mockReturnedValue: false,
    returnValue: undefined,
    callFake: undefined,
  };

  const spyFn = function() {
    let returned;

    if (spyConfig.callThrough && spyConfig.callFake) {
      throw new Error(`Can't use 'callThrough' and 'callFake' together`);
    }

    if (spyConfig.callThrough) {
      returned = originalFn.apply(this, arguments);
    }

    if (spyConfig.mockReturnedValue) {
      returned = spyConfig.returnValue;
    }

    if (spyConfig.callFake) {
      returned = spyConfig.callFake.apply(this, arguments);
    }

    calls.push({
      object: obj,
      returnValue: returned,
      args: Array.prototype.slice.call(arguments),
    });

    return returned;
  };

  spyFn.calls = {
    any() {
      return !!calls.length;
    },
    count() {
      return calls.length;
    },
    argsFor(n) {
      if (!calls[n]) {
        throw new Error(`There is no call with index '${n}'. total # of calls: ${calls.length}`);
      }

      return calls[n].args;
    },
    allArgs() {
      return calls.map(call => call.args);
    },
    all() {
      return calls;
    },
    mostRecent() {
      return calls[calls.length - 1];
    },
    first() {
      return calls[0];
    },
  };

  spyFn.and = {
    returnValue(value) {
      spyConfig.mockReturnedValue = true;
      spyConfig.returnValue = value;
      return spyFn;
    },
    callThrough() {
      spyConfig.callThrough = true;
      return spyFn;
    },
    callFake(fn) {
      spyConfig.callFake = fn;
      return spyFn;
    },
  };

  return spyFn;
}
