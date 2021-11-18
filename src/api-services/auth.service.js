import { API_URL } from "../constant";
import requestPN from "request-promise-native";
import ApiService from "./api.service";

class AuthService extends ApiService {
  async login({ payload, alert }) {
    const response = await requestPN
      .post(API_URL + "/auth/login", { form: payload })
      .catch((errorResponse) => {
        this.handleErrorApi({ errorResponse, alert });
      });

    if (response) {
      const data = JSON.parse(response);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      return data;
    }
    return;
  }

  async register({ payload, alert }) {
    const response = await requestPN
      .post(API_URL + "/auth/register", { form: payload })
      .catch((errorResponse) => {
        this.handleErrorApi({ errorResponse, alert });
      });

    if (response) {
      const successResponse = JSON.parse(response);
      this.handlerSuccessApi({ successResponse, alert });
      return successResponse;
    }
    return;
  }

  async verifyEmail({ payload, alert }) {
    const response = await requestPN
      .post(API_URL + "/auth/verify-email", { form: payload })
      .catch((errorResponse) => {
        this.handleErrorApi({ errorResponse, alert });
      });

    if (response) {
      const successResponse = JSON.parse(response);
      this.handlerSuccessApi({ successResponse, alert });
      return successResponse;
    }
    return;
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
