import { axiosService } from "./axios";

class AuthAPI {
  async register(data) {
    return await axiosService.post(`/auth/register`, data);
  }
}

const authApi = new AuthAPI();
export default authApi;
