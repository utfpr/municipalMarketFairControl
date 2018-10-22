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
      let res = await categoriaController.addCategoria("Salgadinhos", true);
      assert.isNotNull(res);

  });
  it('Achar por nome', async()=>{
    let res = await categoriaController.addCategoria("Salgadinhos", true);
    assert.isNotNull(res);
    categoria = await categoriaController.findByNome("Salgadinhos");
    assert.isNotNull(categoria);
    console.log(categoria);
  });
  it('Achar por id', async()=>{
    let res = await categoriaController.addCategoria("Salgadinhos", true);
    assert.isNotNull(res);
    categoria = await categoriaController.findByid(14);
    assert.isNotNull(categoria);
    console.log(categoria);
  })

});