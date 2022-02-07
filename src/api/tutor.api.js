import { axiosService } from "./axios";

class TutorAPI {
  async getRatings(tutorId, qs) {
    return await axiosService.get(`/tutors/${tutorId}/ratings`, qs);
  }

  async createTutor(data){
    return await axiosService.post('tutors', data)
  }
}

const tutorApi = new TutorAPI();
export default tutorApi;
