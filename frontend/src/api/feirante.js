import axios from 'axios';
const faker = require('faker');

const host = 'http://localhost:8080/feirante';

const categoria = await categoriaController.addCategoria('Alimento', false);
subcategoria = await categoria.createSubCategoria({ nome: 'Salgado' });

export async function testLogin() {
  const req = await axios.post('http://localhost:3000/login', {
    cpf: '07564166983',
    rg: '111111111',
    nome: 'Vaches',
    cnpj: '1111111111111',
    usa_ee: true,
    nome_fantasia: 'Algum Nome Fantasia',
    razao_social: 'Alguma Razão Social Nome LTDA',
    comprimento_barraca: 5,
    largura_barraca: 5,
    endereco: {
      logradouro: faker.address.streetAddress(),
      bairro: faker.address.secondaryAddress(),
      numero: 100,
      CEP: '87.303-065',
    },
    voltagem_ee: 110,
    sub_categoria_id: '0',
    senha: '123456'
  });

  const { token } = req.data.msg;
  localStorage.setItem('token', token);
}

export async function get() {
  return (await axios.get(host, {
    headers: { token: localStorage.getItem('token') },
  })).data;
}

export async function post(
    cpf,
    rg, 
    nome, 
    cnpj, 
    usa_ee, 
    nome_fantasia,
    razao_social,
    comprimento_barraca,
    largura_barraca,
    endereco,
    voltagem_ee,
    sub_categoria_id,
    senha) {
  await axios.post(host, {
    cpf,
    rg, 
    nome, 
    cnpj, 
    usa_ee, 
    nome_fantasia,
    razao_social,
    comprimento_barraca,
    largura_barraca,
    endereco,
    voltagem_ee,
    sub_categoria_id,
    senha
  });
}

export async function put(
    cpf,
    rg, 
    nome, 
    cnpj, 
    usa_ee, 
    nome_fantasia,
    razao_social,
    comprimento_barraca,
    largura_barraca,
    endereco,
    voltagem_ee,
    sub_categoria_id) {
  await axios.put(`${host}/${cpf}`, {
    rg, 
    nome, 
    cnpj, 
    usa_ee, 
    nome_fantasia,
    razao_social,
    comprimento_barraca,
    largura_barraca,
    endereco,
    voltagem_ee,
    sub_categoria_id
  });
}

export async function del(cpf) {
  axios.delete(`${host}/${cpf}`);
}