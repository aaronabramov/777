// @flow

import type {It, Describe} from '../../../types';

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
      if (describe === global.__global_describe__) {
        dispatcher.dispatch('start', describe);
      } else {
        dispatcher.dispatch('suite_start', describe);
      }
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
        if (describe === global.__global_describe__) {
          dispatch('end', describe);
        } else {
          dispatch('suite_end', describe);
        }
      }
    }
  }

  return {failed};
}

async function runIt(dispatch, stack: Stack, it: It) {
  dispatch('test_start', it);

  if (isTestSkipped(it, stack)) {
    dispatch('test_skip', it);
    dispatch('test_end', it);
    return;
  }

  const context = Object.create(null);

  let failedInBeforeEach: ?Error;
  let failedInIt: ?Error;
  let firstFailedInAfterEach: ?Error;

  // run every beforeEach, but stop as soon as at least one fails
  try {
    for (let fn of getBeforeEachHooks(stack)) { await runRunnableFunction(fn, context); }
  } catch (error) {
    failedInBeforeEach = error;
  }

   // if setup is successful, we run the test
  if (!failedInBeforeEach) {
    try {
      await runRunnableFunction(it.fn, context);
    } catch (error) {
      failedInIt = error;
    }
  }

  for (let fn of getAfterEachHooks(stack)) {
    // we still need to run *every* afterEach even it the test failed
    try {
      await runRunnableFunction(fn, context);
    } catch (error) {
      firstFailedInAfterEach || (firstFailedInAfterEach = error);
    }
  }

  let finalError: ?Error;

  if (failedInBeforeEach) {
    finalError = failedInBeforeEach;
  }

  if (failedInIt) {
    finalError = failedInIt;
  }

  if (firstFailedInAfterEach) {
    finalError = firstFailedInAfterEach;
  }

  if (finalError) {
    dispatch('test_fail', it, {error: finalError});
  } else {
    dispatch('test_pass', it);
  }
  dispatch('test_end', it);

  if (finalError) {
    throw finalError;
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

// true if this test or any of the parent describe blocks are skipped OR
// if there is anything with `only === true` in the tree and it's not this
// test or any of its parent describes.
function isTestSkipped(it: It, stack: Stack): boolean {
  return it.skipped || stack.some(describe => describe.skipped) ||
    (global.__is_there_any_only_calls__ && !it.only &&
       !stack.some(describe => describe.only));
}
