import { axiosService } from "./axios";

class TutorAPI {
  async getRatings(tutorId, qs) {
    return await axiosService.get(`/tutors/${tutorId}/ratings`, qs);
  }

  async createTutor(data) {
    return await axiosService.post("tutors", data);
  }

  async createRating(tutorId, data) {
    return await axiosService.post(`tutors/${tutorId}/ratings`, data);
  }

  async getRatedExamination(tutorId) {
    return await axiosService.get(`tutors/${tutorId}/rated-examination`);
  }
}

const tutorApi = new TutorAPI();
export default tutorApi;