import axios from './axios'
export const getlistNotifi = (page) => axios.get(`/users/me/notifications?page=${page}&perPage=5`)
export const getNotifiNumber = () => axios.get("/users/me/notifications/summary")
export const readNotifi = (id, data) => axios.patch(`/notification/${id}`, data)
export const registerTutor = (data) => axios.post("/students/me/tutor-students",data)


