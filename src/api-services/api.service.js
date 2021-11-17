export default class ApiService {
  handleErrorApi(errorResponse, alert) {
    const err = JSON.parse(errorResponse.error);
    alert.show(err.message);
  }

  handlerSuccessApi(successResponse, alert) {
    alert.show(successResponse.message);
  }
}
