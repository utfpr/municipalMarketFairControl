const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const keys = require('../config/keys.json');

const login = async (cpf, senha) => {
  let user = await models.supervisor.findOne({ where: { cpf } });

  if (user !== null) {
    if (await bcrypt.compare(senha, user.senha)) {
      return {
        token: jwt.sign(cpf, keys.jwt),
      };
    }

    return false;
  }

  user = await models.feirante.findOne({ where: { cpf } });

  if (user !== null) {
    if (await bcrypt.compare(senha, user.senha)) {
      return {
        token: jwt.sign(cpf, keys.jwt),
      };
    }

    return false;
  }

  return false;
};

module.exports = { login };
