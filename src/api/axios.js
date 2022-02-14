import axios from "axios";
import queryString from "query-string";
import { toast } from "react-toastify";
import { API_URL, TOAST_OPTIONS } from "../constant";
const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  paramsSerializer: (params) => {
    return queryString.stringify(params, {
      encode: false,
    });
  },
});
instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
export default instance;

export class AxiosService {
  instance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      paramsSerializer: (params) => {
        return queryString.stringify(params, {
          encode: false,
        });
      },
    });

    this.instance.interceptors.request.use(async (config) => {
      const token = localStorage.getItem("accessToken");
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => {
        if (response && response.data) {
          return response.data;
        }
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  async get(url, qs = {}) {
    const stringified = queryString.stringify(qs);
    const data = await this.instance
      .get(`${url}/?${stringified}`)
      .catch((err) => {
        const {
          response: {
            data: { message },
          },
        } = err;
        toast.error(message?.[0] || message, TOAST_OPTIONS);
      });
    return data;
  }

  async post(url, data) {
    const res = await this.instance.post(url, data).catch((err) => {
      const {
        response: {
          data: { message },
        },
      } = err;
      toast.error(message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });

    if (res) {
      toast.success("Success", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return res;
    }
  }

  async patch(url, data) {
    const res = await this.instance.patch(url, data).catch((err) => {
      const {
        response: {
          data: { message },
        },
      } = err;
      toast.error(message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });

    if (res) {
      toast.success("Success", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return res;
    }
  }

  async delete(url) {
    const res = await this.instance.delete(url).catch((err) => {
      const {
        response: {
          data: { message },
        },
      } = err;
      toast.error(message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });

    if (res) {
      toast.success("Delete successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return res;
    }
  }
}

export const axiosService = new AxiosService();
