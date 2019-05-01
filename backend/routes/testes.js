const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth');

// Rota de teste que necessita ter feirante autenticado
router.post('/feirante', authMiddleware.isFeirante, (req, res) => {
  res.status(200).send({ cpf: req.cpf });
});

// Rota de teste que necessita ter supervisor autenticado
router.post('/supervisor', authMiddleware.isSupervisor, (req, res) => {
  res.status(200).send({ cpf: req.cpf });
});

// Rota de teste que necessita ter administrador autenticado
router.post('/administrador', authMiddleware.isAdmin, (req, res) => {
  res.status(200).send({ cpf: req.cpf });
});

module.exports = router;
