const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const categoriaController = require('../controllers/categoria');
const subcategoriaController = require('../controllers/subcategoria');

// verificar o que os metodos add, update, e remove estão retornando nos controllers

// Adiciona categoria
router.post('/', authMiddleware.isSupervisor, async (req, res) => {
    const nome = req.body.nome;
    const need_cnpj = req.body.need_cnpj;

    if ( (nome == null) || (need_cnpj == null)
    || (need_cnpj != '0' && need_cnpj != '1') )
    {
        res.status(400);
    } else{
        const categoria = await categoriaController.addCategoria(
            nome, need_cnpj
        );
        if (categoria != null){
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
    const categorias = await categoriaController.listCategorias();
    res.status(200).send(categorias);
});

// Retorna informações de uma categoria pelo ID
router.get('/:id', authMiddleware.isSupervisor, async (req, res) => {
    const id_cat = req.params.id;

    const categoria = await categoriaController.findByid(id_cat);
    if(categoria != null){
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

    const categoria = await categoriaController.findByid(id_cat);
    if(categoria == null){
        res.status(200)({
            msg: 'id_nao_existente',
        });
    } else {
        // no controller, ta buscando pelo nome (tem que ser por id)
        const subcategorias = await subcategoriaController.listSubcategoriasByCategoria(id_cat);
        res.status(200).send(subcategorias);
    }
});

// Atualiza categoria
router.put('/:id', authMiddleware.isSupervisor, async (req, res) => {
    const { nome, need_cnpj } = req.body;
    const id_cat = req.params.id;

    if ( (nome == null) || (need_cnpj == null) || 
         (need_cnpj != '0' && need_cnpj != '1') )
    {
        res.status(400);
    }
    else{
        let resposta = '';
        const categoriaValidate = await categoriaController.findByid(id_cat);
        if(categoriaValidate != null){
            // falta esse metodo no controller
            const categoria = await categoriaController.updateCategoria(id_cat, {nome, need_cnpj});

            if(categoria != null){
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
    const categoriaValidate = await categoriaController.findByid(id_cat);
    if(categoriaValidate != null){

        const categoria = await categoriaController.removeCategoria(id_cat);
        if(categoria != null){
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
