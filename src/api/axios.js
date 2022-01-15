import axios from 'axios'
import queryString from 'query-string';
import { toast } from 'react-toastify';
import {API_URL, TOAST_OPTIONS} from '../constant'
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

export class AxiosService{
  instance

  constructor(){
    this.instance = axios.create({
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

    this.instance.interceptors.request.use(async config => {
      const token = localStorage.getItem("accessToken");
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    
    this.instance.interceptors.response.use(
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
  }

  async get(url, qs){
    const stringified = queryString.stringify(qs);
    const data = await this.instance.get(`${url}/?${stringified}`).catch((err)=>{
      toast.error(err.message, TOAST_OPTIONS);
    });
    return data;
  }
}

export const axiosService = new AxiosService()