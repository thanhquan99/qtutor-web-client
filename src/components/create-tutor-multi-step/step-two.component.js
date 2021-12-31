import { Button, Col, Form, InputNumber, Row, Space } from "antd";
import React, { Component } from "react";
import { withAlert } from "react-alert";
import tutorService from "../../api-services/tutor.service";
import CreateTutorContext from "../../contexts/create-tutor.context";

class CreateTutorStepTwo extends Component {
  static contextType = CreateTutorContext;
  constructor(props) {
    super(props);

    this.onFinish = this.onFinish.bind(this);

    this.state = {};
  }

  async onFinish(values) {
    const { alert } = this.props;
    const { tutorSubjects } = this.context.payload;
    const teachingPrices = tutorSubjects?.map((e, index) => ({
      subjectId: e.subjectId,
      sessionsOfWeek: values[`sessionsOfWeek${index}`],
      price: values[`price${index}`],
    }));
    this.context.payload = {
      ...this.context.payload,
      teachingPrices,
      minimumSalary: values.minimumSalary,
    };
    console.log(this.context);
    delete this.context.payload?.subjects;
    const data = await tutorService.createTutor({
      component: this,
      alert,
      payload: this.context.payload,
    });
    if (data) {
      window.location.reload();
    }
  }

  render() {
    const { subjects } = this.context.payload;
    // const subjectIds = tutorSubjects?.map((e) => e.subjectId);
    return (
      <>
        <Row className="justify-content-md-center">
          <Col xs={12} className="justify-content-md-center border bg-light">
            <h3 className="text-primary text-center mb-4">Become a Tutor</h3>

            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinish}
              autoComplete="off"
              style={{ width: 500 }}
            >
              {subjects?.map((e, index) => (
                <div key={index}>
                  <strong className="m-5">{e}</strong>
                  <Form.Item
                    label="Sessions"
                    name={`sessionsOfWeek${index}`}
                    rules={[
                      {
                        required: true,
                        message: "Session is required",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: 200 }}
                      placeholder="days/week"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Price"
                    name={`price${index}`}
                    rules={[
                      {
                        required: true,
                        message: "price is required",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: 200 }}
                      placeholder="VND/month"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    />
                  </Form.Item>
                </div>
              ))}

              <Form.Item
                label="Expected salary"
                name="minimumSalary"
                rules={[
                  {
                    required: true,
                    message: "Expected salary is required",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: 200 }}
                  placeholder="VND/month"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space>
                  <Button
                    type="primary"
                    onClick={this.props.handlePreviousStep}
                  >
                    Previous
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Finish
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}

export default withAlert()(CreateTutorStepTwo);
