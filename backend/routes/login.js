const { body, validationResult } = require('express-validator/check');
const express = require('express');
const bcrypt = require('bcrypt');
const { isCpf } = require('./utils');
const loginController = require('../controllers/login');

const router = express.Router();

router.post(
  '/',
  [
    body('cpf').custom(isCpf),
    body('senha')
      .isString()
      .isLength({ min: 6, max: 100 }),
  ],
  async (req, res) => {
    if (!validationResult(req).isEmpty()) return res.status(400).send();

    const { cpf, senha } = req.body;

    const info = await loginController.login(cpf, senha);

    if (info !== null) {
      return res.json({ userID: cpf, token: info.token, tag: info.tag });
    }
    return res.status(401).send();
  },
);

module.exports = router;
