import { axiosService } from "./axios";

class TutorExperienceAPI {
  async createOne(data) {
    return await axiosService.post("/tutor-experiences", data);
  }

  async deleteOne(id) {
    return await axiosService.delete(`/tutor-experiences/${id}`);
  }
}

const tutorExperienceApi = new TutorExperienceAPI();
export default tutorExperienceApi;
