const chance = require("chance").Chance();
const { assert } = require("chai");
 
const models = require("../../models");
 
after(() => {
  models.sequelize.close();
});
 
describe("Teste Supervisor", () => {
  beforeEach(() => {
    models.feirante.destroy({ where: {} });
    models.categoria.destroy({ where: {} });
    models.subcategoria.destroy({ where: {} });
    models.feira.destroy({ where: {} });
    models.celula.destroy({ where: {} });
    models.supervisor.destroy({ where: {} });
  });
 
  it("Adiciona supervisor", async () => {
    let supervisor = await models.supervisor.findOne({
      where: {
        cpf: "07564266981",
        nome: "Nome Sobrenome da Silva",
        senha: "letrasENumeros",
        is_adm: false
      }
    });
    assert.isNull(supervisor);
 
    // Adiciona supervisor
    await models.supervisor.create({
      cpf: "07564266981",
      nome: "Nome Sobrenome da Silva",
      senha: "letrasENumeros",
      is_adm: false
    });

    supervisor = await models.supervisor.findOne({
      where: { cpf: "07564266981" },
      where: { nome: "Nome Sobrenome da Silva" },
      where: { senha: "letrasENumeros" }
    });

    // Verifica se supervisor e seus respectivos atributos existem
    assert.isNotNull(supervisor);
    assert.strictEqual(supervisor.cpf, "07564266981");
    assert.strictEqual(supervisor.nome, "Nome Sobrenome da Silva");
    assert.strictEqual(supervisor.senha, "letrasENumeros");
  });

  it("Remove supervisor", async () => {

    // Adiciona supervisor
    let supervisor = await models.supervisor.findOne({
      where: {
        cpf: "07564266981",
        nome: "Lucas Souza Santos",
        senha: "senha",
        is_adm: false
      }
    });
    assert.isNull(supervisor);
    
    await models.supervisor.create({
      cpf: "07564266981",
      nome: "Lucas Souza Santos",
      senha: "senha",
      is_adm: false
    });

    supervisor = await models.supervisor.findOne({
        where: { cpf: "07564266981" },
        where: { nome: "Lucas Souza Santos" },
        where: { senha: "senha" }
      });
    assert.isNotNull(supervisor)

    // Remove supervisor
    models.supervisor.destroy({
      where: { cpf: "07564266981" }
    });

    supervisor = await models.supervisor.findOne({
      where: { cpf: "07564266981" },
      where: { nome: "Lucas Souza Santos" },
      where: { senha: "senha" }
    });
    // Verifica se foi removido
    assert.isNull(supervisor);
  });
});