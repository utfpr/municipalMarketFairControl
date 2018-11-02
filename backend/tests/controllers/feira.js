const { assert } = require('chai');

const models = require('../../models');
const feiraController = require('../../controllers/feira');
const { proximaSexta } = require('../../controllers/utils');

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
      const feira = await feiraController.addFeira(new Date('01-01-2020'));
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
      assert.strictEqual(feiraAtual.data_limite.toISOString(), proximaSexta().toISOString());
    });
  });

  describe('setDataLimiteFeiraAtual', () => {
    it('Retorna null se não existe feira na semana', async () => {
      const feira = await feiraController.addFeira(new Date('01-01-2020'));
      assert.isNotNull(feira);

      const feiraAtual = await feiraController.findFeiraAtual();
      assert.isNull(feiraAtual);
    });

    it('Não deixa setar data anterior a atual', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      const cincoMinutosAtras = new Date();
      cincoMinutosAtras.setMinutes(cincoMinutosAtras.getMinutes() - 5);

      const atualizado = await feiraController.setDataLimiteFeiraAtual(cincoMinutosAtras);
      assert.isNull(atualizado);
    });

    it('Atualiza data_limite', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      const cincoMinutosDepois = new Date();
      cincoMinutosDepois.setMinutes(cincoMinutosDepois.getMinutes() + 5);

      const atualizado = await feiraController.setDataLimiteFeiraAtual(cincoMinutosDepois);
      assert.isNotNull(atualizado);
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

    it('Não adiciona feira em data anterior a atual', async () => {
      const ontem = new Date();
      ontem.setDate(ontem.getDate() - 1);

      const feira = await feiraController.addFeira(ontem);
      assert.isNull(feira);
    });
  });

  describe('cancelaFeiraAtual', () => {
    it('Retorna null se não existe feira na semana', async () => {
      const feira = await feiraController.cancelaFeiraAtual();
      assert.isNull(feira);
    });
    it('Cancela feira da semana', async () => {
      let feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      feira = await feiraController.cancelaFeiraAtual();
      assert.isNotNull(feira);

      feira = await feiraController.findFeiraAtual();
      assert.isNull(feira);
    });

    it('Não cancela feira se ja foi cancelada', async () => {
      let feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      feira = await feiraController.cancelaFeiraAtual();
      assert.isNotNull(feira);

      feira = await feiraController.cancelaFeiraAtual();
      assert.isNull(feira);
    });
  });
});
