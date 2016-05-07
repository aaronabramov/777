// @flow

import type {RunnableFunction} from './types';

export default class It {
  fn: RunnableFunction;
  name: string;
  skipped: boolean;
  only: boolean;

  constructor(name: string, fn: RunnableFunction) {
    this.name = name;
    this.fn = fn;
    this.skipped = false;
    this.only = false;
  }
}
