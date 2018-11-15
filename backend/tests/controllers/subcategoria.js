const { assert } = require('chai');
const models = require('../../models');

const categoriaController = require('../../controllers/categoria');
const subcategoriaController = require('../../controllers/subcategoria');

describe('subcategoria.js', () => {
  beforeEach(async () => {
    await models.categoria.destroy({ where: {} });
    await models.subcategoria.destroy({ where: {} });
  });

  after(() => {
    models.categoria.destroy({ where: {} });
    models.subcategoria.destroy({ where: {} });
  });

  describe('findSubcategoriaById', () => {
    it('Retorna null caso não encontrar', async () => {
      // Recuperando um subcategoria inexistente
      const subcategoriaNull = await subcategoriaController.findSubcategoriaById(
        9999999999999999999999999999,
      );
      assert.isNull(subcategoriaNull);
    });

    it('Retorna um ponteiro no caso de encontrar', async () => {
      // Criando uma categoria e uma subcategoria na mão
      const categoria = await categoriaController.addCategoria('Categoria_1', false);
      const subcategoria = await models.subcategoria.create({
        nome: 'Subcategoria_11',
        categoria_id: categoria.id,
      });

      //    Recuperando a subcategoria criada
      const res = await subcategoriaController.findSubcategoriaById(subcategoria.id);
      assert.isNotNull(res);
    });
  });

  describe('addSubcategoria', () => {
    it('Retorna um ponteiro para a subcategoria criada.', async () => {
      // Criando na mão uma categoria para teste
      const categoria = await categoriaController.addCategoria('Categoria_1', false);
      assert.isNotNull(categoria);

      // Criando uma subcategoria para teste
      const subcategoria = await subcategoriaController.addSubcategoria(
        'Subcategoria_11',
        categoria.id,
      );
      assert.isNotNull(subcategoria);

      // OBS: É possível adicionar 2 subcategoria com o mesmo nome
    });
  });

  describe('updateSubcategoria', () => {
    it('Alterando um nome de uma subcategoria', async () => {
      // Criando uma categoria e uma subcategoria na mão
      const categoria = await categoriaController.addCategoria('Categoria_1', false);
      const subcategoria = await models.subcategoria.create({
        nome: 'Subcategoria_11',
        categoria_id: categoria.id,
      });

      // Alterando a subcategoria
      const res = await subcategoriaController.updateSubcategoria(subcategoria.id, 'SUBCATEGORIA');
      assert.strictEqual(res.nome, 'SUBCATEGORIA'); // Não altera...
    });
  });

  describe('deleteSubcategoria', () => {
    it('Removendo uma subcategoria', async () => {
      // Criando uma categoria e uma subcategoria na mão
      const categoria = await categoriaController.addCategoria('Categoria_1', false);
      const subcategoria = await models.subcategoria.create({
        nome: 'Subcategoria_11',
        categoria_id: categoria.id,
      });

      // Removendo a subcategoria
      await subcategoriaController.deleteSubcategoria(subcategoria.id);

      const subcategoriaNull = await subcategoriaController.findSubcategoriaById(subcategoria.id);
      assert.isNull(subcategoriaNull);
    });
  });
});
