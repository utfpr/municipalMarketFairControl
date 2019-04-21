import axios from 'axios';

const host = 'http://localhost:3000/api/participa';

export async function setPosicao(cpf, celula) {
  const res = await axios.post(`${host}/posicao`, {
    cpf_feirante: cpf, celula_id: celula, force: 1,
  }, {
    headers: { token: localStorage.getItem('token') },
  });
}

export async function getConfirmados() {
  const info = await axios.get(`${host}/confirmados`, {
    headers: { token: localStorage.getItem('token') },
  });
  return info ? info.data : [];
}

export default async function getParticipa(data){
  const feirantes = await axios.get(`${host}/${data}`).catch(e => console.log(`Erro ${e}`));
  return feirantes;
}
