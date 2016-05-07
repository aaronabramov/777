import Describe from './describe';
import It from './it';
import {last} from './utils';

import type {RunnableFunction} from './types';

const GLOBAL_DESCRIBE_NAME = '__global_describe__';

global.__global_describe__ = new Describe(GLOBAL_DESCRIBE_NAME);
global.__describe_stack__ = [global.__global_describe__];

export function describe(name: string, fn: () => void) {
  const currentDescribe = last(global.__describe_stack__);
  const describe = new Describe(name);
  currentDescribe.children.push(describe);

  global.__describe_stack__.push(describe);
  fn();
  global.__describe_stack__.pop();
}

export function it(name: string, fn: RunnableFunction) {
  const currentDescribe = last(global.__describe_stack__);
  currentDescribe.its.push(new It(name, fn));
}

export function beforeEach(fn) {
  last(global.__describe_stack__).beforeEach.push(fn);
}

export function afterEach(fn) {
  last(global.__describe_stack__).afterEach.push(fn);
}

// export function beforeAll() {}
// export function beforeEach() {}
// export function afterAll() {}
// export function afterEach() {}
