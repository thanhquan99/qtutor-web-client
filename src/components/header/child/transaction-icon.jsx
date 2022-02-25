import { Button } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
import { FaMoneyBill } from "react-icons/fa";
import transactionApi from "../../../api/transaction.api";
import { WEB_CLIENT_URL } from "../../../constant";

class TransactionIcon extends Component {
  state = {
    totalUnpaidCount: 0,
  };

  componentDidMount = async () => {
    const res = await transactionApi.getMySummary();
    if (res) {
      this.setState({ totalUnpaidCount: parseInt(res.totalUnpaidCount) });
    }
  };

  gotoMyTransactions = async () => {
    window.open(`${WEB_CLIENT_URL}/transactions/me`, "_self");
  };

  render() {
    const { totalUnpaidCount } = this.state;
    return (
      <div className="grop-number">
        <Button onClick={this.gotoMyTransactions}>
          <FaMoneyBill style={{ width: 50, height: "100%" }} />
        </Button>

        {totalUnpaidCount ? (
          <div className="chil">
            <span>{totalUnpaidCount}</span>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TransactionIcon;
