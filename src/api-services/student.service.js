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
  async getTutorSugggest({ component, alert }) {
    const response = await requestPN
      .get(API_URL + "/tutors/my-suggestions", { ...this.getAuth() })
      .catch((errorResponse) => {
        this.handleErrorApiWithAuth({ errorResponse, alert, component });
      });

    if (response) {
      const data = JSON.parse(response);
      return data;
    }
    return;
  }
  async getMany({ alert, qs }) {
    const response = await requestPN
      .get(API_URL + "/students", { qs, ...this.getAuth() })
      .catch((errorResponse) => {
        this.handleErrorApi({ errorResponse, alert });
      });

    if (response) {
      const data = JSON.parse(response);
      return data;
    }
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
  async getOne({ alert, id }) {
    const response = await requestPN
      .get(API_URL + "/students/" + id)
      .catch((errorResponse) => {
        this.handleErrorApi({ errorResponse, alert });
      });

    if (response) {
      const data = JSON.parse(response);
      return data;
    }
  }
}

export default new StudentService();
