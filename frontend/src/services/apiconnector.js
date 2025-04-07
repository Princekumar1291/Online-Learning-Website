import axios from 'axios';
const instance = axios.create({});


export const apiConnector = async (method, url, data,headers,params) => {
  return instance({
    method: method,
    url: url,
    data: data ? data : null,
    headers: headers ? headers : null,
    params: params ? params : null
  });
};