import {it, describe} from '../../777/src';
import assert from 'assert';
import {expect} from '../src';

describe.only('matchers', () => {
  describe('toBe', () => {
    it('passes', () => {
      expect(1).toBe(1);
    });

    it('fails', () => {
      try {
        expect(1).toBe(2);
        throw new Error('should not be thrown');
      } catch (err) {
        assert.ok(err.message.match(/to ===/));
      }
    });

    it('fails on equal objects', () => {
      try {
        expect({a: 1}).toBe({a: 1});
        throw new Error('should not be thrown');
      } catch (err) {
        assert.ok(err.message.match(/to ===/));
      }
    });

    it('passes isNot', () => {
      expect(1).not.toBe(2);
    });

    it('fails isNot', () => {
      try {
        expect(1).not.toBe(1);
        throw new Error('should not be thrown');
      } catch (err) {
        assert.ok(err.message.match('to !=='));
      }
    });
  });

  describe('toBeDefined', () => {
    it('passes', () => {
      expect(1).toBeDefined();
    });

    it('fails', () => {
      try {
        expect(undefined).toBeDefined();
        throw new Error('should not be thrown');
      } catch (err) {
        assert.ok(err.message.match('to be defined'));
      }
    });

    it('passes isNot', () => {
      expect(undefined).not.toBeDefined();
    });

    it('fails isNot', () => {
      try {
        expect(1).not.toBeDefined();
        throw new Error('should not be thrown');
      } catch (err) {
        assert.ok(err.message.match('not to be defined'));
      }
    });
  });

  describe('toBeFalsy', () => {
    it('passes', () => {
      expect(0).toBeFalsy();
      expect(false).toBeFalsy();
      expect(null).toBeFalsy();
      expect(undefined).toBeFalsy();
    });

    it('passes isNot', () => {
      expect(true).not.toBeFalsy();
      expect(1).not.toBeFalsy();
      expect(Infinity).not.toBeFalsy();
      expect({}).not.toBeFalsy();
      expect([]).not.toBeFalsy();
    });

    it('fails', () => {
      try {
        expect(true).toBeFalsy();
        throw new Error('should not be thrown');
      } catch (err) {
        assert.ok(err.message.match('to be falsy'));
      }
    });

    [null, 0, false, undefined, NaN].forEach(value => {
      it(`fails isNot for ${value}`, () => {
        try {
          expect(value).not.toBeFalsy();
          throw new Error('should not be thrown');
        } catch (err) {
          assert.ok(err.message.match('not to be falsy'));
        }
      });
    });
  });
});
