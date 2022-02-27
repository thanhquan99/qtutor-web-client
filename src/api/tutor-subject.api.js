import { axiosService } from "./axios";

class TutorSubjectAPI {
  async updateOne(id, data) {
    return await axiosService.patch(`/tutor-subjects/${id}`, data);
  }

  async createOne(data) {
    return await axiosService.post("/tutor-subjects", data);
  }

  async deleteOne(id) {
    return await axiosService.delete(`/tutor-subjects/${id}`);
  }
}

const tutorSubjectApi = new TutorSubjectAPI();
export default tutorSubjectApi;
