import axios from 'axios';

const host = 'http://localhost:3000/api/participa/';

export async function setPosicao(cpf, celula) {
  alert(`cpf ${cpf} celula ${celula}`);
}

export async function getConfirmados() {
  const info = await axios.get(`${host}confirmados`, {
    headers: { token: localStorage.getItem('token') },
  });
  return info === null ? null : info.data;
}
