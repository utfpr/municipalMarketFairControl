const { assert } = require('chai');
const models = require('../../models');
const celulaController = require('../../controllers/celula');
const feiranteController = require('../../controllers/feirante');

after(() => {
  models.sequelize.close();
});

describe('Controller celula', () => {
  beforeEach(async () => {
    await models.celula.destroy({ where: {} });
  });
  describe('listCelulas', () => {
    it('Retorna array vazio quando não existem celulas', async () => {
      const celulas = await celulaController.listCelulas();
      assert.lengthOf(celulas, 0);
    });

    it('Retorna um array de celulas', async () => {
      await models.celula.create({ id: 1, periodo: 1 });
      await models.celula.create({ id: 2, periodo: 2 });

      const celulas = await celulaController.listCelulas();
      assert.lengthOf(celulas, 2);
      assert.strictEqual(celulas[0].id, 1);
      assert.isNull(celulas[0].cpf_feirante);
      assert.strictEqual(celulas[0].periodo, 1);
      assert.strictEqual(celulas[1].id, 2);
      assert.isNull(celulas[1].cpf_feirante);
      assert.strictEqual(celulas[1].periodo, 2);
    });

    it('Retorna um array de celulas (feirante fixo)', async () => {
      const categoria = await models.categoria.create({
        nome: 'Categoria',
        need_cnpj: false,
      });
      const sub = await categoria.createSubCategoria({
        nome: 'SubCategoria',
      });
      await feiranteController.addFeirante(
        '108.142.869-41',
        '111111111',
        1,
        'daniel orivaldo da silva',
        'daniel orivaldo da silva',
        2,
        2,
        'fjisadjfsdfjisdf',
        220,
        sub.id,
        '1234',
      );

      await models.celula.create({ id: 1, periodo: 1, cpf_feirante: '108.142.869-41' });
      await models.celula.create({ id: 2, periodo: 2 });

      const celulas = await celulaController.listCelulas();
      assert.lengthOf(celulas, 2);
      assert.strictEqual(celulas[0].id, 1);
      assert.strictEqual(celulas[0].cpf_feirante, '108.142.869-41');
      assert.strictEqual(celulas[0].periodo, 1);
      assert.strictEqual(celulas[1].id, 2);
      assert.isNull(celulas[1].cpf_feirante);
      assert.strictEqual(celulas[1].periodo, 2);
    });
  });

  describe('getFeirante', () => {
    it('Retorna null se célula não existe', async () => {
      const ret = await celulaController.getFeirante(999);
      assert.isNull(ret);
    });

    it('Retorna null se célula não tem feirante fixo', async () => {
      await models.celula.create({ id: 1, periodo: 1 });
      const ret = await celulaController.getFeirante(1);
      assert.isNull(ret);
    });

    it('Retorna cpf feirante', async () => {
      const categoria = await models.categoria.create({
        nome: 'Categoria',
        need_cnpj: false,
      });
      const sub = await categoria.createSubCategoria({
        nome: 'SubCategoria',
      });
      await feiranteController.addFeirante(
        '108.142.869-41',
        '111111111',
        1,
        'daniel orivaldo da silva',
        'daniel orivaldo da silva',
        2,
        2,
        'fjisadjfsdfjisdf',
        220,
        sub.id,
        '1234',
      );
      await models.celula.create({ id: 1, periodo: 1, cpf_feirante: '108.142.869-41' });
      const ret = await celulaController.getFeirante(1);
      assert.strictEqual(ret, '108.142.869-41');
    });
  });

  describe('setFeirante', () => {
    it('Retorna null se célula não existe', async () => {
      const ret = await celulaController.setFeirante(1, '111.111.111-11');
      assert.isNull(ret);
    });

    it('Retorna null se feirante não existe', async () => {
      await models.celula.create({ id: 1, periodo: 1 });
      const ret = await celulaController.setFeirante(1, '111.111.111-12');
      assert.isNull(ret);
    });

    it('Define um feirante fixo', async () => {
      const categoria = await models.categoria.create({
        nome: 'Categoria',
        need_cnpj: false,
      });
      const sub = await categoria.createSubCategoria({
        nome: 'SubCategoria',
      });
      await feiranteController.addFeirante(
        '111.111.111-11',
        '111111111',
        1,
        'daniel orivaldo da silva',
        'daniel orivaldo da silva',
        2,
        2,
        'fjisadjfsdfjisdf',
        220,
        sub.id,
        '1234',
      );
      await models.celula.create({ id: 1, periodo: 1, cpf_feirante: '111.111.111-11' });
      const ret = await celulaController.setFeirante(1, '111.111.111-11');
      assert.isNotNull(ret);

      const cpfFeirante = await celulaController.getFeirante(1);
      assert.strictEqual(cpfFeirante, '111.111.111-11');
    });
  });
});
