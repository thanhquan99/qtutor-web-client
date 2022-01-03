import axios from './axios'
export const myCourses = (page) => axios.get(`students/my-courses?page=${page}&perPage=10`)
