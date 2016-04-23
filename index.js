/*
 * @flow
 */

import Mutex from './mutex';

const GLOBAL_DESCRIBE_ID = '__global_describe__';

const mutex = new Mutex();

class Runnable {
  id: string;
  parent: Describe;
  depth: ?number;


  getDepth() {
    if (typeof this.depth === 'number') {
      return this.depth;
    }

    let depth = 0;
    let parent = this.parent;

    while(parent && (parent = parent.parent)) {
      depth += 1;
    }

    return this.depth = depth;
  }
}

type DispatcherEvent = 'test_start' | 'test_end' | 'test_pass' | 'test_fail'
  | 'suite_start' | 'suite_end';

type DispatcherData = Describe | Test;

class Dispatcher {
  callbacks: Array<Function>;

  constructor() {
    this.callbacks = [];
  }

  dispatch(event: DispatcherEvent, data: ?DispatcherData) {
    this.callbacks.forEach(cb => cb(event, data));
  }

  register(fn: Function) {
    this.callbacks.push(fn);
  }
}

const dispatcher = new Dispatcher();

class Test extends Runnable {
  fn: Function;
  status: 'failed' | 'passed';
  error: Error;

  constructor(id: string, fn: Function) {
    super();
    this.id = id;
    this.fn = fn;
  }

  run() {
    mutex.sync((release) => {
      dispatcher.dispatch('test_start', this);
      try {
        if (this.fn.length > 0) { // arity is 1 (done cb is passed)
          return this.fn((err) => {
            if (err) {
              this._fail(err);
              return release();
            }
            this._pass();
            release();
          });
        }

        const promise = this.fn();

        if (promise instanceof Promise) {
          return promise
            .then(this._pass.bind(this))
            .catch(this._fail.bind(this));
        }

        if (promise === undefined) {
          this._pass();
          return release();
        }

        this._fail(
          new Error('Unexpected return. Expected Promise or undefined')
        );
        release();
      } catch (err) {
        this._fail(err);
        release();
      }
    });
  }

  _pass() {
    this.status = 'passed';
    dispatcher.dispatch('test_pass', this);
    dispatcher.dispatch('test_end', this);
  }

  _fail(err: Error) {
    this.status = 'failed';
    this.error = err;
    dispatcher.dispatch('test_fail', this);
    dispatcher.dispatch('test_end', this);
  }

  getDepth() {
    if (typeof this.depth === 'number') {
      return this.depth;
    }

    let depth = 0;
    let parent = this.parent;

    while(parent && (parent = parent.parent)) {
      depth += 1;
    }

    return this.depth = depth;
  }
}

class Describe extends Runnable {
  children: Array<Describe>;
  tests: Array<Test>;

  constructor(id: string) {
    super();
    this.id = id;
    this.children = [];
    this.tests = [];
  }

  addChild(child: Describe) {
    child.parent = this;
    this.children.push(child);
  }

  addTest(test: Test) {
    test.parent = this;
    this.tests.push(test);
  }

  run() {
    mutex.sync((release) => {
      dispatcher.dispatch('suite_start', this);
      release();
    });
    this.tests.forEach(t => t.run());
    this.children.forEach(d => d.run());
    mutex.sync((release) => {
      dispatcher.dispatch('suite_end', this);
      release();
    });
  }
}

const globalDescribe = new Describe(GLOBAL_DESCRIBE_ID);
const describeStack = [globalDescribe];

export function describe(id: string, fn: Function) {
  const desc = new Describe(id);
  const currentDescribe = describeStack[describeStack.length - 1];

  currentDescribe.addChild(desc);
  describeStack.push(desc);

  fn();

  describeStack.pop();
}

export function it(id: string, fn: Function): void {
  const test = new Test(id, fn);
  const currentDescribe = describeStack[describeStack.length - 1];

  currentDescribe.addTest(test);
}

export function getTestTree(): Describe {
  return globalDescribe;
}

export function getDispatcher(): Dispatcher {
  return dispatcher;
}
