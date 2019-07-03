import axios from 'axios';

const host = `${process.env.REACT_APP_HOST}/participa`;

export async function setPosicao(cpf, celula) {
  const res = await axios.post(`${host}/posicao`, {
    cpf_feirante: Number(cpf), celula_id: celula, force: 0,
  }, {
    headers: { token: localStorage.getItem('token') },
  });
  return res ? res.data : [];
}

export async function getConfirmados() {
  const info = await axios.get(`${host}/confirmados`, {
    headers: { token: localStorage.getItem('token') },
  });
  return info ? info.data : [];
}

export async function setPeriodo(periodo) {
  const info = await axios.post(`${host}/confirma`, {
    periodo,
  }, {
    headers: { token: localStorage.getItem('token') },
  });
  return info ? info.data : {};
}

export async function cancelaParticipacao() {
  const info = await axios.post(`${host}/cancela`, {}, {
    headers: { token: localStorage.getItem('token') },
  });
  return info ? info.data : {};
}

export async function getParticipa(data){
  const feirantes = await axios.get(`${host}/${data}`).catch(e => console.log(`Erro ${e}`));
  return feirantes;
}

export async function getParticipacaoUltimaFeira(){
  const participacao = await axios.get(`${host}/participacao`, {}, {
    headers: { token: localStorage.getItem('token') },
  }).catch(e => console.log(`Erro ${e}`));
  return participacao;
}
