import { Button, Form, Input, Modal, Space } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
import userApi from "../../../api/user.api";

class TransactionPaypalAccount extends Component {
  state = {
    isModalVisible: false,
    user: {},
  };

  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    this.setState({ user });
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
    await userApi.updateMe(values);
    window.location.reload();
  };

  render() {
    const { user } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Paypal Account
        </Button>
        <Modal
          title="Paypal Account"
          visible={this.state.isModalVisible}
          footer={[]}
        >
          <Form name="control-hooks" onFinish={this.onFinish}>
            <Form.Item
              name="paypalEmail"
              label="Paypal Email"
              initialValue={user?.paypalEmail}
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Not a valid email",
                },
              ]}
            >
              <Input defaultValue={user?.paypalEmail} />
            </Form.Item>

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

export default TransactionPaypalAccount;
