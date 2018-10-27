const chance = require('chance').Chance();
const { assert } = require('chai');
const categoriaController = require('../../controllers/categoria');
const models = require('../../models');

after(() => {
    models.sequelize.close();
  });

  describe.only('Teste categoria controller', ()=>{
    beforeEach(() => {
        models.categoria.destroy({ where: {} });
      });

  it('Cadastrar categorias', async()=>{
      models.categoria.destroy({ where: {} });
      let res = await categoriaController.addCategoria('Salgadinhos', true);
      //console.log(res.dataValues.id);
      assert.isNotNull(res);

  });
 
  it('Achar por id', async()=>{
    await models.categoria.destroy({ where: { } });
    let res = await categoriaController.addCategoria('Pastel', true);
    assert.isNotNull(res);
    let categoria = await categoriaController.findByid(res.dataValues.id);
    assert.isNotNull(categoria);
  });

  it('Remover por Id', async()=>{
    let categoria = await categoriaController.addCategoria('Verduras', true);
    assert.isNotNull(categoria);
    let res = await categoriaController.removeCategoria(categoria.dataValues.id);
    assert.isNotNull(res);
    res = await categoriaController.findByid(categoria.dataValues.id);
    assert.isNull(res);
  });

  it('Atualizar dados', async()=>{
    let categoria = await categoriaController.addCategoria('Caldo de cana', true);
    assert.isNotNull(categoria);
    let res = await categoriaController.updateCategoria(categoria.dataValues.id, {need_cnpj: false});
    assert.isNotNull(res);
    let res1 = await categoriaController.updateCategoria(categoria.dataValues.id, {nome: "Artesanato", need_cnpj: false});
    assert.isNotNull(res1);
    console.log(categoria.dataValues);
    let novo = await categoriaController.findByid(categoria.dataValues.id);
    console.log(novo);
  });

  it('Listar todas Categorias', async()=>{
    let categoria = await categoriaController.addCategoria('Caldo de cana', true);
    assert.isNotNull(categoria);
    categoria = await categoriaController.addCategoria('Verduras', true);
    assert.isNotNull(categoria);
    let res = await categoriaController.addCategoria('Pastel', true);
    assert.isNotNull(res);

    let categorias = await categoriaController.listCategorias();
    console.log(categorias);
  })

});