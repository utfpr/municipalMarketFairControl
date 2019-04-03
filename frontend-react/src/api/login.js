import axios from 'axios';
import { strip } from 'cpf-check';

const host = 'http://localhost:3000/api/login';

export default async function login(cpf, senha) {
  const info = await axios.post(host, { cpf: strip(cpf), senha }).catch(() => null);
  return info === null ? null : info.data;
}
