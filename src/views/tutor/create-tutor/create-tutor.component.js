import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";
import _ from "lodash";
import React, { Component } from "react";
import subjectApi from "../../../api/subject.api";
import tutorApi from "../../../api/tutor.api";
import { WEB_CLIENT_URL } from "../../../constant";

class CreateTutor extends Component {
  state = {
    subjects: [],
  };

  componentDidMount = async () => {
    const { results: subjects } = await subjectApi.getMany({
      perPage: 5,
      page: 1,
      orderBy: JSON.stringify({ name: "ASC" }),
    });
    await this.setState({ subjects });
  };

  onSearchSubject = async (value) => {
    if (_.isEmpty(value)) {
      return;
    }
    const filter = { name: { $ilike: value } };
    const { results: subjects } = await subjectApi.getMany({
      perPage: 5,
      page: 1,
      orderBy: JSON.stringify({ name: "ASC" }),
      filter: JSON.stringify(filter),
    });

    await this.setState({ subjects });
  };

  onFinish = async (values) => {
    console.log("Received values of form:", values);
    const res = await tutorApi.createTutor(values)
    if(res){
      window.open(`${WEB_CLIENT_URL}/tutors/me`, "_self");
    }
  };

  render() {
    return (
      <div className="login">
        <Row xs={12} className="justify-content-md-center">
          <Col
            xs={12}
            className="justify-content-md-center border border-light"
            style={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              padding: "50px 60px",
              background: "white",
              margin: "40px 0",
            }}
          >
            <h2
              className="text-center text-primary"
              style={{ margin: "0 0 40px 0" }}
            >
              Become A Tutor
            </h2>

            <Form
              name="dynamic_form_nest_item"
              onFinish={this.onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Years Experience"
                name="yearsExperience"
                rules={[{ required: true, message: "Invalid", type: "number" }]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Expected Salary"
                name="minimumSalary"
                rules={[
                  {
                    required: true,
                    message: "price is required",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: 200 }}
                  placeholder="VND/lesson"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>

              <Form.Item
                label="About your teaching"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "price is required",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Description"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>

              <Form.List
                name="tutorSubjects"
                rules={[
                  {
                    validator: async (_, tutorSubjects) => {
                      if (!tutorSubjects || tutorSubjects.length < 1) {
                        return Promise.reject(new Error("At least 1 subject"));
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "subjectId"]}
                          rules={[
                            { required: true, message: "Missing subject" },
                          ]}
                        >
                          <Select
                            showSearch
                            style={{ width: 200 }}
                            optionFilterProp="children"
                            placeholder="Select subject"
                            onSearch={this.onSearchSubject}
                          >
                            {this.state.subjects?.map((subject, index) => (
                              <Select.Option key={index} value={subject.id}>
                                {subject.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "sessionsOfWeek"]}
                          rules={[
                            { required: true, message: "Missing sessions" },
                          ]}
                        >
                          <InputNumber
                            style={{ width: 200 }}
                            placeholder="days/week"
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "price"]}
                          rules={[{ required: true, message: "Missing price" }]}
                        >
                          <InputNumber
                            style={{ width: 200 }}
                            placeholder="VND/lesson"
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          />
                        </Form.Item>

                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Subject
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CreateTutor;
