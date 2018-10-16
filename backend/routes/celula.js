const express = require('express');
const router = express.Router();
const celula_controller = require('../controllers/celula');
const authMiddleware = require('../middlewares/auth');
const models = require('../models');

// rota pra listar todas as celulas
router.get('/list', (req, res) => {
    var lista = celula_controller.listCelulas();
    res.json({
        message: "Listar celulas"
    });
});

// rota pra listar informações de uma celula
router.get('/list/info', (req, res) => {
    var id = req.body.id;
    var celula = celula_controller.findCelula(id);

    var resposta;
    if(celula != null){
        resposta = 'Informações da celula';
    } else{
        resposta = 'Celula nao existe'
    }

    res.json({
        message: resposta
    });
});

// rota pra setar feirante
router.post('/setFeirante', authMiddleware.isSupervisor, (req, res) => {
    var id_celula = req.body.id;
    var cpf_feirante = req.body.cpf_feirante;
    
    var set = celula_controller.setFeirante(id_celula, cpf_feirante);

    var resposta;
    if(set != null){
        resposta = "Setou";
    } else{
        resposta = "Deu ruim";
    }

    res.json({
        message: resposta
    });
});

module.exports = router;