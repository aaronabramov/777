import {it} from '../src';
import runInline from './run_inline';
import assert from 'assert';

it('runs a simple test', function() {
  const result = runInline(`
    describe('simple test', function() {
      it('passes', function() {});
    });`
  );

  assert.ok(result.stdout.match(/simple test/));
  assert.ok(result.stdout.match(/passes/));
  assert.ok(result.status === 0);
});

it('fails a test', function() {
  const result = runInline(`
    it('fails', () => {
      throw new Error('test');
    });
  `);

  assert.ok(result.stdout.match(/fails/));
  assert.ok(result.status === 1);
});
