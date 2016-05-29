import {it, specify, describe, beforeEach} from '../../777/src';
import {expect} from '../../777-matchers/src';
import {spyOn, createSpy} from '../src';

describe('spy', () => {
  describe('calls', () => {
    beforeEach(function() {
      this.obj = {a: () => { throw new Error('shouldnt be thrown'); }};
      this.spy = spyOn(this.obj, 'a');
    });

    specify('any()', function() {
      expect(this.obj.a.calls.any()).toBe(false);
      this.obj.a();
      expect(this.obj.a.calls.any()).toBe(true);
    });

    specify('count()', function() {
      expect(this.obj.a.calls.count()).toBe(0);
      this.obj.a();
      expect(this.obj.a.calls.count()).toBe(1);
      this.obj.a();
      expect(this.obj.a.calls.count()).toBe(2);
    });

    specify('argsFor()', function() {
      expect(() => { this.obj.a.calls.argsFor(0); }).toThrow('calls');
      this.obj.a(1);
      this.obj.a(1, 2, 3);
      expect(this.obj.a.calls.argsFor(0)).toDeepEqual([1]);
      expect(this.obj.a.calls.argsFor(1)).toDeepEqual([1, 2, 3]);
    });

    specify('allArgs()', function() {
      this.obj.a(1);
      this.obj.a(1, 2);
      expect(this.obj.a.calls.allArgs()).toDeepEqual([[1], [1, 2]]);
    });

    specify('all()', function() {
      this.obj.a(1);
      expect(this.obj.a.calls.all()).toDeepEqual([
        {object: this.obj, args: [1], returnValue: undefined},
      ]);
    });

    specify('mostRecent()', function() {
      this.obj.a(1);
      this.obj.a(1, 2);
      expect(this.obj.a.calls.mostRecent().args).toDeepEqual([1, 2]);
    });

    specify('first()', function() {
      this.obj.a(1);
      this.obj.a(1, 2);
      expect(this.obj.a.calls.first().args).toDeepEqual([1]);
    });
  });

  describe('createSpy()', function() {
    it('creates a spy function', () => {
      const spy = createSpy();

      spy(1);
      spy(1, 2);

      expect(spy.calls.count()).toBe(2);
      expect(spy.calls.allArgs()).toDeepEqual([[1], [1, 2]]);
    });
  });

  describe('and.returnValue()', () => {
    it('returns and logs the value', () => {
      const spy = createSpy().and.returnValue(111);

      expect(spy()).toBe(111);
      expect(spy.calls.mostRecent().returnValue).toBe(111);
    });
  });

  describe('and.callThrough()', () => {
    it('calls the original implementation', () => {
      const obj = {a: () => 555};
      spyOn(obj, 'a').and.callThrough();
      expect(obj.a()).toBe(555);
      expect(obj.a.calls.count()).toBe(1);
      expect(obj.a.calls.mostRecent().object).toBe(obj);
    });
  });

  describe('and.callFake()', () => {
    it('calls a fake implemetation', () => {
      const obj= {a: () => 555};
      spyOn(obj, 'a').and.callFake(() => 111);
      expect(obj.a()).toBe(111);
      expect(obj.a.calls.count()).toBe(1);
      expect(obj.a.calls.mostRecent().returnValue).toBe(111);
    });
  });
});
