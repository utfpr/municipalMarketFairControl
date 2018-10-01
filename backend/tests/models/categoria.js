const chance = require("chance").Chance();
const { assert } = require("chai");

const models = require("../../models");

after(() => {
  models.sequelize.close();
});

describe("Testando categoria", () => {
  beforeEach(() => {
    models.feirante.destroy({ where: {} });
    models.categoria.destroy({ where: {} });
    models.subcategoria.destroy({ where: {} });
    models.feira.destroy({ where: {} });
    models.celula.destroy({ where: {} });
    models.participa.destroy({ where: {} });
    models.supervisor.destroy({ where: {} });
  });

  it("Adiciona categoria", async () => {
    let categoria = await models.categoria.findOne({
      where: {
        id: "",
        nome: "alimentos",
        need_cnpj: false
      }
    });
    assert.isNull(categoria);

    categoria = await models.categoria.create({
      id: "",
      nome: "alimentos",
      need_cnpj: false
    });
    categoria = await models.categoria.findOne({
      where: {
        nome: "alimentos",
        need_cnpj: false
      }
    });
    assert.isNotNull(categoria);
    assert.strictEqual(categoria.nome, "alimentos");
  });

  it("Listar subcategorias de categoria", async () => {
    const categoria = await models.categoria.create({
      id: 1,
      nome: "alimentos",
      need_cnpj: false
    });

    assert.lengthOf(await categoria.getSubCategorias(), 0);
    await categoria.createSubCategoria({ nome: "pastel" });
    assert.lengthOf(await categoria.getSubCategorias(), 1);
  });
});
