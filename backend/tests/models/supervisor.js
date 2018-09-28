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
    });

    // Testa adicionar supervisor
    it("Adiciona supervisor", async () => {
        // Verifica se o supervisor não existe
        let supervisor = await models.supervisor.findOne({ 
            where: {
            cpf: "07564166983",
            nome: "Nome Sobrenome da Silva",
            senha: "letrasENumeros",
            is_adm: false
            }
        });
        assert.isNull(supervisor);

        // Cria supervisor
        await models.supervisor.create({
             cpf: "07564166983", 
             nome: "Nome Sobrenome da Silva", 
             senha: "letrasENumeros",
             is_adm: false 
        });
        supervisor = await models.supervisor.findOne({ where: { cpf: "07564166983" } });

        // Verifica se o supervisor existe e se a chave primaria "cpf" está correta
        assert.insNotNull(supervisor);
    });
});