import "antd/dist/antd.css";
import React, { Component } from "react";
import { FaCcPaypal } from "react-icons/fa";
import transactionApi from "../../../api/transaction.api";
import { WEB_CLIENT_URL } from "../../../constant";
import { withRouter } from "react-router-dom";

class TransactionPaypalPayment extends Component {
  state = {
    isModalVisible: false,
    isPayTypeVisible: false,
  };

  handleCreatePaypalPayment = async () => {
    const transaction = this.props.transaction;
    const { paypalPaymentUrl } = await transactionApi.createPaypalPayment(
      {
        returnUrl: `${WEB_CLIENT_URL}/transactions/me/${transaction.id}/paypal/payment/callback`,
        cancelUrl: `${WEB_CLIENT_URL}/transactions/me`,
      },
      transaction.id
    );
    if (paypalPaymentUrl) {
      window.open(paypalPaymentUrl, "_self", "noopener,noreferrer");
    }
  };

  render() {
    return (
      <>
        <FaCcPaypal
          style={{ width: 50, height: "100%" }}
          onClick={this.handleCreatePaypalPayment}
        />
      </>
    );
  }
}

export default withRouter(TransactionPaypalPayment);
