const cpfCheck = require('cpf-check');
const cnpjCheck = require('cnpj');

const isCpf = cpf => cpfCheck.validate(cpfCheck.strip(cpf)).valid;
const isCnpj = cnpj => cnpjCheck.validate(cnpj);
const isEndereco = (endereco) => {
  if (
    endereco.logradouro === undefined
    || typeof endereco.logradouro !== 'string'
    || (endereco.logradouro.length < 1 || endereco.logradouro.length > 100)
  ) return false;

  if (
    endereco.bairro === undefined
    || typeof endereco.bairro !== 'string'
    || (endereco.bairro.length < 1 || endereco.bairro.length > 100)
  ) return false;

  if (endereco.numero === undefined || typeof endereco.numero !== 'number') return false;

  if (endereco.cep === undefined || typeof endereco.cep !== 'string' || endereco.cep.length !== 10) return false;

  return true;
};

module.exports = { isCpf, isCnpj, isEndereco };
