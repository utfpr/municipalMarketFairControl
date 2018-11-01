const Sequelize = require('sequelize');
const models = require('../models/');
const { proximaSexta } = require('./utils');

const op = Sequelize.Op;

const findFeira = async (dataFeira) => {
  const feira = await models.feira.findOne({
    where: { data: dataFeira.toISOString().split('T')[0] },
  });
  if (feira === null) return null;
  return feira;
};

const findFeiraAtual = async () => {
  const dataAtual = new Date();
  const nextData = new Date();
  dataAtual.setDate(dataAtual.getDate() - 1);
  nextData.setDate(nextData.getDate() + 7);

  // let hoje = dataAtual.getFullYear().toString();
  // hoje = hoje.concat('-', dataAtual.getMonth().toString(), '-', dataAtual.getDate().toString());
  // let prox = nextData.getFullYear().toString();
  // prox = prox.concat('-', nextData.getMonth().toString(), '-', nextData.getDate().toString());

  const hoje = dataAtual.toISOString().split('T')[0];
  const prox = nextData.toISOString().split('T')[0];

  const feira = await models.feira.findOne({
    // encontra a feira da semana
    where: {
      data: {
        [op.between]: [hoje, prox],
      },
    },
  });

  return feira;
};

const feiraAtualInfo = async () => {
  const feira = await findFeiraAtual();

  if (feira != null) {
    return {
      data: feira.data,
      status: feira.status,
    };
  }

  return null;
  // devolve a {data, status} da feira casa haja
  // senao retorna null
};

const addFeira = async (dataFeira) => {
  //  const data = date.slice(6, 10).concat('-', date.slice(3, 5), '-', date.slice(0, 2));

  // const feira = await models.feira.findOne({
  //   where: {
  //     data,
  //   },
  // });
  // console.log('aaaa')
  // if (feira != null) {
  //   return null;
  // }
  const status = true;
  try {
    return await models.feira.create({
      data: dataFeira.toISOString().split('T')[0],
      data_limite: proximaSexta().toISOString(),
      status,
    });
  } catch (error) {
    return null;
  }
  // adiciona uma feira no banco
  // se der certo retorna true
  // caso algum erro ocorra devolve null
};

const calcelaFeiraAtual = async () => {
  const feira = await findFeiraAtual();

  if (feira !== null) {
    const disable = await feira.update({ status: false });
    return disable;
  }

  return null;
  // cancelar a fiera atual
  // desativa
  // retorna null se der errado
};

module.exports = {
  findFeira,
  findFeiraAtual,
  feiraAtualInfo,
  addFeira,
  calcelaFeiraAtual,
};
