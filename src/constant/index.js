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

module.exports = {
  API_URL,
  DEFAULT_FILTER,
  DEFAULT_AVATAR,
};
