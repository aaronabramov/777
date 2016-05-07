import type Describe from './describe';
import type It from './it';

export type DoneFunction = (error: ?Error) => void;
export type RunnableFunction = (done: ?DoneFunction) => ?Promise;

export type DispatcherEvent = 'test_start' | 'test_end' | 'test_pass' | 'test_fail'
| 'suite_start' | 'suite_end' | 'hook_start' | 'hook_end' | 'hook_pass'
| 'hook_fail';

export type DispatcherData = Describe | It;
