import {it, describe, getTestTree, getDispatcher} from '../';
import spec from '../reporters/spec';

describe('abc', function() {
  describe('first suite', function() {
    it('test', function() {

    });

    it('test2', function() {

    });
  });

  describe('second suite', function() {
    it('fails', function() {
      throw new Error('stnhsnth');
    });
  });
});

describe('async tests', function() {
  it('works with callbacks', function(done) {
    setTimeout(() => {
      done();
    }, 200);
  });

  it('reports errors into done', function(done) {
    setTimeout(() => {
      done(new Error('async error'));
    }, 200);
  });

  it('works with promises', function() {
    return Promise.resolve();
  });

  it('fails with promises', function() {
    return Promise.reject(new Error('rejected promise'));
  });
});

const dispatcher = getDispatcher();

dispatcher.register(spec);


getTestTree().run();
// setTimeout(() => console.log(JSON.stringify(getTestTree(), null, 2)), 0);
