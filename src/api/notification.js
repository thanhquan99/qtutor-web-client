import axios from './axios'
export const getlistNotifi = () => axios.get("/users/me/notifications")
export const getNotifiNumber = () => axios.get("/users/me/notifications/summary")