import {describe, it, beforeEach, afterEach} from '../src/index';
import {run} from '../src/runner';

describe('top describe', function() {
  beforeEach(function() {
    console.log('top be');
  });

  afterEach(function() {
    console.log('top ae');
  });

  it('top describe test', function() {
  });

  describe('second describe', function() {
    describe('third describe', function() {
      beforeEach(function() {
        return new Promise(resolve => {
          setTimeout(() => {
            console.log('RESOLVED third describe BE');
            resolve();
          }, 1000);
        });
      });

      afterEach(function() {
        console.log('third ae');
      });
      //
      it('thrird it', function() {

      });

      it('third it 2', function() {
        return new Promise((resolve) => {
          setTimeout(function() {
            console.log('RESOLVED third it 2');
            resolve();
          }, 1000);
        });
      });
    });

    it('secord it', function() {

    });
  });

  describe('another second describe', function() {
    it('another second it', function() {

    });
  });
});

// console.log(JSON.stringify(global.__global_describe__, null, 2));
run();
