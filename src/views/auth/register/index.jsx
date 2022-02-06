import { Button, Col, Form, Input, Row, Select } from "antd";
import _ from "lodash";
import React, { Component } from "react";
import authApi from "../../../api/auth.api";
import cityApi from "../../../api/city.api";
import { ACADEMIC_LEVEL } from "../../../constant";

class AuthRegisterView extends Component {
  state = {
    cities: [],
  };

  componentDidMount = async () => {
    const { results: cities } = await cityApi.getMany({
      perPage: 5,
      orderBy: JSON.stringify({ name: "ASC" }),
    });
    await this.setState({ cities });
  };

  onFinish = async (values) => {
    const res = await authApi.register(values);
    if (res) {
      this.props.history.push("/verify-email");
    }
  };

  onSearchCity = async (value) => {
    if (_.isEmpty(value)) {
      return;
    }

    const filter = { name: { $ilike: value } };
    const { results: cities } = await cityApi.getMany({
      perPage: 5,
      orderBy: JSON.stringify({ name: "ASC" }),
      filter: JSON.stringify(filter),
    });
    await this.setState({ cities });
  };

  render() {
    const { cities } = this.state;
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
              Register
            </h2>

            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Invalid email", type: "email" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Gender"
                name="isMale"
                rules={[{ required: true, message: "Select your gender" }]}
              >
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select gender"
                  optionFilterProp="children"
                >
                  <Select.Option value={true}>Boy</Select.Option>
                  <Select.Option value={false}>Girl</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="City"
                name="cityId"
                rules={[{ required: true, message: "Select your city" }]}
              >
                <Select
                  showSearch
                  size="large"
                  style={{ width: 290 }}
                  placeholder="Select a city"
                  optionFilterProp="children"
                  onSearch={this.onSearchCity}
                >
                  {cities?.map((city) => (
                    <Select.Option key={city.id} value={city.id}>
                      {city.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Academic Level"
                name="academicLevel"
                rules={[
                  { required: true, message: "Select your academic level" },
                ]}
              >
                <Select
                  showSearch
                  size="large"
                  style={{ width: 290 }}
                  placeholder="Select your academic level"
                  optionFilterProp="children"
                >
                  {Object.values(ACADEMIC_LEVEL).map((e, index) => (
                    <Select.Option key={index} value={e}>
                      {e}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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

export default AuthRegisterView;
