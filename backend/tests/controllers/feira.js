const { assert } = require('chai');

const models = require('../../models');
const feiraController = require('../../controllers/feira');

const amanha = () => {
  const tmp = new Date();
  tmp.setDate(tmp.getDate() + 1);
  return tmp;
};

describe('feira.js', () => {
  beforeEach(async () => {
    await models.participa.destroy({ where: {} });
    await models.feira.destroy({ where: {} });
    await models.feirante.destroy({ where: {} });
  });

  after(() => {
    models.celula.destroy({ where: {} });
    models.categoria.destroy({ where: {} });
    models.subcategoria.destroy({ where: {} });
    models.participa.destroy({ where: {} });
    models.feira.destroy({ where: {} });
    models.feirante.destroy({ where: {} });
  });

  describe('findFeira', () => {
    it('Retorna null se feira não existe', async () => {
      const feira = await feiraController.findFeira(amanha());
      assert.isNull(feira);
    });
    it('Retorna feira', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      const feiraTmp = await feiraController.findFeira(new Date(feira.data));
      assert.isNotNull(feiraTmp);
      assert.strictEqual(feiraTmp.data, feira.data);
    });
  });

  describe('findFeiraAtual', () => {
    it('Retorna null se não existe feira na semana', async () => {
      const feira = await feiraController.addFeira(new Date('01-01-2018'));
      assert.isNotNull(feira);

      const feiraAtual = await feiraController.findFeiraAtual();
      assert.isNull(feiraAtual);
    });
    it('Retorna feira da semana', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      const feiraAtual = await feiraController.findFeiraAtual();
      assert.isNotNull(feiraAtual);
      assert.strictEqual(feira.data, feiraAtual.data);
    });
  });

  describe('addFeira', () => {
    it('Adiciona feira', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);
      // console.log('data_limite: ', feira.data_limite);
    });

    it('Não adiciona feira repetida', async () => {
      let feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      feira = await feiraController.addFeira(amanha());
      assert.isNull(feira);
    });
  });

  describe('cancelaFeiraAtual', () => {
    it('Retorna null se não existe feira na semana', async () => {
      const feira = await feiraController.calcelaFeiraAtual();
      assert.isNull(feira);
    });
    it('Cancela feira da semana', async () => {
      let feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      feira = await feiraController.calcelaFeiraAtual();
      assert.isNotNull(feira);
    });
  });
});
