import {
  it,
  describe,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from '../src/index';

beforeAll(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('THE VERY FIRST beforeAll');
      resolve();
    }, 200);
  });
});

afterAll(() => {
  console.log('THE VERY LAST afterAll');
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
  beforeAll(() => {
    console.log('global beforeAll hook');
  });

  afterAll(() => {
    console.log('global afterAll hook');
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

// console.log('SNTHSNTHSNTH');
//
// console.log(JSON.stringify(global.__global_describe__, null ,2));
