const API_URL = "https://qtutor-nestjs.herokuapp.com";
const DEFAULT_FILTER = {
  perPage: 12,
  page: 1,
  orderBy: JSON.stringify({ createdAt: "DESC" }),
  filter: JSON.stringify({}),
  customFilter: JSON.stringify({}),
};
const DEFAULT_QUERY_STRING = {
  perPage: 10,
  page: 1,
  orderBy: JSON.stringify({ createdAt: "DESC" }),
};
const DEFAULT_AVATAR =
  "https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg";

const ACADEMIC_ACTION = {
  Student: "Studying",
  "College Student": "Studying",
  Teacher: "Teaching",
  Master: "Teaching",
  Professor: "Teaching",
};

const TOAST_OPTIONS = {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// const WEB_CLIENT_URL = "https://qtutor-web-client.herokuapp.com";
const WEB_CLIENT_URL = "http://localhost:3000";

const SORTER_ORDER = {
  ascend: "ASC",
  descend: "DESC",
};

const ACADEMIC_LEVEL = {
  STUDENT: "Student",
  COLLEGE_STUDENT: "College Student",
  UNIVERSITY_STUDENT: "University Student",
  BACHELOR: "Bachelor",
  MASTER: "Master",
  PROFESSOR: "Professor",
};

const TUTOR_STUDENT_STATUS = {
  WAITING_TUTOR_ACCEPT: "Waiting Tutor Accept",
  WAITING_STUDENT_ACCEPT: "Waiting Student Accept",
  ACCEPTED: "Accepted",
  ARCHIVED: "Archived",
  CANCEL: "Cancel",
};

const DAY_OF_WEEKS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

module.exports = {
  API_URL,
  DEFAULT_FILTER,
  DEFAULT_AVATAR,
  ACADEMIC_LEVEL,
  ACADEMIC_ACTION,
  DEFAULT_QUERY_STRING,
  TOAST_OPTIONS,
  WEB_CLIENT_URL,
  SORTER_ORDER,
  DAY_OF_WEEKS,
  TUTOR_STUDENT_STATUS,
};
