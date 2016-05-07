// @flow
import Describe from './describe';
import It from './it';
import {last} from './utils';

import type {RunnableFunction} from './types';

const GLOBAL_DESCRIBE_NAME = '__global_describe__';

global.__global_describe__ = new Describe(GLOBAL_DESCRIBE_NAME);
global.__describe_stack__ = [global.__global_describe__];

function addDescribe(name: string, fn: () => void) {
  const describe = new Describe(name);
  last(global.__describe_stack__).children.push(describe);
  global.__describe_stack__.push(describe);
  fn();
  global.__describe_stack__.pop();
  return describe;
}

export function describe(name: string, fn: () => void): void {
  addDescribe(name, fn);
}

describe.skip = (name: string, fn: () => void): void => {
  addDescribe(name, fn).skipped = true;
};

export function it(name: string, fn: RunnableFunction): void {
  const currentDescribe = last(global.__describe_stack__);
  currentDescribe.its.push(new It(name, fn));
}

it.skip = (name: string, fn: RunnableFunction): void => {
  const it = new It(name, fn);
  it.skipped = true;
  last(global.__describe_stack__).its.push(it);
};

export function beforeEach(fn: RunnableFunction): void {
  last(global.__describe_stack__).beforeEach.push(fn);
}

export function afterEach(fn: RunnableFunction): void {
  last(global.__describe_stack__).afterEach.push(fn);
}
