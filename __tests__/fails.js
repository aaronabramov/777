import {describe, it, beforeEach, afterEach} from '../src/index';
import {run} from '../src/runner';

describe('test', function() {
  it('fails', function() {
    throw new Error('sync fail');
  });

  describe('nested', function() {
    beforeEach(() => {
      throw new Error('before each fail');
    });

    it('fails because of beforeEach', () => {});
  })
});

run().catch(err => console.log(err));
