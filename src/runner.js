// @flow

import type It from './it';
import type Describe from './describe';

import {last} from './utils';
import Dispatcher from './dispatcher';
import runRunnableFunction from './run_runnable_fn';

type Stack = Array<Describe>;

export async function run(callback: Function) {
  const visited = new Map();
  const stack: Stack = [global.__global_describe__];
  const dispatcher = new Dispatcher();
  const {dispatch} = dispatcher;
  let failed = false;

  if (callback) {
    dispatcher.register(callback);
  }

  while (stack.length) {
    const describe = last(stack);

    if (!visited.get(describe)) {
      visited.set(describe, true);
      dispatcher.dispatch('suite_start', describe);
      for (let it of describe.its) {
        try {
          await runIt(dispatch, stack, it);
        } catch (error) {
          failed = true;
        } // eslint-disable-line
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

  dispatch('end');

  return {failed};
}

async function runIt(dispatch, stack: Stack, it: It) {
  dispatch('test_start', it);

  if (it.skipped || anyOfDescribesSkipped(stack)) {
    dispatch('test_skip', it);
    dispatch('test_end', it);
    return;
  }

  try {
    const context = Object.create(null);
    for (let fn of getBeforeEachHooks(stack)) { await runRunnableFunction(fn, context); }
    await runRunnableFunction(it.fn, context);
    for (let fn of getAfterEachHooks(stack)) { await runRunnableFunction(fn, context); }
    dispatch('test_pass', it);
  } catch (error) {
    dispatch('test_fail', it, {error});
    throw error;
  } finally {
    dispatch('test_end', it);
  }
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

function anyOfDescribesSkipped(stack: Stack): boolean {
  return stack.some(describe => describe.skipped);
}
