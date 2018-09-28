// const chance = require("chance").Chance();
// const { assert } = require("chai");

// const models = require("../../models");

// after(() => {
//   models.sequelize.close();
// });

// describe("Teste exemplo", () => {
//   // Essa função é executada antes de cada teste
//   beforeEach(() => {
//     // Limpa o banco
//     models.feirante.destroy({ where: {} });
//     models.categoria.destroy({ where: {} });
//     models.subcategoria.destroy({ where: {} });
//     models.feira.destroy({ where: {} });
//     models.celula.destroy({ where: {} });

//     // Caso precisar adicionar algo no banco antes dos testes colocar aqui
//   });

//   // Testa adicionar feira
//   it("Adiciona feira", async () => {
//     // Verifica se a feira não existe
//     let feira = await models.feira.findOne({ where: { data: "2018-12-31" } });
//     assert.isNull(feira);

//     // Cria a feira
//     await models.feira.create({ data: "2018-12-31" });
//     feira = await models.feira.findOne({ where: { data: "2018-12-31" } });

//     // Verifica se a feira existe e se a data está correta
//     assert.isNotNull(feira);
//     assert.strictEqual(feira.data, "2018-12-31");
//   });
// });
