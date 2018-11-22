const { assert } = require('chai');
const faker = require('faker');
const models = require('../../models');
const categoriaController = require('../../controllers/categoria');
const celulaController = require('../../controllers/celula');
const feiranteController = require('../../controllers/feirante');

describe('celula.js', () => {
  let subcategoria;

  before(async () => {
    const categoria = await categoriaController.addCategoria('Alimento', false);
    subcategoria = await categoria.createSubCategoria({ nome: 'Salgado' });
  });

  beforeEach(async () => {
    await models.celula.destroy({ where: {} });
    await models.feirante.destroy({ where: {} });
  });

  after(() => {
    models.categoria.destroy({ where: {} });
    models.subcategoria.destroy({ where: {} });
    models.celula.destroy({ where: {} });
    models.feirante.destroy({ where: {} });
  });

  describe('findCelulaById', () => {
    it('Retorna null se celula não existe', async () => {
      const celula = await celulaController.findCelulaById(1);
      assert.isNull(celula);
    });

    it('Retorna celula', async () => {
      await models.celula.create({
        id: 1,
        periodo: 1,
        x: 0,
        y: 0,
        comprimento: 0,
        largura: 0,
      });
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
      await models.celula.create({
        id: 1, periodo: 1, x: 0, y: 0, comprimento: 0, largura: 0,
      });
      await models.celula.create({
        id: 2, periodo: 2, x: 0, y: 0, comprimento: 0, largura: 0,
      });

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
      const feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
        true,
        faker.name.firstName(),
        faker.name.firstName(),
        4,
        4,
        {
          logradouro: faker.address.streetAddress(),
          bairro: faker.address.secondaryAddress(),
          numero: 100,
          CEP: '87.303-065',
        },
        110,
        subcategoria.id,
      );

      await models.celula.create({
        id: 1,
        periodo: 1,
        cpf_feirante: feirante.cpf,
        x: 0,
        y: 0,
        comprimento: 0,
        largura: 0,
      });
      await models.celula.create({
        id: 2, periodo: 2, x: 0, y: 0, comprimento: 0, largura: 0,
      });

      const celulas = await celulaController.listCelula();
      assert.lengthOf(celulas, 2);
      assert.strictEqual(celulas[0].id, 1);
      assert.strictEqual(celulas[0].cpf_feirante, feirante.cpf);
      assert.strictEqual(celulas[0].periodo, 1);
      assert.strictEqual(celulas[1].id, 2);
      assert.isNull(celulas[1].cpf_feirante);
      assert.strictEqual(celulas[1].periodo, 2);
    });
  });

  describe('updateCelula', () => {
    it('Retorna null se célula não existe', async () => {
      const ret = await celulaController.updateCelula(1, {
        cpf_feirante: '58295846035',
        periodo: 1,
      });
      assert.isNull(ret);
    });

    it('Retorna null se CPF não existe', async () => {
      await models.celula.create({
        id: 1, periodo: 1, x: 0, y: 0, comprimento: 0, largura: 0,
      });
      const ret = await celulaController.updateCelula(1, {
        cpf_feirante: '58295846035',
        periodo: 1,
      });
      assert.isNull(ret);
    });

    it('Retorna null se período é inválido', async () => {
      await models.celula.create({
        id: 1, periodo: 1, x: 0, y: 0, comprimento: 0, largura: 0,
      });
      const feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
        true,
        faker.name.firstName(),
        faker.name.firstName(),
        4,
        4,
        {
          logradouro: faker.address.streetAddress(),
          bairro: faker.address.secondaryAddress(),
          numero: 100,
          CEP: '87.303-065',
        },
        110,
        subcategoria.id,
      );
      const ret = await celulaController.updateCelula(1, {
        cpfFeirante: feirante.cpf,
        periodo: 5,
      });
      assert.isNull(ret);
    });

    it('Atualiza celula', async () => {
      await models.celula.create({
        id: 1, periodo: 1, x: 0, y: 0, comprimento: 0, largura: 0,
      });
      const feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
        true,
        faker.name.firstName(),
        faker.name.firstName(),
        4,
        4,
        {
          logradouro: faker.address.streetAddress(),
          bairro: faker.address.secondaryAddress(),
          numero: 100,
          CEP: '87.303-065',
        },
        110,
        subcategoria.id,
      );

      const feirante2 = await feiranteController.addFeirante(
        '35821809053',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
        true,
        faker.name.firstName(),
        faker.name.firstName(),
        4,
        4,
        {
          logradouro: faker.address.streetAddress(),
          bairro: faker.address.secondaryAddress(),
          numero: 100,
          CEP: '87.303-065',
        },
        110,
        subcategoria.id,
      );

      let ret = await celulaController.updateCelula(1, {
        cpf_feirante: feirante.cpf,
        periodo: 2,
      });
      assert.isNotNull(ret);

      ret = await celulaController.updateCelula(1, {
        cpf_feirante: feirante2.cpf,
      });
      assert.isNotNull(ret);
      assert.strictEqual(ret.cpf_feirante, feirante2.cpf);
      assert.strictEqual(ret.periodo, 2);
    });
  });

  describe('findCelulaByFeirante', () => {
    it('Retorna null se feirante não existe', async () => {
      const celula = await celulaController.findCelulaByFeirante('35821809053');
      assert.isNull(celula);
    });

    it('Retorna null se feirante não tiver celula fixa', async () => {
      const feirante = await feiranteController.addFeirante(
        '35821809053',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
        true,
        faker.name.firstName(),
        faker.name.firstName(),
        4,
        4,
        {
          logradouro: faker.address.streetAddress(),
          bairro: faker.address.secondaryAddress(),
          numero: 100,
          CEP: '87.303-065',
        },
        110,
        subcategoria.id,
      );

      await models.celula.create({
        id: 1, periodo: 1, x: 0, y: 0, comprimento: 0, largura: 0,
      });
      const celula = await celulaController.findCelulaByFeirante(feirante.cpf);
      assert.isNull(celula);
    });

    it('Retorna celula fixa do feirante', async () => {
      const feirante = await feiranteController.addFeirante(
        '35821809053',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
        true,
        faker.name.firstName(),
        faker.name.firstName(),
        4,
        4,
        {
          logradouro: faker.address.streetAddress(),
          bairro: faker.address.secondaryAddress(),
          numero: 100,
          CEP: '87.303-065',
        },
        110,
        subcategoria.id,
      );

      await models.celula.create({
        id: 1,
        periodo: 1,
        cpf_feirante: feirante.cpf,
        x: 0,
        y: 0,
        comprimento: 0,
        largura: 0,
      });
      const celula = await celulaController.findCelulaByFeirante(feirante.cpf);
      assert.isNotNull(celula);
      assert.strictEqual(celula.cpf_feirante, feirante.cpf);
    });
  });
});
