import { axiosService } from "./axios";

class StudentAPI {
  async createStudent(data) {
    return await axiosService.post("/students", data);
  }

  async getMySuggestion(qs) {
    return await axiosService.get("/students/my-suggestions", qs);
  }

  async getMany(qs) {
    return await axiosService.get("./students", qs);
  }
}

const studentApi = new StudentAPI();
export default studentApi;
