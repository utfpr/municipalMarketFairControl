const express = require('express');
const router = require('express').Router();

const supervisor_controler = require('../controllers/supervisor');

// get cadastro supervisor
router.get('/cadastro', (req, res) => {
    res.json({
        message: "Cadastro Supervisor"
    });
});

// verificar se os digitos do cpf são válidos
var cpf_validation = (cpfString) =>{
    
    if (cpfString == "00000000000") 
        return 0;   //cpf invalido

    var cpfInt = cpfString.split('');
    var soma = 0;

    for(var i = 10, j = 0; i >= 2; i--, j++){
        soma += parseInt(cpfInt[j] * i);
    }

    soma *= 10;
    soma %= 11;

    if(soma == 10 || soma == 1)
        soma = 0;
    if(soma != parseInt(cpfInt[9]))
        return 0;   // cpf invalido
    
    soma = 0;
    for(i = 11, j = 0; i >= 2; i--, j++){
        soma += parseInt(cpfInt[j]*i);
    }

    soma *= 10;
    soma %= 11;

    if(soma == 10 || soma == 1)
        soma = 0;
    if(soma != parseInt(cpfInt[10]))
        return 0;   //cpf invalido

    return 1;   //cpf valido
}

// post cadastro supervisor
router.post('/cadastro', (req, res) => {
    var cpf = req.body.cpf;
    var senha = req.body.senha;

    if(!cpf_validation(cpf) || senha.lenght < 6){ // validação cpf e tamanho da senha
        res.json({
            message: "cpf e/ou senha invalidos"
        });
    }
    else{
        var cpfExist = supervisor_controler.findSupervisorByCpf(cpf); // retorna null se cpf não existir

        var resposta = '';
        if(cpfExist == null){ 
            resposta = 'Cadastrar'; // cpf não consta na base de dados, pode ser cadastrado
        }
        else{
            resposta = 'CPF já cadastrado'; // Não pode cadastrar o mesmo cpf duas vezes
        }

        res.json({
            message: resposta
        });
    }
});

module.exports = router;