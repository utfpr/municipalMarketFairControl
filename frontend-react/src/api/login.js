import axios from 'axios';

const host = 'http://localhost:3000/api/login';

export default function login(cpf, senha) {
  return axios.post(host, { cpf, senha });
}
