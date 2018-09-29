/* eslint-disable */

const chance = require("chance").Chance();
const { assert } = require("chai");

const models = require("../../models");

after( () => {
  models.sequelize.close();
});

describe("Testando Feirante", () => {
  beforeEach( () => {
    models.feirante.destroy({ where: {} });
    models.categoria.destroy({ where: {} });
    models.subcategoria.destroy({ where: {} });
    models.feira.destroy({ where: {} });
    models.celula.destroy({ where: {} });
    models.participa.destroy({ where: {} });
  });

  it("Add Feirante", async () => {

    
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
    let feirante = await models.feirante.findOne({
      where: {
        cpf: "111.111.111-11",
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
      }
    });
    
    assert.isNull(feirante);
    feirante = await models.feirante.create({
      cpf: "111.111.111-11",
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
    feirante = await models.feirante.findOne({
      where: {
        nome_ficticio: "Pastel do Tio",
        razao_social: "Tio do pastel LTDA",
        status: true,
        senha: "12345678"
      }
    });
    assert.isNotNull(feirante);
    assert.strictEqual(feirante.cpf, "111.111.111-11");
    assert.strictEqual(feirante.senha, "12345678");

  });

  it("Relações", async () => {
    
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
      cpf: "111.111.111-11",
      nome_ficticio: "Pastel do Tio",
      razao_social: "Tio do pastel LTDA",
      senha: "12345678",
      sub_categoria_id: 1
    });
    let feira = await models.feira.create({ data: "2018-12-31" });
    let celula = await models.celula.create({ 
      id: 1,
      cpf_feirante: "111.111.111-11",
      periodo: 1
    });

    let participa = await models.participa.create({
      cpf_feirante: "111.111.111-11",
      data_feira: "2018-12-31",
      celula_id: 1,
    });

    feirante = await models.feirante.findOne({
      where: {
        cpf: "111.111.111-11"
      }
    });
    feira = await models.feira.findOne({
      where: {
        data: "2018-12-13"
      }
    });
    participa = await models.participa.findOne({
      where: {
        //cpf_feirante: "111.111.111-11",
        //data_feira: "2018-12-31"
      }
    });

    assert.strictEqual(participa.cpf_feirante, "111.111.111-11");
    assert.strictEqual(participa.data_feira, "2018-12-31");

  });

})