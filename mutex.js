/**
 * @flow
 */

export default class Mutex {
  queue: Array<any>;
  locked: bool;

  constructor() {
    this.queue = [];
    this.locked = false;
  }

  sync(fn: (release: Function) => ?Promise) {
    this.queue.push(fn);
    this.next();
  }

  next() {
    if (this.locked || this.queue.length < 1) {
      return;
    }

    this.locked = true;

    let released = false;

    const release = () => {
      if (!released) { // in case it's called more than once
        released = true;
        this.locked = false;
        this.next();
      }
    };

    const next = this.queue.shift();

    const promise = next(release);
    if (promise && promise.then) {
      promise.then(release);
    }
  }
}
