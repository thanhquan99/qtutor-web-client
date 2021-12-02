import { API_URL } from "../constant";
import requestPN from "request-promise-native";
import ApiService from "./api.service";

class UserService extends ApiService {
  async getMe({ component, alert }) {
    const response = await requestPN
      .get(API_URL + "/users/me", { ...this.getAuth() })
      .catch((errorResponse) => {
        this.handleErrorApiWithAuth({ errorResponse, alert, component });
      });

    if (response) {
      const data = JSON.parse(response);
      return data;
    }
    return;
  }

  async updateMe({ component, alert, payload }) {
    const response = await requestPN
      .patch(API_URL + "/users/me", { ...this.getAuth(), json: payload })
      .catch((errorResponse) => {
        this.handleErrorApiWithAuth({ errorResponse, alert, component });
      });
    if (response) {
      return response;
    }
    return;
  }
}

export default new UserService();
