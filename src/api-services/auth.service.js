import axios from "axios";
import { API_URL } from "../constant";
import requestPN from "request-promise-native";
import ApiService from "./api.service";

class AuthService extends ApiService {
  async login({payload, alert, userContext}) {
    const response = await requestPN
      .post(API_URL + "/auth/login", { form: payload })
      .catch((errResponse) => {
        this.handleErrorApi(errResponse, alert);
      });

    if (response) {
      console.log(userContext);
      const data = JSON.parse(response);
      userContext.email = data.user.email;
      return data;      
    }
    return;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
