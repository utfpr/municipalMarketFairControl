const bcrypt = require('bcrypt');
const models = require('../models');

const addSupervisor = async (cpf, nome, senha, isAdm) => {
  const hashSenha = await bcrypt.hash(senha, 10);
  const supervisor = await models.supervisor.findOne({ where: { cpf, status: true } });

  if (supervisor !== null) return false;

  try {
    await models.supervisor.create({
      cpf,
      nome,
      senha: hashSenha,
      is_adm: isAdm,
    });
    return true;
  } catch (error) {
    return false;
  }
};

const listSupervisor = async () => {
  const supervisores = await models.supervisor.findAll({
    where: {
      status: true,
    },
    attributes: {
      exclude: ['senha'],
    },
  });

  return supervisores.map(el => ({ cpf: el.cpf, nome: el.nome, is_adm: el.is_adm }));
};

const findSupervisorByCpf = async (cpf) => {
  const supervisor = await models.supervisor.findOne({
    where: {
      cpf,
      status: true,
    },
    attributes: {
      exclude: ['senha'],
    },
  });

  if (supervisor === null) return false;

  return { cpf: supervisor.cpf, nome: supervisor.nome, is_adm: supervisor.is_adm };
};

const deleteSupervisor = async (cpf) => {
  const supervisor = await models.supervisor.findOne({ where: { cpf, status: true } });
  if (supervisor === null) return false;

  await supervisor.update({ status: false });
  return true;
};

module.exports = {
  addSupervisor,
  listSupervisor,
  findSupervisorByCpf,
  deleteSupervisor,
};
