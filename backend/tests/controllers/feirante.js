const chance = require("chance").Chance();
const { assert } = require("chai");
const feiranteController = require("../../controllers/feirante");
const models = require("../../models");

after(() => {
  models.sequelize.close();
});

describe.only("Teste controller feirante", () => {
  let sub, categoria;
  before(() => {
    models.feirante.destroy({ where: {} });
  });

  it("Cadastrar feirante", async () => {
    categoria = await models.categoria.create({
      nome: "Categoria",
      need_cnpj: false
    });
    sub = await categoria.createSubCategoria({
      nome: "SubCategoria"
    });

    let res = await feiranteController.addFeirante(
      "108.142.869-41",
      "111111111",
      "orivaldo",
      "111111111",
      1,
      "daniel orivaldo da silva",
      "daniel orivaldo da silva",
      2,
      2,
      "fjisadjfsdfjisdf",
      220,
      sub.id,
      "1234"
    );
    assert.isNotNull(res);
  });

  it("Não permitir cadastrar feirante sem categoria", async () => {
    let res1 = await feiranteController.addFeirante(
      "108.142.869-42",
      "111111111",
      "orivaldo",
      "111111111",
      1,
      "daniel orivaldo da silvaa",
      "daniel orivaldo da silvaa",
      2,
      2,
      "fjisadjfsdfjisdf",
      220,
      null,
      "1234"
    );
    assert.isNull(res1);
  });

  it("Não permite cadastrar feirante já existente", async () => {
    const categoria = await models.categoria.create({
      nome: "Categoria",
      need_cnpj: false
    });
    const sub = await categoria.createSubCategoria({
      nome: "SubCategoria"
    });

    let res = await feiranteController.addFeirante(
      "108.142.869-41",
      "111111111",
      "orivaldo",
      "111111111",
      1,
      "daniel orivaldo da silva",
      "daniel orivaldo da silva",
      2,
      2,
      "fjisadjfsdfjisdf",
      220,
      sub.id,
      "1234"
    );
    assert.isNull(res);
  });

  it("Não permite cadastrar feirante com dados faltantes", async () => {
    let res = await feiranteController.addFeirante(
      "108.142.869-41",
      "111111111",
      "orivaldo",
      "111111111",
      1,
      "daniel orivaldo da silva",
      "daniel orivaldo da silva",
      2,
      2,
      "fjisadjfsdfjisdf",
      220,
      1,
      "1234"
    );
    assert.isNull(res);
  });

  it("Lista supervisores", async () => {
    const supervisores = await feiranteController.listFeirantes();
    assert.lengthOf(supervisores, 1);
  });

  it("Busca por CPF existente", async () => {
    let feirante = await feiranteController.findFeiranteByCpf("108.142.869-41");
    assert.isNotNull(feirante);
    assert.deepEqual(feirante, {
      cpf: "108.142.869-41",
      rg: "111111111",
      nome: "orivaldo",
      cnpj: "111111111",
      usa_ee: 1,
      nome_fantasia: "daniel orivaldo da silva",
      razao_social: "daniel orivaldo da silva",
      comprimento_barraca: 2,
      largura_barraca: 2,
      endereco: "fjisadjfsdfjisdf",
      voltagem_ee: 220,
      sub_categoria_id: sub.id
    });
  });

  it("Busca por CPF inexistente", async () => {
    let feirante = await feiranteController.findFeiranteByCpf("105.142.869-41");
    assert.isNull(feirante);
  });

  it("Atualiza feirante", async () => {
    let feirante = await feiranteController.findFeiranteByCpf("108.142.869-41");
    assert.strictEqual(feirante.nome_fantasia, "daniel orivaldo da silva");

    res = await feiranteController.updateFeirante("108.142.869-41", {
      nome_fantasia: "leonel messenger"
    });
    assert.isNotNull(res);

    feirante = await feiranteController.findFeiranteByCpf("108.142.869-41");
    assert.strictEqual(feirante.nome_fantasia, "leonel messenger");
  });

  it("Deleta feirante", async () => {
    let res = await feiranteController.findFeiranteByCpf("108.142.869-41");
    assert.isNotNull(res);

    res = await feiranteController.deleteFeirante("108.142.869-41");
    assert.isNotNull(res);

    res = await feiranteController.findFeiranteByCpf("108.142.869-41");
    assert.isNull(res);
  });
});
