import type {DispatcherEvent, DispatcherData} from './types';

export default class Dispatcher {
  callbacks: Array<Function>;

  constructor() {
    this.callbacks = [];
    this.dispatch = this.dispatch.bind(this);
  }

  dispatch(event: DispatcherEvent, data: ?DispatcherData) {
    this.callbacks.forEach(cb => cb(event, data));
  }

  register(fn: Function) {
    this.callbacks.push(fn);
  }
}
