import {describe, it, beforeEach, afterEach} from '../src/index';
import {run} from '../src/runner';

describe('top', function() {
  beforeEach(function() {
    console.log('top be start');
    return to().then(() => {
      console.log('top be resolve');
    });
  });

  afterEach(function() {
    console.log('top ae start');
    return to().then(() => {
      console.log('top ae resolve');
    });

  });

  it('top1', function() {
    console.log('top1 it start');
    return to().then(() => {
      console.log('top1 be resolve');
    });
  });

  it('top2', function() {
    console.log('top2 it start');
    return to().then(() => {
      console.log('top2 be resolve');
    });
  });

})

function to() {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 200);
  });
}

run().catch(err => {
  console.error(err);
});
