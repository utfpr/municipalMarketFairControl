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

export default async function getParticipa(data){
  let a = "10/10/2018"
  const feirantes = await axios.get(`${host}/:${data}`).catch(e => console.log(`Erro ${e}`));
  return feirantes.data;
}
