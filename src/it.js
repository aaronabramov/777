import type {RunnableFunction} from './types';

export default class It {
  fn: RunnableFunction;
  name: string;

  constructor(name: string, fn: RunnableFunction) {
    this.name = name;
    this.fn = fn;
  }
}
