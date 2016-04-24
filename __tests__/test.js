import {
  it,
  describe,
  getTestTree,
  getDispatcher,
  beforeEach,
  afterEach,
  before,
  after,
} from '../';
import spec from '../reporters/spec';

before(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('THE VERY FIRST BEFORE');
      resolve();
    }, 200);
  });
});

after(() => {
  console.log('THE VERY LAST AFTER');
});

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
  before(() => {
    console.log('global BEFORE hook');
  });

  after(() => {
    console.log('global AFTER hook');
  });

  afterEach(() => {
    console.log('afterEach suite in async test');
  });

  beforeEach(() => {
    console.log('beforeEachSuite in async test');
  });

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

describe('hook failures', function() {
  describe('nested suite', function() {
    beforeEach(() => {
      throw new Error('fail');
    });

    it('valid but fails because of beforeEach hook', function() {
      return Promise.resolve();
    });
  });
});

const dispatcher = getDispatcher();

dispatcher.register(spec);


getTestTree().run();
// setTimeout(() => console.log(JSON.stringify(getTestTree(), null, 2)), 0);
