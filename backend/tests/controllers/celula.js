const { assert } = require('chai');
const bcrypt = require('bcrypt');
const models = require('../../models');
const celulaController = require('../../controllers/celula');
const feiranteController = require('../../controllers/feirante');

after(() => {
  models.sequelize.close();
});

describe('Controller celula', () => {
  beforeEach(async () => {
    await models.celula.destroy({ where: {} });
    await models.feirante.destroy({ where: {} });
  });


  describe('findCelulaById', () => {
    it('Retorna null se celula não existe', async () => {
      const celula = await celulaController.findCelulaById(1);
      assert.isNull(celula);
    });

    it('Retorna celula', async () => {
      await models.celula.create({ id: 1, periodo: 1 });
      const celula = await celulaController.findCelulaById(1);
      assert.isNotNull(celula);
      assert.strictEqual(celula.periodo, 1);
    });
  });

  describe('listCelula', () => {
    it('Retorna array vazio quando não existem celulas', async () => {
      const celulas = await celulaController.listCelula();
      assert.lengthOf(celulas, 0);
    });

    it('Retorna um array de celulas', async () => {
      await models.celula.create({ id: 1, periodo: 1 });
      await models.celula.create({ id: 2, periodo: 2 });

      const celulas = await celulaController.listCelula();
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

      const celulas = await celulaController.listCelula();
      assert.lengthOf(celulas, 2);
      assert.strictEqual(celulas[0].id, 1);
      assert.strictEqual(celulas[0].cpf_feirante, '108.142.869-41');
      assert.strictEqual(celulas[0].periodo, 1);
      assert.strictEqual(celulas[1].id, 2);
      assert.isNull(celulas[1].cpf_feirante);
      assert.strictEqual(celulas[1].periodo, 2);
    });
  });

  describe('updateCelula', () => {
    it('Retorna null se célula não existe', async () => {
      const ret = await celulaController.updateCelula(1, '111.111.111-11', 1);
      assert.isNull(ret);
    });

    it('Retorna null se CPF não existe', async () => {
      await models.celula.create({ id: 1, periodo: 1 });
      const ret = await celulaController.updateCelula(1, '111.111.111-11', 1);
      assert.isNull(ret);
    });

    it('Retorna null se período é inválido', async () => {
      await models.celula.create({ id: 1, periodo: 1 });
      const categoria = await models.categoria.create({ nome: 'Categoria', need_cnpj: false });
      const sub = await categoria.createSubCategoria({ nome: 'SubCategoria' });

      await models.feirante.create({
        cpf: '111.111.111-11',
        usa_ee: false,
        nome_fantasia: 'aaa',
        razao_social: 'aaa',
        comprimento_barraca: 4,
        largura_barraca: 4,
        endereco: 'aaa',
        sub_categoria_id: sub.id,
        senha: await bcrypt.hash('4321', 10),
      });

      const ret = await celulaController.updateCelula(1, '111.111.111-11', 5);
      assert.isNull(ret);
    });

    it('Atualiza celula', async () => {
      await models.celula.create({ id: 1, periodo: 1 });
      const categoria = await models.categoria.create({ nome: 'Categoria', need_cnpj: false });
      const sub = await categoria.createSubCategoria({ nome: 'SubCategoria' });

      await models.feirante.create({
        cpf: '111.111.111-11',
        usa_ee: false,
        nome_fantasia: 'aaa',
        razao_social: 'aaa',
        comprimento_barraca: 4,
        largura_barraca: 4,
        endereco: 'aaa',
        sub_categoria_id: sub.id,
        senha: await bcrypt.hash('4321', 10),
      });

      await models.feirante.create({
        cpf: '111.111.111-22',
        usa_ee: false,
        nome_fantasia: 'aaa',
        razao_social: 'aaa',
        comprimento_barraca: 4,
        largura_barraca: 4,
        endereco: 'aaa',
        sub_categoria_id: sub.id,
        senha: await bcrypt.hash('4321', 10),
      });

      const ret = await celulaController.updateCelula(1, '111.111.111-22', 3);
      assert.isNotNull(ret);

      const celula = await celulaController.findCelulaById(1);
      assert.strictEqual(celula.id, 1);
      assert.strictEqual(celula.cpf_feirante, '111.111.111-22');
      assert.strictEqual(celula.periodo, 3);
    });
  });
});
