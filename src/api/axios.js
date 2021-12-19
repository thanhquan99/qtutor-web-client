import axios from 'axios'
import queryString from 'query-string';
import {API_URL} from '../constant'
const instance = axios.create({
  baseURL: API_URL, 
  headers: {
    'content-type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Credentials': true,
  },
  paramsSerializer: params => {
    return queryString.stringify(params, {
      encode: false,
    });
  },
})
instance.interceptors.request.use(async config => {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  response => {
    if (response && response.data) { 
      return response.data;
    }
    return response;
  },
  error => {
    throw error;
  },
);
export default instance