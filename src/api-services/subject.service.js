import { API_URL } from "../constant";
import requestPN from "request-promise-native";
import ApiService from "./api.service";

class SubjectService extends ApiService {
  async getMany({ alert }) {
    const response = await requestPN
      .get(API_URL + "/subjects", { qs: { perPage: 100 } })
      .catch((errorResponse) => {
        this.handleErrorApi({ errorResponse, alert });
      });

    if (response) {
      const data = JSON.parse(response);
      return data;
    }
    return;
  }
}

export default new SubjectService();
