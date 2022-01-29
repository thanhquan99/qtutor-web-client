import { Button, Form, InputNumber, Modal, Select, Space } from "antd";
import { Component } from "react";
import { withAlert } from "react-alert";
import tutorService from "../../api-services/tutor.service";

class TeachingRegistration extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.state = {
      visible: false,
    };
  }

  async componentDidMount() {}

  showModal() {
    this.setState({ visible: true });
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  async onFinish(values) {
    this.setState({ visible: false });
    const data = {
      salary: values.salary,
      studentId: this.props.student.id,
      subjectId: values.subjectName,
      sessionsOfWeek: values.sessionsOfWeek,
    };
    await tutorService.registerTeaching(data);
  }

  render() {
    const { student } = this.props;
    console.log(this.props)
    return (
      <>
        <Button size='large' type="primary" onClick={this.showModal}>
          Offer
        </Button>
        <Modal
          title="Form Register"
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
              label="Subject"
              name="subjectName"
              rules={[{ required: true, message: "Select a subject" }]}
            >
              <Select
                style={{ width: "250px" }}
                showSearch
                placeholder="Select a subject"
                optionFilterProp="children"
                // onChange={onChange}
              >
                {student?.subjects?.map((e, index) => (
                  <Select.Option key={index} value={e.id}>
                    {e.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Money Offered"
              name="salary"
              rules={[{ required: true, message: "Money Offered is required" }]}
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
              rules={[{ required: true, message: "Sessions is required" }]}
            >
              <InputNumber style={{ width: 200 }} placeholder="days/week" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button size='large' type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button size="large" onClick={this.handleCancel}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default withAlert()(TeachingRegistration);
