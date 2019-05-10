import axios from 'axios';

const host = `${process.env.REACT_APP_HOST}/feirante`;

export async function get() {
  const data = await axios
    .get(host, { headers: { token: localStorage.getItem('token') } })
    .catch(() => null)
    .then(record => record.data);

  return data.map(record => ({
    ...record,
    cpf: record.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4'),
    cnpj: record.cnpj ? record.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5') : null,
    rg: record.rg ? record.rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/g, '$1.$2.$3-$4') : null,
  }));
}

export async function getByCpf(cpf) {
  const record = (await axios.get(`${host}/${cpf}`, {
    headers: { token: localStorage.getItem('token') },  
  })).data;
  return { ...record, 
    cpf: record.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4'), 
    cnpj: record.cnpj ? record.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5') : null,
    rg: record.rg ? record.rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/g, '$1.$2.$3-$4') : null,
    cep: record.endereco.cep.replace(/(\d{5})(\d{3})/g, '$1-$2')};
}

export async function getProfile(cpf) {
  const record = (await axios.get(`${host}/profile/${cpf}`, {
    headers: { token: localStorage.getItem('token') },  
  })).data;
  return { ...record, 
    cpf: record.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4'), 
    cnpj: record.cnpj ? record.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5') : null,
    rg: record.rg ? record.rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/g, '$1.$2.$3-$4') : null,
    cep: record.endereco.cep.replace(/(\d{5})(\d{3})/g, '$1-$2')};
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
      cpf: cpf.replace(/\D/g, ''),
      cnpj: cnpj.replace(/\D/g, ''),
      nome,
      rg: rg.replace(/\D/g, ''),
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
  console.log(cpf.replace(/\D/g, ''));
  await axios.put(`${host}/${cpf.replace(/\D/g, '')}`, {
    cnpj,
    nome, 
    rg, 
    usa_ee: usa_ee ? 1 : 0, 
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
