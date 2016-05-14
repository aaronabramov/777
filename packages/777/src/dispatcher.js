// @flow
import type {
  DispatcherEvent,
  DispatcherData,
  DispatcherObject,
} from '../../../types';

export default class Dispatcher {
  callbacks: Array<Function>;
  dispatch: (
    event: DispatcherEvent,
    object: ?DispatcherObject,
    data: ?DispatcherData
  ) => void;

  constructor() {
    this.callbacks = [];
    this.dispatch = this.dispatch.bind(this);
  }

  dispatch(
    event: DispatcherEvent,
    object: ?DispatcherObject,
    data: ?DispatcherData
  ) {
    this.callbacks.forEach(cb => cb(event, object, data));
  }

  register(fn: Function) {
    this.callbacks.push(fn);
  }
}
