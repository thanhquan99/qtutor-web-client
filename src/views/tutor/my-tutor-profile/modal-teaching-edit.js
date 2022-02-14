import { Button, Form, InputNumber, Modal, Input, Space } from "antd";
import { Component } from "react";
import tutorSubjectApi from "../../../api/tutor-subject.api";
import eventBus from "../../../common/EventBus";

class ModalTeachingEdit extends Component {
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
    const { tutorSubject } = this.props;

    const res = await tutorSubjectApi.updateOne(tutorSubject.id, {
      ...values,
      price: parseInt(values.price),
    });
    if (res) {
      eventBus.dispatch("update-tutor-subject", res);
    }
  };

  render() {
    const { tutorSubject } = this.props;
    return (
      <>
        <Button size="small" onClick={this.showModal}>
          Edit
        </Button>
        <Modal
          title="Edit Teaching"
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
              <Input disabled defaultValue={tutorSubject?.subject?.name} />
            </Form.Item>

            <Form.Item
              label="Money Offered"
              name="price"
              rules={[{ required: true, message: "Money Offered is required" }]}
              initialValue={tutorSubject?.price}
            >
              <InputNumber
                style={{ width: "250px" }}
                placeholder="VND/lesson"
                defaultValue={tutorSubject?.price}
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
              initialValue={tutorSubject?.sessionsOfWeek}
            >
              <InputNumber
                style={{ width: 200 }}
                defaultValue={tutorSubject?.sessionsOfWeek}
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

export default ModalTeachingEdit;
