const jwt = require('jsonwebtoken');
const feiranteController = require('../controllers/feirante');
const keys = require('../config/keys.json');

const isFeirante = async (req, res, next) => {
  const { token } = req.headers;
  if (token !== '') {
    try {
      const decoded = jwt.verify(token, keys.jwt);
      if (decoded !== null) {
        const feirante = await feiranteController.findFeiranteByCpf(decoded);

        if (feirante !== null) {
          req.cpf = decoded;
          return next();
        }

        return res.status(401).end();
      }
      return res.status(401).end();
    } catch (error) {
      return res.status(401).end();
    }
  }
  return res.status(401).end();
};

const isSupervisor = async (req, res, next) => {
  // todo
};

const isAdmin = async (req, res, next) => {
  // todo
};

module.exports = { isFeirante, isSupervisor, isAdmin };
