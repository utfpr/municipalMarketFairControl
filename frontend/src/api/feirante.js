import axios from 'axios';

const host = 'http://localhost:3000/api/feirante';

export async function get() {
  const data = await axios
    .get(host, { headers: { token: localStorage.getItem('token') } })
    .catch(() => null)
    .then(record => record.data);

  return data.map(record => ({
    ...record,
    cpf: record.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4'),
  }));
}

export async function getByCpf(cpf) {
  const record = (await axios.get(`${host}/${cpf}`, {
    headers: { token: localStorage.getItem('token') },
  })).data;
  return { ...record, cpf: record.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4') };
}

export async function post(
  cpf,
  cnpj,
  nome,
  rg, 
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
  await axios.post(
    host, {
      cpf,
      cnpj,
      nome,
      rg,   
      usa_ee, 
      nome_fantasia,
      razao_social,
      comprimento_barraca,
      largura_barraca,
      endereco,
      voltagem_ee,
      sub_categoria_id,
      senha,
    },
    { headers: { token: localStorage.getItem('token') } },
  );
}

export async function put(
  cpf,
  cnpj,
  nome,
  rg, 
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
    cnpj,
    nome,
    rg, 
    usa_ee, 
    nome_fantasia,
    razao_social,
    comprimento_barraca,
    largura_barraca,
    endereco,
    voltagem_ee,
    sub_categoria_id,
  }, { headers: { token: localStorage.getItem('token') } });
}

export async function del(cpf) {
  axios.delete(`${host}/${cpf}`, { headers: { token: localStorage.getItem('token') } });
}