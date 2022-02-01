import { API_URL } from "../constant";
import requestPN from "request-promise-native";
import ApiService from "./api.service";
import { axiosService } from "../api/axios";

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
  async getStudentSugggest({ component, alert }) {
    const response = await requestPN
      .get(API_URL + "/students/my-suggestions", {
        ...this.getAuth(),
        qs: { perPage: 15, page: 1 },
      })
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
      return response;
    }
  }

  async getMany({ alert, qs }) {
    const response = await requestPN
      .get(API_URL + "/tutors", { qs, ...this.getAuth() })
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

  async registerTeaching(data) {
    return await axiosService.post("/tutors/my-teachings", data);
  }
}

export default new TutorService();
