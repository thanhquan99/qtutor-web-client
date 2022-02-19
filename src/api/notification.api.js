import { axiosService } from "./axios";

class NotificationAPI {
  async getMyNotifications(qs) {
    return await axiosService.get("/notifications/me", qs);
  }

  async updateOne(id, data){
    return await axiosService.patch(`/notifications/${id}`, data);
  }
}

const notificationApi = new NotificationAPI();
export default notificationApi;
