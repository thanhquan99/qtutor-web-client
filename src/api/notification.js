import axios from './axios'
export const getlistNotifi = (page) => axios.get(`/notifications/me?page=${page}&perPage=5&orderBy=%7B%22createdAt%22%3A%20%22DESC%22%7D`)
export const getNotifiNumber = () => axios.get("/notifications/me/summary")
export const readNotifi = (id, data) => axios.patch(`/notifications/${id}`, data)


