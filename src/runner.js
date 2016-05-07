// @flow

import type It from './it';
import type Describe from './describe';
import type {RunnableFunction} from './types';
import spec from '../reporters/spec';

import {last} from './utils';
import Dispatcher from './dispatcher';

type Stack = Array<Describe>;

export async function run() {
  const visited = new Map();
  const stack: Stack = [global.__global_describe__];
  const dispatcher = new Dispatcher();
  const {dispatch} = dispatcher;

  dispatcher.register(spec);

  while (stack.length) {
    const describe = last(stack);

    if (!visited.get(describe)) {
      visited.set(describe, true);
      dispatcher.dispatch('suite_start', describe);
      for (let it of describe.its) {
        try {
          await runIt(dispatch, stack, it);
        } catch (error) {
          console.error('TEST FAIL', error);
        }
      }
      // await runPromisesInSequence(describe.its.map((it) => runIt(dispatch, stack, it)));
    } else {
      const unvisited = describe.children.find(d => !visited.get(d));
      if (unvisited) {
        stack.push(unvisited);
      } else {
        stack.pop();
        dispatch('suite_end', describe);
      }
    }
  }
}

async function runIt(dispatch, stack: Stack, it: It) {
  dispatch('test_start', it);
  try {
    for (let fn of getBeforeEachHooks(stack)) { await runRunnableFunction(fn); }
    await runRunnableFunction(it.fn);
    for (let fn of getAfterEachHooks(stack)) { await runRunnableFunction(fn); }
    dispatch('test_pass', it);
  } catch (error) {
    dispatch('test_fail', it, {error});
  }
  dispatch('test_end', it);
}

function getBeforeEachHooks(stack: Stack) {
  return stack.reduce((hooks, describe) => {
    return hooks.concat(describe.beforeEach);
  }, []);
}

function getAfterEachHooks(stack: Stack) {
  return stack.reduceRight((hooks, describe) => {
    return hooks.concat(describe.afterEach);
  }, []);
}

function runRunnableFunction(fn: RunnableFunction): Promise {
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
