const chance = require("chance").Chance();
const { assert } = require("chai");

const models = require("../../models");

after(() => {
  models.sequelize.close();
});

describe("Testando Feira", () => {
  beforeEach(() => {
    models.feirante.destroy({ where: {} });
    models.categoria.destroy({ where: {} });
    models.subcategoria.destroy({ where: {} });
    models.feira.destroy({ where: {} });
    models.celula.destroy({ where: {} });
  });

  it("Add Feira", async () => {
    let feira = await models.feira.findOne({ where: { data: "2018-12-15" } });
    assert.isNull(feira);

    await models.feira.create({ data: "2018-12-15" });
    feira = await models.feira.findOne({ where: { data: "2018-12-15" } });

    assert.isNotNull(feira);
    assert.strictEqual(feira.data, "2018-12-15");
  });

  it("Del Feira", async () => {
    await models.feira.create({ data: "2018-12-15" });
    let feira = await models.feira.findOne({ where: { data: "2018-12-15" } });
    assert.isNotNull(feira);

    feira = await models.feira.destroy({ where: { data: "2018-12-15" } });
    assert.strictEqual(feira, 1);

    feira = await models.feira.findOne({ where: { data: "2018-12-15" } });
    assert.isNull(feira);
  });
});