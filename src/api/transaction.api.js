import { DEFAULT_QUERY_STRING } from "../constant";
import { axiosService } from "./axios";

class TransactionAPI {
  async getMyTransactions(qs = DEFAULT_QUERY_STRING) {
    return await axiosService.get("/transactions/me", qs);
  }

  async updateOne(data, id) {
    return await axiosService.patch(`/transactions/${id}`, data);
  }

  async createPaypalPayment(data, id) {
    return await axiosService.post(`/transactions/${id}/paypal/payment`, data);
  }

  async executePaypalPayment(data, id){
    return await axiosService.post(`/transactions/${id}/paypal/execution`, data);
  }
}

const transactionApi = new TransactionAPI();
export default transactionApi;
