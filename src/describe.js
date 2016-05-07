// @flow

import type It from './it';
import type {RunnableFunction} from './types';

export default class Describe {
  name: string;
  children: Array<Describe>;
  its: Array<It>;
  beforeEach: Array<RunnableFunction>;
  afterEach: Array<RunnableFunction>;
  beforeAll: Array<RunnableFunction>;
  afterAll: Array<RunnableFunction>;
  skipped: boolean;

  constructor(name: string) {
    this.name = name;
    this.its = [];
    this.children = [];
    this.beforeEach = [];
    this.beforeAll = [];
    this.afterEach = [];
    this.afterAll = [];
    this.skipped = false;
  }
}
