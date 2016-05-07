import {describe, it} from '../src';
import assert from 'assert';
import runInline from './run_inline';

describe('skip/only', function() {
  it('skips a test', function() {
    const {stdout, status} = runInline(`
      it.skip('skipped', () => { throw new Error('shouldnt be thrown')});
      it('not skipped', () => {});
      `);

    assert.ok(stdout.match('• skipped'));
    assert.ok(stdout.match('✔ not skipped'));
    assert.equal(status, 0);
  });

  it('skips a block', function() {
    const {stdout, status} = runInline(`
      describe.skip('skipped describe', function() {
        it('skipped', () => { throw new Error('shoulnt be skipped')});
      });

      it('is not skipped', () => {});
      `);

    assert.ok(stdout.match(/skipped describe/));
    assert.ok(stdout.match('• skipped'));
    assert.ok(stdout.match('✔ is not skipped'));
    assert.equal(status, 0);
  });
});
