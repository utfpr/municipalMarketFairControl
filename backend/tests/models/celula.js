const chance = require("chance").Chance();
const { assert } = require("chai");

const models = require("../../models");

after(() => {
  models.sequelize.close();
});

describe.only('Testando Celula', () => {
  beforeEach(() => {
    models.feirante.destroy({ where: {} });
    models.categoria.destroy({ where: {} });
    models.subcategoria.destroy({ where: {} });
    models.feira.destroy({ where: {} });
    models.celula.destroy({ where: {} });
    models.participa.destroy({ where: {} });
     
   });

  it('Adiciona Celula', async () => {
    
    let celula = await models.celula.findOne({ 
      where: { 
        id: 1,
        cpf_feirante: '111.555.999',
        periodo: 1,
        participa_cpf: '555.999.444',
        participa_data: '2018-01-01'
      } 
    });
    assert.isNull(celula);

    celula = await models.celula.create({ 
      id: 1,
      cpf_feirante: '111.555.999',
      periodo: 1,
      participa_cpf: '555.999.444',
      participa_data: '2018-01-01' 
    });

    celula = await models.celula.findOne({ 
      where: { id: 1 },
      where: { cpf_feirante: '111.555.999'},
      where: { periodo: 1 },
      where: { participa_cpf: '555.999.444' },
      where: { participa_cpf: '2018-01-01' }
    });

    assert.isNotNull(celula);
    assert.strictEqual(celula.cpf_feirante, '111.555.999' );
  });
});
