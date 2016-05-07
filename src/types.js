// @flow

import type Describe from './describe';
import type It from './it';

export type DoneFunction = (error: ?Error) => void;
export type RunnableFunction = (done: ?DoneFunction) => ?Promise;

export type DispatcherEvent = 'test_start' | 'test_end' | 'test_pass' |
  'test_fail' | 'test_skip' | 'suite_start' | 'suite_end' | 'end';

export type DispatcherObject = Describe | It;
export type DispatcherData = {
  error: ?Error,
};
