import axios from 'axios';

const host = `${process.env.REACT_APP_HOST}/login`;

export default function login(cpf, senha) {
  return axios.post(host, { cpf, senha });
}
