import { axiosService } from "./axios";

class TutorStudentAPI {
  async updateOne(id, data) {
    return await axiosService.patch(`/tutor-students/${id}`, data);
  }
}

const tutorStudentApi = new TutorStudentAPI();
export default tutorStudentApi;
