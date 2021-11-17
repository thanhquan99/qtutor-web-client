import { API_URL } from "../constant";
import requestPN from "request-promise-native";
import ApiService from "./api.service";

class AuthService extends ApiService {
  async login({ payload, alert }) {
    const response = await requestPN
      .post(API_URL + "/auth/login", { form: payload })
      .catch((errResponse) => {
        this.handleErrorApi(errResponse, alert);
      });

    if (response) {
      const data = JSON.parse(response);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    }
    return;
  }

  async register({ payload, alert }) {
    const response = await requestPN
      .post(API_URL + "/auth/register", { form: payload })
      .catch((errResponse) => {
        this.handleErrorApi(errResponse, alert);
      });

    if (response) {
      const data = JSON.parse(response);
      this.handlerSuccessApi(data, alert);
      return data;
    }
    return;
  }

  async verifyEmail({ payload, alert }) {
    const response = await requestPN
      .post(API_URL + "/auth/verify-email", { form: payload })
      .catch((errResponse) => {
        this.handleErrorApi(errResponse, alert);
      });

    if (response) {
      const data = JSON.parse(response);
      this.handlerSuccessApi(data, alert);
      return data;
    }
    return;
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
