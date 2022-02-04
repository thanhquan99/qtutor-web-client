import { Button, Checkbox, Form, Modal, Select, Space } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
import transactionApi from "../../../api/transaction.api";
import eventBus from "../../../common/EventBus";

class TransactionModalEdit extends Component {
  state = {
    isModalVisible: false,
    isPayTypeVisible: false,
  };

  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  handleOk = () => {
    this.setState({ isModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  onChangePaid = (e) => {
    this.setState({ isPayTypeVisible: e.target.checked });
  };

  onFinish = async (values) => {
    const transaction = this.props.transaction;
    console.log(transaction);
    console.log(values);
    const data = await transactionApi.updateOne(values, transaction.id);
    if (data) {
      eventBus.dispatch("update-transaction", data);
    }
    this.handleOk()
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Edit
        </Button>
        <Modal title="Edit" visible={this.state.isModalVisible} footer={[]}>
          <Form name="control-hooks" onFinish={this.onFinish}>
            <Checkbox onChange={this.onChangePaid}>Paid</Checkbox>
            {this.state.isPayTypeVisible && (
              <Form.Item
                name="payType"
                label="Pay Type"
                rules={[{ required: true, message: "Select pay type" }]}
              >
                <Select
                  style={{ width: 120 }}
                  onChange={this.handleChangePayType}
                >
                  <Select.Option value="Transfer">Transfer</Select.Option>
                  <Select.Option value="Cash">Cash</Select.Option>
                </Select>
              </Form.Item>
            )}

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button type="cancel" onClick={this.handleCancel}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default TransactionModalEdit;
