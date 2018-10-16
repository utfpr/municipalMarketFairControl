const { assert } = require('chai');
const models = require('../../models');
const subcategoriaController = require('../../controllers/subcategoria');

describe('Controller subcategoria', () => {
    beforeEach(async () => {
        await models.categoria.destroy({ where: {} });
        await models.subcategoria.destroy({ where: {} });
    });

    describe('addSubcategoria', () => {
        it('Retorna null se não for possível criar. Caso contrário, retorna um ponteiro para a subcategoria criada.', async () => {
            // Criando na mão uma categoria para teste
            const categorias = await models.categoria.create({ nome: 'Categoria_1', need_cnpj: false });
            assert.isNotNull(categorias);

            // Criando na mão uma subcategoria para teste
            const subcategoria = subcategoriaController.addSubcategoria("Subcategoria_11", 1);
            assert.isNotNull(subcategoria);

            // Tentando criar na mão a mesma subcategoria criada para teste
            const subcategoria2 = subcategoriaController.addSubcategoria("Subcategoria_11", 1);
            assert.isNull(subcategoria2);
        });
    });

    describe('listSubcategoria', () => {
        it('Retorna array vazio quando não existe subcategorias', async () => {
            // Recuperando as subcategorias sem existir nenhuma
            const subcategorias = await subcategoriaController.listSubcategorias();
            assert.lengthOf(subcategorias, 0);
        });

        it('Retorna um array de todas as subcategorias', async () => {
            // Criando na mão duas categorias para teste
            await models.categoria.create({ nome: 'Categoria_1', need_cnpj: false });
            await models.categoria.create({ nome: 'Categoria_2', need_cnpj: false });

            // Criando na mão subcategorias para as categorias de teste
            await models.subcategoria.create({ nome: 'Subcategoria_11', categoria_id: 1 });
            await models.subcategoria.create({ nome: 'Subcategoria_12', categoria_id: 1 });
            await models.subcategoria.create({ nome: 'Subcategoria_21', categoria_id: 2 });
            await models.subcategoria.create({ nome: 'Subcategoria_22', categoria_id: 2 });

            // Listando todas as categorias existentes
            const subcategorias = await subcategoriaController.listSubcategorias();
            assert.lengthOf(subcategorias, 4);

            // Posso garantir que vem ordenado por id?
            assert.strictEqual(subcategorias[0].id, 1);
            assert.strictEqual(subcategorias[1].id, 2);
            assert.strictEqual(subcategorias[2].id, 3);
            assert.strictEqual(subcategorias[3].id, 4);
        });
    });

    describe('listSubcategoriaByCategoria', () => {
        it('Retorna array vazio quando não existe subcategorias.', async () => {
            // Recuperando a subcategorias de uma categoria inexistente
            const subcategorias = await subcategoriaController.listSubcategoriasByCategoria("Categoria_xxx");
            assert.lengthOf(subcategorias, 0);
        });

        it('Retorna um array de todas as subcategorias.', async () => {
            // Criando na mão duas categorias para teste
            await models.categoria.create({ nome: 'Categoria_1', need_cnpj: false });
            await models.categoria.create({ nome: 'Categoria_2', need_cnpj: false });

            // Criando na mão subcategorias para as categorias de teste
            await models.subcategoria.create({ nome: 'Subcategoria_11', categoria_id: 1 });
            await models.subcategoria.create({ nome: 'Subcategoria_12', categoria_id: 1 });
            await models.subcategoria.create({ nome: 'Subcategoria_21', categoria_id: 2 });

            // Listando as subcategorias da Categoria_1
            let subcategorias = await subcategoriaController.listSubcategoriasByCategoria("Categoria_1");

            assert.lengthOf(subcategorias, 2);
            // Posso garantir que vem ordenado por id?
            assert.strictEqual(subcategorias[0].id, 1);
            assert.strictEqual(subcategorias[1].id, 2);

            // Listando as subcategorias da Categoria_2
            subcategorias = await subcategoriaController.listSubcategoriasByCategoria("Categoria_2");

            assert.lengthOf(subcategorias, 1)
            assert.strictEqual(subcategorias[0].id, 3);
        });
    });

    describe('getSubcategoria', () => {
        it('Retorna null caso não encontrar', async () => {
            // Recuperando um subcategoria inexistente
            const subcategoria = subcategoriaController.getSubcategoria(10000);
            assert.isNull(subcategoria);
        });

        it('Retorna um ponteiro no caso de encontrar', async () => {
            // Criando uma categoria e uma subcategoria na mão
            await models.categoria.create({ nome: 'Categoria_1', need_cnpj: false });
            await models.subcategoria.create({ nome: 'Subcategoria_11', categoria_id: 1 });

            // Recuperando a subcategoria criada
            const subcategoria = subcategoriaController.getSubcategoria(1);
            assert.isNotNull(subcategoria);
        });
    });

    describe('setSubcategoria', () => {
        it('Retorna null caso não encontrar', async () => {
            // Alterando uma subcategoria inexistente
            const subcategoria = subcategoriaController.setSubcategoria(1, "SUBCATEGORIA");
            assert.isNull(subcategoria);
        });

        it('Retorna um ponteiro no caso de encontrar', async () => {
            // Criando uma categoria e uma subcategoria na mão
            await models.categoria.create({ nome: 'Categoria_1', need_cnpj: false });
            await models.subcategoria.create({ nome: 'Subcategoria_11', categoria_id: 1 });

            // Buscando a subcategoria criada na mão
            const subcategoria = await models.subcategoria.findOne({ where: { id: 1 } });
            assert.isNotNull(subcategoria);

            // Alterando a subcategoria
            const subcategoria2 = await subcategoriaController.setSubcategoria(1, "SUBCATEGORIA");
            assert.isNotNull(subcategoria2);

            assert.strictEqual(subcategoria2.nome, "SUBCATEGORIA");
            assert.strictEqual(subcategoria1.nome, "SUBCATEGORIA"); // Troca o nome tambem?
        });
    });

    describe('deleteSubcategoria', () => {
        it('Retorna false caso não conseguir deletar', async () => {
            // Removendo uma subcategoria inexistente
            const res = subcategoriaController.deleteSubcategoria(1);
            assert.isFalse(res);
        }, "OKAY");

        it('Retorna true no caso de conseguir remover', async () => {
            // Criando uma categoria e uma subcategoria na mão
            await models.categoria.create({ nome: 'Categoria_1', need_cnpj: false });
            await models.subcategoria.create({ nome: 'Subcategoria_11', categoria_id: 1 });

            // Buscando a subcategoria criada na mão
            const subcategoria = await models.subcategoria.findOne({ where: { id: 1 } });
            assert.isNotNull(subcategoria);

            // Removendo a subcategoria
            const res = await subcategoriaController.deleteSubcategoria(1);
            assert.isTrue(res);
        });
    });
});