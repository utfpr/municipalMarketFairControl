const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth');

// Rota de teste que necessita ter feirante autenticado
router.post('/token-feirante', authMiddleware.isFeirante, (req, res) => {
  res.send(req.cpf);
});

// Rota de teste que necessita ter supervisor autenticado
router.post('/token-supervisor', authMiddleware.isSupervisor, (req, res) => {
  res.send(req.cpf);
});

// Rota de teste que necessita ter administrador autenticado
router.post('/token-admin', authMiddleware.isAdmin, (req, res) => {
  res.send(req.cpf);
});

module.exports = router;
