import { axiosService } from "./axios";

class StudentAPI {
  async createStudent(data) {
    return await axiosService.post("/students", data);
  }

  async getMySuggestion(qs) {
    return await axiosService.get("/students/my-suggestions", qs);
  }

  async getMany(qs) {
    return await axiosService.get("/students", qs);
  }

  async getOne(id) {
    return await axiosService.get(`/students/${id}`);
  }

  async getMe() {
    return await axiosService.get(`/students/me`);
  }

  async getMyLearnings(qs) {
    return await axiosService.get("/students/my-courses", qs);
  }

  async getMyLearningDetail(id) {
    return await axiosService.get(`/students/my-learnings/${id}/detail`);
  }
}

const studentApi = new StudentAPI();
export default studentApi;
