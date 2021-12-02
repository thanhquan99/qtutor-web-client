import { API_URL } from "../constant";
import requestPN from "request-promise-native";
import ApiService from "./api.service";

class CityService extends ApiService {
  async getMany({ alert, qs }) {
    const response = await requestPN
      .get(API_URL + "/cities", { qs })
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

export default new CityService();
