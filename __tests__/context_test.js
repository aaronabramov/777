import {describe, it, beforeEach, afterEach} from '../src';
import assert from 'assert';

describe('context tests', function() {
  beforeEach(function() {
    this.contextValue = '123';
  });

  it('shares context with before and after each', function() {
    assert.equal(this.contextValue, '123');
  });

  afterEach(function() {
    assert.equal(this.contextValue, '123');
  });
});

it('has no context outsife of the describe block', function() {
  assert.ok(!this.contextValue);
});
