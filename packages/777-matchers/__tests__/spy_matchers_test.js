import {it, describe, beforeEach} from '../../777/src';
import {expect} from '../src';
import {createSpy} from '../../777-spy/src';

describe('spy matchers', () => {
  beforeEach(function() {
    this.spy = createSpy();
  });

  describe('toHaveBeenCalled()', () => {
    it('passes', function() {
      expect(this.spy).not.toHaveBeenCalled();
      this.spy();
      expect(this.spy).toHaveBeenCalled();
    });

    it('fails', function() {
      expect(() => expect(this.spy).toHaveBeenCalled()).toThrow(`wasn't`);
      this.spy();
      expect(() => expect(this.spy).not.toHaveBeenCalled()).toThrow('1 time');
    });
  });

  describe('toHaveBeenCalledTimes()', () => {
    it('passes', function() {
      expect(this.spy).toHaveBeenCalledTimes(0);
      expect(this.spy).not.toHaveBeenCalledTimes(1);
      this.spy();
      expect(this.spy).toHaveBeenCalledTimes(1);
      expect(this.spy).not.toHaveBeenCalledTimes(0);
      this.spy();
      expect(this.spy).toHaveBeenCalledTimes(2);
    });

    it('fails', function() {
      expect(() => expect(this.spy).toHaveBeenCalledTimes(1)).toThrow('but it was');
      expect(() => expect(this.spy).not.toHaveBeenCalledTimes(0)).toThrow('but it was');
      this.spy();
      expect(() => expect(this.spy).toHaveBeenCalledTimes(0)).toThrow('but it was');
      expect(() => expect(this.spy).not.toHaveBeenCalledTimes(1)).toThrow('but it was');
    });
  });
});
