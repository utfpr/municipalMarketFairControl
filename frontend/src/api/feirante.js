import axios from 'axios';

const host = 'http://localhost:8080/feirante';

export async function get() {
  return (await axios.get(host)).data;
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
    voltagem_ee,
    status,
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
    voltagem_ee,
    status,
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
    voltagem_ee,
    status,
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
    voltagem_ee,
    status,
    sub_categoria_id
  });
  }

export async function del(cpf) {
  axios.delete(`${host}/${cpf}`);
}