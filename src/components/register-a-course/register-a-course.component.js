import { Button, Form, InputNumber, Modal, Select, Space } from "antd";
import { Component } from "react";
import { withAlert } from "react-alert";
import {registerTutor} from "../../api/notification"
import { toast } from 'react-toastify';

class RegisterACourse extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.state = {
      visible: false,
    };
  }

  async componentDidMount() {
  }

  showModal() {
    this.setState({ visible: true });
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  onFinish(values) {
    this.setState({ visible: false });
    const data ={
      salary: values.salary,
      tutorId: this.props.tutor.id,
      subjectId: values.subjectName
    }
    registerTutor(data)
      .then((response) => {
        toast.success('success!', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
      .catch((response) => {
        toast.error('mon nay da dang ky', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
  }

  render() {
    const { tutor } = this.props;
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Register
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
              label="Money Offered"
              name="salary"
              rules={[{ required: true, message: "Money Offered is required" }]}
            >
              <InputNumber
                style={{ width: '250px' }}
                placeholder="VND/month"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>

            <Form.Item
              label="Subject"
              name="subjectName"
              rules={[{ required: true, message: "Select a subject" }]}
            >
              <Select
               style={{ width: '250px' }}
                showSearch
                placeholder="Select a subject"
                optionFilterProp="children"
                // onChange={onChange}
              >
                {tutor?.subjects?.map((e, index) => (
                  <Select.Option key={index} value={e.id}>
                    {e.name}
                  </Select.Option>
                ))}
              </Select>
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

export default withAlert()(RegisterACourse);