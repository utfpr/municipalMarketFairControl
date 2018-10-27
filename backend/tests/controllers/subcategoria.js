const { assert } = require('chai');
const models = require('../../models');
const subcategoriaController = require('../../controllers/subcategoria');

describe('Controller subcategoria', () => {
  beforeEach(async () => {
    await models.categoria.destroy({ where: {} });
    await models.subcategoria.destroy({ where: {} });
  });

  describe('findSubcategoriaById', () => {
    it('Retorna null caso não encontrar', async () => {
      // Recuperando um subcategoria inexistente
      const subcategoria_null = await subcategoriaController.findSubcategoriaById(9999999999999999999999999999);
      assert.isNull(subcategoria_null);
    });

    it('Retorna um ponteiro no caso de encontrar', async () => {
      // Criando uma categoria e uma subcategoria na mão
      const categoria = await models.categoria.create({ nome: 'Categoria_1', need_cnpj: false });
      const subcategoria = await models.subcategoria.create({ nome: 'Subcategoria_11', categoria_id: categoria.id });

      // Recuperando a subcategoria criada
      const subcategoria_not_null = await subcategoriaController.findSubcategoriaById(subcategoria.id);
      assert.isNotNull(subcategoria_not_null);
    });
  });

  describe('addSubcategoria', () => {
    it('Retorna um ponteiro para a subcategoria criada.', async () => {
      // Criando na mão uma categoria para teste
      const categoria = await models.categoria.create({ nome: 'Categoria_1', need_cnpj: false });
      assert.isNotNull(categoria);

      // Criando uma subcategoria para teste
      const subcategoria = await subcategoriaController.addSubcategoria("Subcategoria_11", categoria.id);
      assert.isNotNull(subcategoria);

      // OBS: É possível adicionar 2 subcategoria com o mesmo nome
    });
  });

  describe('updateSubcategoria', () => {
    it('Alterando um nome de uma subcategoria', async () => {
      // Criando uma categoria e uma subcategoria na mão
      const categoria = await models.categoria.create({ nome: 'Categoria_1', need_cnpj: false });
      var subcategoria = await models.subcategoria.create({ nome: 'Subcategoria_11', categoria_id: categoria.id });

      // Alterando a subcategoria
      await subcategoriaController.updateSubcategoria(subcategoria.id, "SUBCATEGORIA");
      assert.equal(subcategoria.nome, "SUBCATEGORIA"); // Não altera...
    });
  });


  describe('deleteSubcategoria', () => {
    it('Removendo uma subcategoria', async () => {
      // Criando uma categoria e uma subcategoria na mão
      const categoria = await models.categoria.create({ nome: 'Categoria_1', need_cnpj: false });
      const subcategoria = await models.subcategoria.create({ nome: 'Subcategoria_11', categoria_id: categoria.id });

      // Removendo a subcategoria
      await subcategoriaController.deleteSubcategoria(subcategoria.id);

      const subcategoria_null = await subcategoriaController.findSubcategoriaById(subcategoria.id);
      assert.isNull(subcategoria_null);
    });
  });
});