import { Button } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { WEB_CLIENT_URL } from "../../../constant";

class TransactionIcon extends Component {
  gotoMyTransactions = async () => {
    window.open(`${WEB_CLIENT_URL}/transactions/me`, "_self");
  };

  render() {
    return (
      <div className="grop-number">
        <Button onClick={this.gotoMyTransactions}>
          <FaMoneyBill style={{ width: 50, height: "100%" }} />
        </Button>

        {true ? (
          <div className="chil">
            <span>{10}</span>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TransactionIcon;
