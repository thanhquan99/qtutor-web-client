
export default class ApiService{
  handleErrorApi(errResponse, alert){
    const err = JSON.parse(errResponse.error);
    alert.show(err.message);
  }
}