import { axiosService } from "./axios";

class StudentSubjectAPI {
  async updateOne(id, data) {
    return await axiosService.patch(`/student-subjects/${id}`, data);
  }

  async createOne(data) {
    return await axiosService.post("/student-subjects", data);
  }
}

const studentSubjectApi = new StudentSubjectAPI();
export default studentSubjectApi;
