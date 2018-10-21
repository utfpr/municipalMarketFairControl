const CPF = require('cpf-check');
const express = require('express');
const router = express.Router();
const login_controller = require('../controllers/login');

router.get('/', (req, res) => { // get da pagina de login
    res.json({
        message: "ok" // login page, é preciso definir
    });
});

router.post('/', async (req, res) => { // enviar os dados para verificacao

    var cpf = req.body.cpf; // login com cpf
    var senha = req.body.senha;  // senha

    const cpfValido = CPF.validate(CPF.strip(cpf));
    if (cpfValido.code === 'INVALID' || cpfValido.code === 'LENGTH' || senhaS.lenght < 6) { // verifica se o cpf é valido e a senha é grando o suficiente
        res.status(400)
    } 
    else {
        var token = await login_controller.login(cpf, senha); // coleta token do controller (supervisor ou feirante)

        var resposta = '';
        if (token !== false) { // reuniao com o grupo para definir as coisas
            res.status(200).send({
                msg: token,
            });
        } else {
            res.status(401);
        }
    }
});

module.exports = router;
