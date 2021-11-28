import { API_URL } from "../constant";
import requestPN from "request-promise-native";
import ApiService from "./api.service";

class TutorService extends ApiService {
  async getMe({ component, alert }) {
    const response = await requestPN
      .get(API_URL + "/tutors/me", { ...this.getAuth() })
      .catch((errorResponse) => {
        this.handleErrorApiWithAuth({ errorResponse, alert, component });
      });

    if (response) {
      const data = JSON.parse(response);
      return data;
    }
    return;
  }

  async createTutor({ component, alert, payload }) {
    const response = await requestPN
      .post(API_URL + "/tutors", { ...this.getAuth(), form: payload })
      .catch((errorResponse) => {
        this.handleErrorApiWithAuth({ errorResponse, alert, component });
      });

    if (response) {
      const data = JSON.parse(response);
      return data;
    }
    return;
  }
}

export default new TutorService();
