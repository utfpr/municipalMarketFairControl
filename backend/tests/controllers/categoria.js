const chance = require('chance').Chance();
const { assert } = require('chai');
const categoriaController = require('../../controllers/categoria');
const models = require('../../models');

after(() => {
    models.sequelize.close();
  });

  describe('Teste categoria controller', ()=>{
    before(() => {
        models.categoria.destroy({ where: {} });
      });
  });

  it('Cadastrar categorias', async()=>{
      let res = await categoriaController.addCategoria("Salgadinhos", true);
      assert.inNotNull(res);
  })