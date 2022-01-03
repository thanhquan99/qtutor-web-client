import axios from './axios'
export const myTeachings = (page) => axios.get(`tutors/my-teachings?page=${page}&perPage=10`)
