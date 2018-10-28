const { assert } = require('chai');
const categoriaController = require('../../controllers/categoria');
const subCategoriaController = require('../../controllers/subcategoria');
const models = require('../../models');

after(() => {
  models.sequelize.close();
});

describe('categoria.js', () => {
  beforeEach(() => {
    models.categoria.destroy({ where: {} });
  });

  it('Cadastrar categorias', async () => {
    models.categoria.destroy({ where: {} });
    const res = await categoriaController.addCategoria('Salgadinhos', true);
    assert.isNotNull(res);
  });

  it('Achar por id', async () => {
    await models.categoria.destroy({ where: {} });
    const res = await categoriaController.addCategoria('Pastel', true);
    assert.isNotNull(res);
    const categoria = await categoriaController.findCategoriaById(res.id);
    assert.isNotNull(categoria);
  });

  it('Remover por Id', async () => {
    const categoria = await categoriaController.addCategoria('Verduras', true);
    assert.isNotNull(categoria);
    let res = await categoriaController.deleteCategoria(categoria.id);
    assert.isNotNull(res);
    res = await categoriaController.findCategoriaById(categoria.id);
    assert.isNull(res);
  });

  it('Remover por Id (com subcategoria)', async () => {
    const categoria = await categoriaController.addCategoria('Verduras', true);
    assert.isNotNull(categoria);

    let subcategoria = await categoria.createSubCategoria({ nome: 'Alface' });
    assert.isNotNull(subcategoria);

    subcategoria = await subCategoriaController.findSubcategoriaById(subcategoria.id);
    assert.isNotNull(subcategoria);

    let res = await categoriaController.deleteCategoria(categoria.id);
    assert.isNotNull(res);

    res = await categoriaController.findCategoriaById(categoria.id);
    assert.isNull(res);

    subcategoria = await subCategoriaController.findSubcategoriaById(subcategoria.id);
    assert.isNull(subcategoria);
  });

  it('Atualizar dados', async () => {
    const categoria = await categoriaController.addCategoria('Caldo de cana', true);
    assert.isNotNull(categoria);
    const res = await categoriaController.updateCategoria(categoria.id, {
      need_cnpj: false,
    });
    assert.isNotNull(res);
    const res1 = await categoriaController.updateCategoria(categoria.id, {
      nome: 'Artesanato',
      need_cnpj: false,
    });
    assert.isNotNull(res1);
    assert.strictEqual(res1.nome, 'Artesanato');
  });

  it('Listar todas Categorias', async () => {
    let categoria = await categoriaController.addCategoria('Caldo de cana', true);
    assert.isNotNull(categoria);
    categoria = await categoriaController.addCategoria('Verduras', true);
    assert.isNotNull(categoria);
    const res = await categoriaController.addCategoria('Pastel', true);
    assert.isNotNull(res);

    const categorias = await categoriaController.listCategoria();
    assert.lengthOf(categorias, 3);
  });
});
