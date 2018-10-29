const { assert } = require('chai');
const utils = require('../../routes/utils');

describe('utils.js', () => {
  describe('isCpf', () => {
    it('CPF válido', () => {
      assert.isTrue(utils.isCpf('11161955003'));
      assert.isTrue(utils.isCpf('41889740012'));
      assert.isTrue(utils.isCpf('111.619.550-03'));
    });

    it('CPF inválido', () => {
      assert.isFalse(utils.isCpf(''));
      assert.isFalse(utils.isCpf('11161955004'));
      assert.isFalse(utils.isCpf('111.619.550-04'));
    });
  });

  describe('isCnpj', () => {
    it('CNPJ válido', () => {
      assert.isTrue(utils.isCnpj('34734698000190'));
      assert.isTrue(utils.isCnpj('14538070000102'));
      assert.isTrue(utils.isCnpj('73.356.873/0001-05'));
    });

    it('CNPJ inválido', () => {
      assert.isFalse(utils.isCnpj('34734668000191'));
      assert.isFalse(utils.isCnpj('73.356.173/0001-07'));
    });
  });
});
