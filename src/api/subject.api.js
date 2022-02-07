import { axiosService } from "./axios";

class SubjectAPI {
  async getMany(qs) {
    return await axiosService.get("/subjects", qs);
  }
}

const subjectApi = new SubjectAPI();
export default subjectApi;
