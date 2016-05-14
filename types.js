// @flow

export type DoneFunction = (error: ?Error) => void;
export type RunnableFunction = (done: ?DoneFunction) => ?Promise;

export type DispatcherEvent = 'test_start' | 'test_end' | 'test_pass' |
  'test_fail' | 'test_skip' | 'suite_start' | 'suite_end' | 'start' | 'end';

export type DispatcherObject = Describe | It;
export type DispatcherData = {
  error: ?Error,
};

export type It = {
  fn: RunnableFunction;
  name: string;
  skipped: boolean;
  only: boolean;
}

export type Describe = {
  name: string;
  children: Array<Describe>;
  its: Array<It>;
  beforeEach: Array<RunnableFunction>;
  afterEach: Array<RunnableFunction>;
  beforeAll: Array<RunnableFunction>;
  afterAll: Array<RunnableFunction>;
  skipped: boolean;
  only: boolean;
}
