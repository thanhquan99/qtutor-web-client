import { axiosService } from "./axios";

class TutorAPI {
  async getRatings(tutorId, qs) {
    return await axiosService.get(`/tutors/${tutorId}/ratings`, qs);
  }
}

const tutorApi = new TutorAPI();
export default tutorApi;
