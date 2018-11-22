const models = require('../models');

const celulas = [
  {
    id: 1,
    y: 0.065,
    x: 0.135,
    comprimento: 0.018,
    largura: 0.023,
    periodo: 1,
  },
  {
    id: 2,
    y: 0.098,
    x: 0.135,
    comprimento: 0.034,
    largura: 0.045,
    periodo: 1,
  },
  {
    id: 3,
    y: 0.16,
    x: 0.135,
    comprimento: 0.044,
    largura: 0.05,
    periodo: 1,
  },
  {
    id: 4,
    y: 0.26,
    x: 0.24,
    comprimento: 0.044,
    largura: 0.05,
    periodo: 1,
  },
  {
    id: 5,
    y: 0.315,
    x: 0.24,
    comprimento: 0.044,
    largura: 0.05,
    periodo: 1,
  },
  {
    id: 6,
    y: 0.37,
    x: 0.24,
    comprimento: 0.044,
    largura: 0.05,
    periodo: 1,
  },
  {
    id: 7,
    y: 0.425,
    x: 0.24,
    comprimento: 0.044,
    largura: 0.05,
    periodo: 1,
  },
  {
    id: 8,
    y: 0.48,
    x: 0.24,
    comprimento: 0.044,
    largura: 0.05,
    periodo: 1,
  },
  {
    id: 9,
    y: 0.53,
    x: 0.19,
    comprimento: 0.044,
    largura: 0.05,
    periodo: 1,
  },
  {
    id: 10,
    y: 0.57,
    x: 0.13,
    comprimento: 0.044,
    largura: 0.05,
    periodo: 1,
  },
  {
    id: 11,
    y: 0.625,
    x: 0.13,
    comprimento: 0.044,
    largura: 0.05,
    periodo: 1,
  },
];

const insert_celulas = async () => {
  celulas.forEach((celula) => {
    models.celula.create(celula);
  });
};

module.exports = { insert_celulas };
