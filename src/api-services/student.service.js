import { API_URL } from "../constant";
import requestPN from "request-promise-native";
import ApiService from "./api.service";

class StudentService extends ApiService {
  async getMe({ component, alert }) {
    const response = await requestPN
      .get(API_URL + "/students/me", { ...this.getAuth() })
      .catch((errorResponse) => {
        this.handleErrorApiWithAuth({ errorResponse, alert, component });
      });

    if (response) {
      const data = JSON.parse(response);
      return data;
    }
    return;
  }

  async createStudent({ component, alert, payload }) {
    const response = await requestPN
      .post(API_URL + "/students", { ...this.getAuth(), json: payload })
      .catch((errorResponse) => {
        this.handleErrorApiWithAuth({ errorResponse, alert, component });
      });

    if (response) {
      return response;
    }
    return;
  }
}

export default new StudentService();
