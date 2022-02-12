import { axiosService } from "./axios";

class AppConfigAPI {
  async getAppConfig() {
    return await axiosService.get('/app-config');
  }
}

const appConfigApi = new AppConfigAPI();
export default appConfigApi;
