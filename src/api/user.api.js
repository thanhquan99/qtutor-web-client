import { axiosService } from "./axios";

class UserAPI {
  async updateMe(data) {
    return await axiosService.patch(`/users/me`, data);
  }
}

const userApi = new UserAPI();
export default userApi;
