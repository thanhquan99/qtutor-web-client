import { Button, Form, Input, Modal, Space } from "antd";
import { Component } from "react";
import { IoMdAdd } from "react-icons/io";
import tutorExperienceApi from "../../../api/tutor-experience.api";

class ModalCreateExperience extends Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onFinish = async (values) => {
    this.setState({ visible: false });
    const res = await tutorExperienceApi.createOne(values);
    if (res) {
      this.props.handleCreateExperience(res);
    }
  };

  render() {
    return (
      <>
        <Button size="small" onClick={this.showModal}>
          <IoMdAdd />
        </Button>
        <Modal
          title="Create Teaching"
          visible={this.state.visible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          footer={[]}
          centered
        >
          <Form
            name="basic"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 10 }}
            onFinish={this.onFinish}
          >
            <Form.Item
              label="Title"
              name="title"
              placeholder="Title"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input.TextArea
                placeholder="Description"
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button onClick={this.handleCancel}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default ModalCreateExperience;
