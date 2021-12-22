import axios from './axios'
export const getlistNotifi = (page) => axios.get(`/users/me/notifications?page=${page}&perPage=10`)
export const getNotifiNumber = () => axios.get("/users/me/notifications/summary")