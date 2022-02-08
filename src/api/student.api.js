import { axiosService } from "./axios";

class StudentAPI {
  async createStudent(data) {
    return await axiosService.post("/students", data);
  }
}

const studentApi = new StudentAPI();
export default studentApi;
