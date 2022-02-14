import { Button, Form, InputNumber, Modal, Input, Space } from "antd";
import { Component } from "react";
import tutorSubjectApi from "../../../api/tutor-subject.api";
import eventBus from "../../../common/EventBus";
import SubjectSelection from "../../../components/helper/form-selections/subject-selection.component";

class ModalCreateTeaching extends Component {
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
    console.log(values);
    const res = await tutorSubjectApi.createOne(values);
    if (res) {
      eventBus.dispatch("create-tutor-subject", res);
    }
  };

  render() {
    return (
      <>
        <Button size="small" onClick={this.showModal}>
          Create
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
            <SubjectSelection />

            <Form.Item
              label="Money Offered"
              name="price"
              rules={[{ required: true, message: "Required" }]}
            >
              <InputNumber
                style={{ width: "250px" }}
                placeholder="VND/lesson"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>

            <Form.Item
              label="Sessions"
              name="sessionsOfWeek"
              placeholder="lessons/week"
              rules={[{ required: true, message: "Required" }]}
            >
              <InputNumber style={{ width: 200 }} placeholder="days/week" />
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

export default ModalCreateTeaching;
