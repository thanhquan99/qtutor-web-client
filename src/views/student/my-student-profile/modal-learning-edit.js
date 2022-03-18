import { Button, Form, Input, InputNumber, Modal, Space } from "antd";
import { Component } from "react";
import studentSubjectApi from "../../../api/student-subject.api";
import eventBus from "../../../common/EventBus";

class ModalLearningEdit extends Component {
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
    const { studentSubject } = this.props;

    const res = await studentSubjectApi.updateOne(studentSubject.id, {
      ...values,
      price: parseInt(values.price),
    });
    if (res) {
      eventBus.dispatch("update-student-subject", res);
    }
  };

  render() {
    const { studentSubject } = this.props;
    return (
      <>
        <Button size="small" onClick={this.showModal}>
          Edit
        </Button>
        <Modal
          title="Edit Learning"
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
            <Form.Item label="Subject">
              <Input disabled defaultValue={studentSubject?.subject?.name} />
            </Form.Item>

            <Form.Item
              label="Money Offered"
              name="price"
              rules={[{ required: true, message: "Money Offered is required" }]}
              initialValue={studentSubject?.price}
            >
              <InputNumber
                style={{ width: "250px" }}
                placeholder="VND/lesson"
                defaultValue={studentSubject?.price}
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
              rules={[{ required: true, message: "Sessions is required" }]}
              initialValue={studentSubject?.sessionsOfWeek}
            >
              <InputNumber
                style={{ width: 200 }}
                defaultValue={studentSubject?.sessionsOfWeek}
                placeholder="days/week"
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

export default ModalLearningEdit;
