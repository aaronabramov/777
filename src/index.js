// @flow
import Describe from './describe';
import It from './it';
import {last} from './utils';

import type {RunnableFunction} from './types';

const GLOBAL_DESCRIBE_NAME = '__global_describe__';

global.__global_describe__ = new Describe(GLOBAL_DESCRIBE_NAME);
global.__describe_stack__ = [global.__global_describe__];
global.__is_there_any_only_calls__ = false;

function addDescribe(name: string, fn: () => void) {
  const describe = new Describe(name);
  last(global.__describe_stack__).children.push(describe);
  global.__describe_stack__.push(describe);
  fn();
  global.__describe_stack__.pop();
  return describe;
}

function addIt(name: string, fn: RunnableFunction): It {
  const it = new It(name, fn);
  last(global.__describe_stack__).its.push(it);
  return it;
}

export function describe(name: string, fn: () => void): void {
  addDescribe(name, fn);
}

describe.skip = (name: string, fn: () => void): void => {
  addDescribe(name, fn).skipped = true;
};

describe.only = (name: string, fn: () => void): void => {
  addDescribe(name, fn).only = true;
  global.__is_there_any_only_calls__ = true;
};

export function it(name: string, fn: RunnableFunction): void {
  addIt(name, fn);
}

it.skip = (name: string, fn: RunnableFunction): void => {
  addIt(name, fn).skipped = true;
};

it.only = (name: string, fn: RunnableFunction): void =>{
  addIt(name, fn).only = true;
  global.__is_there_any_only_calls__ = true;
};

export function beforeEach(fn: RunnableFunction): void {
  last(global.__describe_stack__).beforeEach.push(fn);
}

export function afterEach(fn: RunnableFunction): void {
  last(global.__describe_stack__).afterEach.push(fn);
}
