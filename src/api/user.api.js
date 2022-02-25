import { axiosService } from "./axios";

class UserAPI {
  async updateMe(data) {
    return await axiosService.patch(`/users/me`, data);
  }

  async getMe() {
    return await axiosService.get("/users/me");
  }
}

const userApi = new UserAPI();
export default userApi;
