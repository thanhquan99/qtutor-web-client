import queryString from "query-string";
import { DEFAULT_QUERY_STRING } from "../constant";
import axios, { axiosService } from "./axios";

export const getMySchedules = async (qs = DEFAULT_QUERY_STRING) => {
  return await axiosService.get("/schedules/me", qs);
};

export const createSchedule = async (data) => {
  return await axiosService.post("/schedules", data)
};

export const getTeaching = (qs = DEFAULT_QUERY_STRING) => {
  const stringified = queryString.stringify(qs);
  return axios.get(`/users/me?${stringified}`);
};

export const deleteSchedule = async (id) => {
  return axiosService.delete(`/schedules/${id}`);
};
