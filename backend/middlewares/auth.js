const jwt = require('jsonwebtoken');
const feiranteController = require('../controllers/feirante');
const supervisorController = require('../controllers/supervisor');
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
  const { token } = req.headers;
  if (token !== '') {
    try {
      const decoded = jwt.verify(token, keys.jwt);
      if (decoded !== null) {
        const supervisor = await supervisorController.findSupervisorByCpf(decoded);

        if (supervisor !== null) {
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

const isFeiranteOrSupervisor = async (req, res, next) => {
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

        const supervisor = await supervisorController.findSupervisorByCpf(decoded);

        if (supervisor !== null) {
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

const isAdmin = async (req, res, next) => {
  const { token } = req.headers;
  if (token !== '') {
    try {
      const decoded = jwt.verify(token, keys.jwt);
      if (decoded !== null) {
        const supervisor = await supervisorController.findSupervisorByCpf(decoded);

        if (supervisor !== null && supervisor.is_adm === 1) {
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

module.exports = { isFeirante, isSupervisor, isFeiranteOrSupervisor, isAdmin };
