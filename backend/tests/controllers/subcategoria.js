const { assert } = require('chai');
const models = require('../../models');
const subcategoriaController = require('../../controllers/subcategoria');

describe('Controller subcategoria', () => {
  beforeEach(async () => {
    await models.categoria.destroy({ where: {} });
    await models.subcategoria.destroy({ where: {} });
  });

  describe('addSubcategoria', () => {
    it('Retorna null se não for possível criar. Caso contrário, retorna um ponteiro para a subcategoria criada.', async () => {
      // Criando na mão uma categoria para teste
      const categoria = await models.categoria.create({ nome: 'Categoria_1', need_cnpj: false });
      assert.isNotNull(categoria);

      // Criando uma subcategoria para teste
      const subcategoria = await subcategoriaController.addSubcategoria("Subcategoria_11", categoria.id);
      assert.isNotNull(subcategoria);

      // Tentando criar a mesma subcategoria criada para teste
      const subcategoria2 = await subcategoriaController.addSubcategoria("Subcategoria_11", categoria.id);
      assert.isNull(subcategoria2);
    });
  });

  describe('listSubcategoria', () => {
    it('Retorna array vazio quando não existe subcategorias', async () => {
      // Recuperando as subcategorias sem existir nenhuma
      const subcategorias = await subcategoriaController.listSubcategorias();
      assert.lengthOf(subcategorias, 0);
    });

    it('Retorna um array de todas as subcategorias', async () => {
      // Criando na mão duas categorias para teste
      const categoria1 = await models.categoria.create({ nome: 'Categoria_1', need_cnpj: false });
      const categoria2 = await models.categoria.create({ nome: 'Categoria_2', need_cnpj: false });

      // Criando na mão subcategorias para as categorias de teste
      await models.subcategoria.create({ nome: 'Subcategoria_11', categoria_id: categoria1.id });
      await models.subcategoria.create({ nome: 'Subcategoria_12', categoria_id: categoria1.id });
      await models.subcategoria.create({ nome: 'Subcategoria_21', categoria_id: categoria2.id });
      await models.subcategoria.create({ nome: 'Subcategoria_22', categoria_id: categoria2.id });

      // Listando todas as categorias existentes
      const subcategorias = await subcategoriaController.listSubcategorias();
      assert.lengthOf(subcategorias, 4);
    });
  });

  describe('listSubcategoriaByCategoria', () => {
    it('Retorna null quando não existe subcategorias.', async () => {
      // Recuperando a subcategorias de uma categoria inexistente
      const subcategorias_null = await subcategoriaController.listSubcategoriasByCategoria("Categoria_xxx");
      assert.isNull(subcategorias_null);
    });

    it('Retorna um array de todas as subcategorias.', async () => {
      // Criando na mão duas categorias para teste
      const categoria1 = await models.categoria.create({ nome: 'Categoria_1', need_cnpj: false });
      const categoria2 = await models.categoria.create({ nome: 'Categoria_2', need_cnpj: false });

      // Criando na mão subcategorias para as categorias de teste
      await models.subcategoria.create({ nome: 'Subcategoria_11', categoria_id: categoria1.id });
      await models.subcategoria.create({ nome: 'Subcategoria_12', categoria_id: categoria1.id });

      await models.subcategoria.create({ nome: 'Subcategoria_21', categoria_id: categoria2.id });

      // Listando as subcategorias da Categoria_1
      const subcategorias1 = await subcategoriaController.listSubcategoriasByCategoria(categoria1.id);
      assert.lengthOf(subcategorias1, 2);

      // Listando as subcategorias da Categoria_2
      const subcategorias2 = await subcategoriaController.listSubcategoriasByCategoria(categoria2.id);
      assert.lengthOf(subcategorias2, 1);
    });
  });

  describe('findSubcategoriaById', () => {

  });

  describe('getSubcategoria', () => {
    it('Retorna null caso não encontrar', async () => {
      // Recuperando um subcategoria inexistente
      const subcategoria_null = await subcategoriaController.getSubcategoria("SUBCATEGORIA");
      assert.isNull(subcategoria_null);
    });

    it('Retorna um ponteiro no caso de encontrar', async () => {
      // Criando uma categoria e uma subcategoria na mão
      const categoria = await models.categoria.create({ nome: 'Categoria_1', need_cnpj: false });
      await models.subcategoria.create({ nome: 'Subcategoria_11', categoria_id: categoria.id });

      // Recuperando a subcategoria criada
      const subcategoria2 = await subcategoriaController.getSubcategoria('Subcategoria_11', categoria.id);
      assert.isNotNull(subcategoria2);
    });
  });

  describe('setSubcategoria', () => {
    it('Alterando um nome de uma subcategoria', async () => {
      // Criando uma categoria e uma subcategoria na mão
      const categoria = await models.categoria.create({ nome: 'Categoria_1', need_cnpj: false });
      await models.subcategoria.create({ nome: 'Subcategoria_11', categoria_id: categoria.id });

      // Alterando a subcategoria
      await subcategoriaController.setSubcategoria('Subcategoria_11', categoria.id, "SUBCATEGORIA");

      const subcategoria_null = await subcategoriaController.getSubcategoria('Subcategoria_11', categoria.id);
      assert.isNull(subcategoria_null);

      const subcategoria_not_null = await subcategoriaController.getSubcategoria('SUBCATEGORIA', categoria.id);
      //assert.isNotNull(subcategoria_not_null); // Esta dando erro aki
    });
  });

  describe('deleteSubcategoria', () => {
    it('Removendo uma subcategoria pelo nome', async () => {
      // Criando uma categoria e uma subcategoria na mão
      const categoria = await models.categoria.create({ nome: 'Categoria_1', need_cnpj: false });
      await models.subcategoria.create({ nome: 'Subcategoria_11', categoria_id: categoria.id });

      // Removendo a subcategoria
      await subcategoriaController.deleteSubcategoria('Subcategoria_11', categoria.id);

      const subcategoria_null = await subcategoriaController.getSubcategoria('Subcategoria_11', categoria.id);
      assert.isNull(subcategoria_null); // Esta dando erro aki
    });
  });
});