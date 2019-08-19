import axios from 'axios';

const host = `${process.env.REACT_APP_HOST}/aviso`;

export async function get() {
    return (await axios.get(host)).data;
}

export async function getAvisosProximaFeira() {
    return (await axios.get(`${host}/proxima`)).data;
}

export async function post(assunto, texto, data_feira) {
    await axios.post(
        host,
        {
            assunto,
            texto,
            data_feira,
        },
        { headers: { token: localStorage.getItem('token') } },
    );
}

export async function put(id, assunto, texto, data_feira) {
    await axios.put(
        `${host}/${id}`,
        {
            assunto,
            texto,
            data_feira,
        },
        { headers: { token: localStorage.getItem('token') } },
    );
}

export async function getById(id) {
    const record = (await axios.get(
        `${host}/${id}`,
        { headers: { token: localStorage.getItem('token') } },
    )).data;

    return record;
}
export async function del(id) {
    await axios.delete(
        `${host}/${id}`,
        { headers: { token: localStorage.getItem('token') } },
    );
}
