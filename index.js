/*
 * @flow
 */

import Mutex from './mutex';
import runTestBlock from './run_test_block';

const GLOBAL_DESCRIBE_ID = '__global_describe__';

const mutex = new Mutex();

type DispatcherEvent = 'test_start' | 'test_end' | 'test_pass' | 'test_fail'
| 'suite_start' | 'suite_end' | 'hook_start' | 'hook_end' | 'hook_pass'
| 'hook_fail';

type DispatcherData = Describe | Test | Hook;

class Runnable {
  id: string;
  parent: Describe;
  depth: ?number;
  fn: Function;

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

type HookType = 'beforeEach' | 'afterEach' | 'before' | 'after';

class Hook extends Runnable {
  type: HookType;
  fn: Function;
  error: Error;
  // hooks are run multiple times for different tests. If it fails once, it'll
  // probably fail  again, so there is no point  in re-running it, we'd rather
  // fail all tests  that depend on this hook right away. (applicable only for
  // `before` hooks)
  everFailed: bool;

  constructor(type: HookType, fn: Function) {
    super();
    this.type = type;
    this.fn = fn;
  }


  run() {
    mutex.sync(() => {
      this._start();
      return runTestBlock(this.fn).then(() => {
        this._pass();
      }).catch((err) => {
        this._fail(err);
      });
    });
  }

  _start() {
    dispatcher.dispatch('hook_start', this);
  }

  _pass() {
    dispatcher.dispatch('hook_pass', this);
    dispatcher.dispatch('hook_end', this);
  }

  _fail(err: Error) {
    this.everFailed = true;
    this.error = err;
    dispatcher.dispatch('hook_fail', this);
    dispatcher.dispatch('hook_end', this);
  }
}


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

export class Test extends Runnable {
  fn: Function;
  status: 'failed' | 'passed';
  error: Error;

  constructor(id: string, fn: Function) {
    super();
    this.id = id;
    this.fn = fn;
  }

  run() {

    getHooks(this, 'beforeEach').reverse().forEach(hook => hook.run());

    if (
      getHooks(this, 'before')
      .concat(getHooks(this, 'beforeEach'))
      .some(h => h.everFailed)
    ) {
      mutex.sync((release) => {
        this._start();
        this._fail(new Error('one of before hooks failed for this test'));
        release();
      });
      return;
    }

    mutex.sync(() => {
      this._start();
      return runTestBlock(this.fn).then(() => {
        this._pass();
      }).catch((err) => {
        this._fail(err);
      });
    });
    getHooks(this, 'afterEach').forEach(hook => hook.run());
  }

  _start() {
    dispatcher.dispatch('test_start', this);
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
}

class Describe extends Runnable {
  children: Array<Describe>;
  tests: Array<Test>;
  hooks: Array<Hook>;

  constructor(id: string) {
    super();
    this.id = id;
    this.children = [];
    this.tests = [];
    this.hooks = [];
  }

  addChild(child: Describe) {
    child.parent = this;
    this.children.push(child);
  }

  addTest(test: Test) {
    test.parent = this;
    this.tests.push(test);
  }

  addHook(hook: Hook) {
    this.hooks.push(hook);
  }

  run() {
    mutex.sync((release) => {
      dispatcher.dispatch('suite_start', this);
      release();
    });
    this.hooks.filter(({type}) => type === 'before').forEach(h => h.run());
    this.tests.forEach(t => t.run());
    this.children.forEach(d => d.run());
    this.hooks.filter(({type}) => type === 'after').forEach(h => h.run());
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

export function beforeEach(fn: Function) {
  const currentDescribe = describeStack[describeStack.length - 1];
  currentDescribe.addHook(new Hook('beforeEach', fn));
}

export function afterEach(fn: Function) {
  const currentDescribe = describeStack[describeStack.length - 1];
  currentDescribe.addHook(new Hook('afterEach', fn));
}

export function before(fn: Function) {
  const currentDescribe = describeStack[describeStack.length - 1];
  currentDescribe.addHook(new Hook('before', fn));
}

export function after(fn: Function) {
  const currentDescribe = describeStack[describeStack.length - 1];
  currentDescribe.addHook(new Hook('after', fn));
}

export function getTestTree(): Describe {
  return globalDescribe;
}

export function getDispatcher(): Dispatcher {
  return dispatcher;
}

export default function getHooks(
  test: Test,
  hookType: HookType,
): Array<Hook> {
  let parent: Describe = test.parent;
  let hooks = [].concat(parent.hooks);

  while(parent && (parent = parent.parent)) {
    hooks = hooks.concat(parent.hooks);
  }

  return hooks.filter(hook => hook.type === hookType);
}
