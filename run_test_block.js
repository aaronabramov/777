/*
 * @flow
 */

export default function runTestBlock(fn: Function): Promise {
  return new Promise((resolve, reject) => {
    try {
      if (fn.length > 0) { // arity is 1 (done cb is passed)
        fn((err) => err ? reject(err) : resolve());
        return;
      }

      const promise = fn();

      if (promise instanceof Promise) {
        return promise.then(resolve, reject);
      }

      if (promise === undefined) {
        return resolve();
      }

      reject(new Error('Unexpected return. Expected Promise or undefined'));
    } catch (err) {
      reject(err);
    }
  });
}
