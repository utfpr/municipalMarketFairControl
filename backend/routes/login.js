/* eslint-disable */

const express = require('express');
const router = express.Router();

const login_controller = require('../controllers/login');
/*
    Verificar se o cpf enviado é válido
*/
var cfp_validation = (cpf_string) => {
    
    if (cpf_string === "00000000000") return 0;

    var soma = 0;
    var cpf_splited = cpf_string.split('');

    for (var i = 10, j = 0; i >= 2; --i, ++j) {
        soma += parseInt(cpf_splited[j]) * i;
    }
    soma *= 10;
    var resto = soma % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf_splited[9])){ 
        return 0;
    }

    soma = 0;   
    for (var i = 11, j = 0; i >= 2; --i, ++j) {
        soma += parseInt(cpf_splited[j]) * i;
    }
    soma *= 10;
    var resto = soma % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf_splited[10])){ 
        return 0;
    }
    // console.log(soma, resto);
    return 1;

}


router.get('/', (req, res) => { // get da pagina de login
    res.json({
        message: "login page" // login page, é preciso definir
    });
});

router.post('/', async (req, res) => { // enviar os dados para verificacao

    var cpf = req.body.cpf; // login com cpf
    var senha = req.body.senha;  // senha

    if (!cfp_validation(cpf) || (senha.length < 6)) { // verifica se o cpf é valido e a senha é grando o suficiente
        res.json({
            message: "cpf invalido ou senha invalida"
        });
    } 
    else if (cfp_validation(cpf) || senha.length >= 6){
        var token = await login_controller.login(cpf, senha); // coleta token do controller (supervisor ou feirante)

        var resposta = '';
        if (token !== false) { // reuniao com o grupo para definir as coisas
            resposta = "falta confirmaçao do grupo"
            // a definir
        } else { // caso nao encontre usuario
            reaposta = "usuario nao cadastrado";
        }

        res.json({
            message: resposta
        });
    }

});

module.exports = router;
