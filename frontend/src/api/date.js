import axios from 'axios';

const host = `${process.env.REACT_APP_HOST}/date`;

export default async function getDate() {
    let r;
    await axios.get(host)
    .then(res =>{
        r = res.data
    })
    .catch(e => console.warn(e));
    
    return r;
  }