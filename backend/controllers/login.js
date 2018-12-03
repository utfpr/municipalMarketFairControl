const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const keys = require('../config/keys.json');

const login = async (cpf, senha) => {
  let user = await models.supervisor.findOne({ where: { cpf } });

  if (user !== null) {
    if (await bcrypt.compare(senha, user.senha)) {
      return {      
        tag: user.is_adm ? 'administrador' : 'supervisor',
        token: jwt.sign(cpf, keys.jwt),
      };
    }

    return null;
  }

  user = await models.feirante.findOne({ where: { cpf } });

  if (user !== null) {
    if (await bcrypt.compare(senha, user.senha)) {
      return {
        tag: 'feirante',
        token: jwt.sign(cpf, keys.jwt),
      };
    }

    return null;
  }

  return null;
};

module.exports = { login };
