const { assert } = require('chai');
const sinon = require('sinon');
const { amanha, proximaSexta } = require('../../controllers/utils');

describe('utils.js', () => {
  describe('amanha', () => {
    it('Retorna data amanhã', () => {
      let clock = sinon.useFakeTimers(new Date('01-01-2018'));
      assert.strictEqual(amanha().toISOString(), new Date('01-02-2018').toISOString());
      clock.restore();

      clock = sinon.useFakeTimers(new Date('01-31-2018'));
      assert.strictEqual(amanha().toISOString(), new Date('02-01-2018').toISOString());
      clock.restore();
    });

    it('Retorna data errada', () => {
      let clock = sinon.useFakeTimers(new Date('01-01-2018'));
      assert.notStrictEqual(amanha().toISOString(), new Date('01-03-2018').toISOString());
      clock.restore();

      clock = sinon.useFakeTimers(new Date('01-31-2018'));
      assert.notStrictEqual(amanha().toISOString(), new Date('02-02-2018').toISOString());
      clock.restore();
    });
  });

  describe('proximaSexta', () => {
    let clock = sinon.useFakeTimers(new Date('11-01-2018'));
    assert.equal(proximaSexta().getDay(), new Date('11-02-2018').getDay());
    clock.restore();

    clock = sinon.useFakeTimers(new Date('11-02-2018'));
    assert.equal(proximaSexta().getDay(), new Date('11-02-2018').getDay());
    clock.restore();
  });
});
