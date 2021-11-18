export default class ApiService {
  handleErrorApi({ errorResponse, alert }) {
    const err = JSON.parse(errorResponse.error);
    alert.show(err.message);
  }

  handlerSuccessApi({ successResponse, alert }) {
    alert.show(successResponse.message);
  }

  handleErrorApiWithAuth({ errorResponse, alert, component }) {
    const err = JSON.parse(errorResponse.error);
    if (err.statusCode === 401) {
      component.props.history.push("/login");
      const token = JSON.parse(localStorage.getItem("accessToken"));
      if (token) {
        alert.show("Token expired");
      }
      return;
    }
    alert.show(err.message);
  }

  getAuth() {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    return { auth: { bearer: token } };
  }
}
