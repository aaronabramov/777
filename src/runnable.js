import type {RunnableFunction} from './types';

/**
 * Anything that can run a function that is provided. `it`, `befareEach`,
 * `afterAll`, etc.
 */
class Runnable {
  fn: RunnableFunction;

  constructor(fn: RunnableFunction) {
    this.fn = params.fn;
  }

  async run(): Promise {

  }
}
