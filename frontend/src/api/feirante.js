import axios from 'axios';

const host = 'http://localhost:3000/api/feirante';

// export async function testLogin() {
//   const req = await axios.post('http://localhost:3000/login', {
//     cpf: '56662192007',
//     senha: '123456',
//   });

//   const { token } = req.data.msg;
//   localStorage.setItem('token', token);
// }

// export async function get() {
//   return (await axios.get(host, {
//     headers: { token: localStorage.getItem('token') },
//   })).data;
// }

export async function get() {
  return (await axios.get(host), { headers: { token: localStorage.getItem('token') } }).data;
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
  senha,
) {
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
    senha,
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
  sub_categoria_id,
) {
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
    sub_categoria_id,
  });
}

export async function del(cpf) {
  axios.delete(`${host}/${cpf}`);
}
