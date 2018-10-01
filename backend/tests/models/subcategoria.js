const chance = require("chance").Chance();
const { assert } = require("chai");
const models = require("../../models");

after(() => {
   models.sequelize.close();
});


describe("Testando Subcategoria", () => {
   beforeEach(() => {
     models.feirante.destroy({ where: {} });
     models.categoria.destroy({ where: {} });
     models.subcategoria.destroy({ where: {} });
     models.feira.destroy({ where: {} });
     models.celula.destroy({ where: {} });


     // Cria a categoria Alimentos com id 1
     models.categoria.create({
        id: "1",
        nome: "alimentos",
        need_cnpj: false
                            });
 });
    it("Adicionar Subcategoria", async ()=>{

        // Verifica que a subcategoria Pastel já existe
        let subcategoria = await models.subcategoria.findOne({
            where:{
                id: "",
                nome: "pastel",
                categoria_id: "1"

            }
        });
        assert.isNull(subcategoria);
        
        // Cria uma nova Subcategoria Pastel, relacionada com a categoria Alimentos
        subcategoria = await models.subcategoria.create({
            id: "",
            nome: "pastel",
            categoria_id: "1"
        });
        // Faz uma consulta para encontrar a Subcategoria Pastel
        subcategoria = await models.subcategoria.findOne({
            where:{
                nome: "pastel",
                categoria_id: "1"
            }
        });
        assert.isNotNull(subcategoria);
        assert.strictEqual(subcategoria.nome, "pastel");
    });
});
