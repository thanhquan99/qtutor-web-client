import "antd/dist/antd.css";
import React, { Component } from "react";
import queryString from "query-string";
import transactionApi from "../../../api/transaction.api";
import { WEB_CLIENT_URL } from "../../../constant";

class TransactionPaymentCallback extends Component {
  async componentDidMount() {
    const qs = queryString.parse(this.props.location.search);
    const id = this.props.match.params.id;
    const transaction = await transactionApi.executePaypalPayment(
      { paymentId: qs.paymentId, payerId: qs.PayerID },
      id
    );
    if (transaction) {
      window.open(`${WEB_CLIENT_URL}/transactions/me`, "_self");
    }
  }

  render() {
    return <div></div>;
  }
}

export default TransactionPaymentCallback;
