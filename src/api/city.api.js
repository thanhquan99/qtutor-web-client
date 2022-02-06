import { axiosService } from "./axios";

class CityAPI {
  async getMany(qs) {
    return await axiosService.get(`/cities`, qs);
  }
}

const cityApi = new CityAPI();
export default cityApi;
