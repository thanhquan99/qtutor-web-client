import { DEFAULT_QUERY_STRING } from "../constant";
import axios from "./axios";
import queryString from 'query-string';
export const getMySchedules = (qs = DEFAULT_QUERY_STRING) => {
  const stringified = queryString.stringify(qs);
  return axios.get(`/schedules/me?${stringified}`);
};
export const createSchedule = (data) => axios.post("/schedules",data)
export const getTeaching = (qs = DEFAULT_QUERY_STRING) => {
  const stringified = queryString.stringify(qs);
  return axios.get(`/students/me?${stringified}`);
};
