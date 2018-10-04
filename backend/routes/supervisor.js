const express = require('express');
const router = express.Router();

const supervisor_controler = require('../controllers/superviror');

router.get('/cadastro', (req, res) => {
    res.json({
        message: "Cadastro Supervisor"
    });
});