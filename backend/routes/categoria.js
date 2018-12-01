const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const categoriaController = require('../controllers/categoria');
const subcategoriaController = require('../controllers/subcategoria');

// Adiciona categoria
router.post('/', async (req, res) => {
    const nome = req.body.nome;
    const need_cnpj = req.body.need_cnpj;
    console.log(nome)
    console.log(need_cnpj)
    if ((nome == null) || (need_cnpj == null) || (need_cnpj !== 0 && need_cnpj !== 1)) {
        res.status(400).send();
    } else {
        const categoria = await categoriaController.addCategoria(
            nome, need_cnpj
        );
        if (categoria != null) {
            resposta = 'ok';
        } else {
            resposta = 'erro';
        }
        res.status(200).send({
            msg: resposta,
        });
    }
});

// Lista categorias
router.get('/', authMiddleware.isSupervisor, async (req, res) => {
    const categorias = await categoriaController.listCategoria();
    res.status(200).send(categorias);
});

// Retorna informações de uma categoria pelo ID
router.get('/:id', authMiddleware.isSupervisor, async (req, res) => {
    const id_cat = req.params.id;

    const categoria = await categoriaController.findCategoriaById(id_cat);
    if (categoria != null) {
        res.status(200).send(categoria);

    } else {
        res.status(200).send({
            msg: 'id_nao_existente',
        });
    }
});

// Lista subcategorias de uma categoria pelo ID
router.get('/:id/subcategorias', authMiddleware.isSupervisor, async (req, res) => {
    const id_cat = req.params.id;

    const categoria = await categoriaController.findCategoriaById(id_cat);
    if (categoria == null) {
        res.status(200).send({
            msg: 'id_nao_existente',
        });
    } else {
        const subcategorias = await subcategoriaController.listSubcategoriasByCategoria(id_cat);
        res.status(200).send(subcategorias);
    }
});

// Atualiza categoria
router.put('/:id', authMiddleware.isSupervisor, async (req, res) => {
    const { nome, need_cnpj } = req.body;
    const id_cat = req.params.id;

    if ((nome == null) || (need_cnpj == null) ||
        (need_cnpj != '0' && need_cnpj != '1')) {
        res.status(400).send();
    }
    else {
        let resposta = '';
        const categoriaValidate = await categoriaController.findCategoriaById(id_cat);
        if (categoriaValidate != null) {
            const categoria = await categoriaController.updateCategoria(id_cat, { nome, need_cnpj });

            if (categoria != null) {
                resposta = 'ok';
            } else {
                resposta = 'erro';
            }
        } else {
            resposta = 'id_nao_existente';
        }
        res.status(200).send({
            msg: resposta,
        });
    }
});

// Remove categoria
router.delete('/:id', authMiddleware.isSupervisor, async (req, res) => {
    const id_cat = req.params.id;

    let resposta = '';
    const categoriaValidate = await categoriaController.findCategoriaById(id_cat);
    if (categoriaValidate != null) {

        const categoria = await categoriaController.deleteCategoria(id_cat);
        if (categoria != null) {
            resposta = 'ok';
        } else {
            resposta = 'erro';
        }
    } else {
        resposta = 'id_nao_existente';
    }
    res.status(200).send({
        msg: resposta,
    });
});

module.exports = router;
