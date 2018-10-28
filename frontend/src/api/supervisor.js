import axios from 'axios';

const host = 'http://localhost:3000/supervisor';

export async function get() {
  return (await axios.get(host)).data;
}

export async function post(cpf, nome, senha, isAdm) {
  await axios.post(host, {
    cpf,
    nome,
    senha,
    isAdm,
  });
}

export async function put(cpf, nome, isAdm) {
  await axios.put(`${host}/${cpf}`, {
    nome,
    isAdm,
  });
}

export async function del(cpf) {
  axios.delete(`${host}/${cpf}`);
}
