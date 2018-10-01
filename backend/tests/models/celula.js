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

    let categoria = await models.categoria.create({
      id: 1,
      nome: "Alimentos",
      need_cnpj: true
    });
    let subcategoria = await models.subcategoria.create({
      id: 1,
      nome: "Pasteis",
      categoria_id: 1
    });

    let feirante = await models.feirante.create({
      cpf: "111.555.999",
      cnpj: "222.222.222-22",
      usa_ee: false,
      nome_ficticio: "Pastel do Tio",
      razao_social: "Tio do pastel LTDA",
      comprimento_barraca: 2,
      largura_barraca: 3,
      endereco: "Rua da feira",
      voltagem_ee: null,
      status: true,
      sub_categoria_id: 1,
      senha: "12345678"
    });

    let celula = await models.celula.findOne({ 
      where: { 
        id: 1,
        cpf_feirante: '111.555.999',
        periodo: 1
      } 
    });
    assert.isNull(celula);

    celula = await models.celula.create({ 
      id: 1,
      cpf_feirante: '111.555.999',
      periodo: 1
    });


    assert.isNotNull(celula);
    assert.strictEqual(celula.cpf_feirante, '111.555.999' );
  });
});
