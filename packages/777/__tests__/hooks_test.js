import {describe, it} from '../src';
import runInline from './run_inline';
import assert from 'assert';

describe('afterEach', () => {
  it('runs after each hooks even after a test fails', () => {
    const result = runInline(`
      it('fails', () => { throw new Error('fails')});

      afterEach(() => console.log('__afterEach__'));
    `);

    assert.ok(result.stdout.match('✘ fails'));
    assert.ok(result.stdout.match('__afterEach__'));
  });

  it('ruts all after hooks, even if some failed', () => {
    const result = runInline(`
      it('fails', () => {}); // fails because of the hooks

      afterEach(() => console.log('__afterEach__1'));
      afterEach(() => { throw new Error('afterEachErr')});
      afterEach(() => console.log('__afterEach__2'));
    `);

    assert.ok(result.stdout.match('✘ fails'));
    assert.ok(result.stdout.match('__afterEach__1'));
    assert.ok(result.stdout.match('__afterEach__2'));
  });
});

describe('beforeEach', () => {
  it('doesnt run a test if beforeEach failed', () => {
    const result = runInline(`
      beforeEach(() => { throw new Error('beforeEachErr')});
      it('fails', () => {}); // fails because of the hooks
    `);

    assert.ok(result.stdout.match('✘ fails'));
    assert.ok(result.stdout.match('beforeEachErr'));
  });

  it('desnt run the rest of beforeEach, if one failed', () => {
    const result = runInline(`
      beforeEach(() => { throw new Error('beforeEachErr')});
      beforeEach(() => console.log('SHOULDNTBETHERE'));
      it('fails', () => {}); // fails because of the hooks
    `);

    assert.ok(result.stdout.match('✘ fails'));
    assert.ok(result.stdout.match('beforeEachErr'));
    assert.ok(!result.stdout.match('SHOULDNTBETHERE'));
  });

  it('doesn run the test if beforeEach failed', () => {
    const result = runInline(`
      beforeEach(() => { throw new Error('beforeEachErr')});
      it('fails', () => console.log('SHOULDNTBETHERE'));
    `);

    assert.ok(result.stdout.match('✘ fails'));
    assert.ok(!result.stdout.match('SHOULDNTBETHERE'));
  });
});

describe('beforeEach && afterEach', () => {
  it('fails beforeEach and runs afterEach', () => {
    const result = runInline(`
      beforeEach(() => { throw new Error('beforeEachErr')});
      beforeEach(() => console.log('NO_1'));
      it('fails', () => console.log('NO_2')); // fails because of the hooks
      afterEach(() => console.log('YES_1'));
      afterEach(() => console.log('YES_2'));
    `);

    assert.ok(result.stdout.match('✘ fails'));
    assert.ok(result.stdout.match('YES_1'));
    assert.ok(result.stdout.match('YES_2'));
    assert.ok(!result.stdout.match('NO_1'));
    assert.ok(!result.stdout.match('NO_2'));
  });

  it('passes beforeEach and runs afterEach', () => {
    const result = runInline(`
      beforeEach(() => console.log('YES_1'));
      beforeEach(() => console.log('YES_2'));
      it('fails', () => console.log('YES_3')); // fails because of the hooks
      afterEach(() => { throw new Error('afterEachErr')});
      afterEach(() => console.log('YES_4'));
    `);

    assert.ok(result.stdout.match('✘ fails'));
    assert.ok(result.stdout.match('YES_1'));
    assert.ok(result.stdout.match('YES_2'));
    assert.ok(result.stdout.match('YES_3'));
    assert.ok(result.stdout.match('YES_4'));
  });
});
