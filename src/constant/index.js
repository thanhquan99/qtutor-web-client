const API_URL = "https://qtutor-nestjs.herokuapp.com";
const DEFAULT_FILTER = {
  perPage: 12,
  page: 1,
  orderBy: JSON.stringify({ createdAt: "DESC" }),
  filter: JSON.stringify({}),
  customFilter: JSON.stringify({}),
};
const DEFAULT_AVATAR =
  "https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg";

const ACADEMIC_LEVEL = {
  STUDENT: "Student",
  COLLEGE_STUDENT: "College Student",
  TEACHER: "Teacher",
  MASTER: "Master",
  PROFESSOR: "Professor",
};

const ACADEMIC_ACTION = {
  Student: "Studying",
  "College Student": "Studying",
  Teacher: "Teaching",
  Master: "Teaching",
  Professor: "Teaching",
};

module.exports = {
  API_URL,
  DEFAULT_FILTER,
  DEFAULT_AVATAR,
  ACADEMIC_LEVEL,
  ACADEMIC_ACTION,
};
