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
      .post(API_URL + "/tutors", { ...this.getAuth(), json: payload })
      .catch((errorResponse) => {
        this.handleErrorApiWithAuth({ errorResponse, alert, component });
      });
    if (response) {
      const data = JSON.parse(response);
      return data;
    }
  }

  async getMany({ alert, qs }) {
    const response = await requestPN
      .get(API_URL + "/tutors", { qs })
      .catch((errorResponse) => {
        this.handleErrorApi({ errorResponse, alert });
      });

    if (response) {
      const data = JSON.parse(response);
      return data;
    }
  }

  async getOne({ alert, id }) {
    const response = await requestPN
      .get(API_URL + "/tutors/" + id)
      .catch((errorResponse) => {
        this.handleErrorApi({ errorResponse, alert });
      });

    if (response) {
      const data = JSON.parse(response);
      return data;
    }
  }
}

export default new TutorService();
