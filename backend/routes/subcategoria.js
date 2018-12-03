const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const subcategoriaController = require('../controllers/subcategoria');
const categoriaController = require('../controllers/categoria');

// Adicionar subcategoria
router.post('/', authMiddleware.isSupervisor, async (req, res) => {
    const nome_sub = req.body.nome;
    const categoria_id = req.body.categoria_id;

    if ( (nome_sub == null) || (categoria_id == null) ){
        res.status(400).send();
    }
    else {
        const categoria = await categoriaController.findCategoriaById(categoria_id);
        let resposta = '';

        if (categoria == null){
            resposta = 'categoria_nao_existente';
        } else {
            const cadastro = await subcategoriaController.addSubcategoria(
                nome_sub, categoria_id
            );
            if (cadastro != null) {
                resposta = 'ok';
            }
            else {
                resposta = 'erro';
            }
        }
        res.status(200).send({
            msg: resposta,
        });
    }
});

// Retorna informações de uma subcategoria pelo ID
router.get('/:id', authMiddleware.isSupervisor, async (req, res) => {
    const id_sub = req.params.id;

    const subcategoria = await subcategoriaController.findSubcategoriaById(id_sub);
    if(subcategoria != null){
        res.status(200).send(subcategoria);
    } else {
        res.status(200).send({
            msg: 'id_nao_existente',
        });
    }
});

// Retorna categoria pelo ID da subcategoria
router.get('/:id/categoria', authMiddleware.isSupervisor, async (req, res) => {
    const id_sub = req.params.id;

    const categoria = await subcategoriaController.findCategoriaBySubcategoria(id_sub);
    if(categoria != null){
        res.status(200).send(categoria);
    } else {
        res.status(200).send({
            msg: 'id_nao_existente',
        });
    }
});

// Atualiza subcategoria
router.put('/:id', authMiddleware.isSupervisor, async (req, res) => {
    const id_sub = req.params.id;
    const { nome } = req.body;

    if(nome == null){
        res.status(400).send();
    } else{
        let resposta = '';
        const subcategoriaValidate = await subcategoriaController.findSubcategoriaById(id_sub);
        if(subcategoriaValidate != null){
            const subcategoria = await subcategoriaController.updateSubcategoria(id_sub, {nome});
            
            if (subcategoria != null) {
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

// Remove subcategoria
router.delete('/:id', authMiddleware.isSupervisor, async (req, res) => {
    const id_sub = req.params.id;
    
    let resposta = '';
    const subcategoriaValidate = await subcategoriaController.findSubcategoriaById(id_sub);
    if(subcategoriaValidate != null){
        const subcategoria = subcategoriaController.deleteSubcategoria(id_sub);
        if(subcategoria != null){
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
