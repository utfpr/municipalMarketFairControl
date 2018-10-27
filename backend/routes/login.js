const CPF = require('cpf-check');
const express = require('express');
const router = express.Router();
const login_controller = require('../controllers/login');

router.get('/', (req, res) => { // get da pagina de login
    res.json({
        message: "ok" // login page, é preciso definir
    });
});

// Realiza login feirante/supervisor 
router.post('/', async (req, res) => {

    var cpf = req.body.cpf;
    var senha = req.body.senha;

    const cpfValido = CPF.validate(CPF.strip(cpf));
    if (cpfValido.code === 'INVALID' || cpfValido.code === 'LENGTH' || senha.lenght < 6) { // verifica se o cpf é valido e a senha é grande o suficiente
        res.status(400)
    } 
    else {
        var token = await login_controller.login(cpf, senha); // coleta token do controller (supervisor ou feirante)

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
