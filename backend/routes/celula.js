const express = require('express');
const router = express.Router();
const celula_controler = require('../controllers/celula');
const models = require('../models');

// metodo pra buscar celula pelo id
const findCelula = async (id) => {
    const celula = await models.celula.findOne({
      where: { id }
    });
  
    if (celula === null) return null;
  
    return {
      id_celula: celula.id,
      cpf_feirante: celula.cpf_feirante,
      periodo: celula.periodo
    };
};

// rota pra listar todas as celulas
router.get('/listCelulas', (req, res) => {
    var lista = celula_controller.listCelulas();
    res.json({
        message: "Listar celulas"
    });
});

// rota pra listar informações de uma celula
router.get('/listCelulas/infoCelula', (req, res) => {
    var id = req.body.id;
    var celula = findCelula(id);

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
router.post('/setFeirante', (req, res) => {
    var id_celula = req.body.id;
    var cpf_feirante = req.body.cpf_feirante;
    
    var set = celula_controler.setFeirante(id_celula, cpf_feirante);

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
