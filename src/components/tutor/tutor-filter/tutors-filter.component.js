import { Button, Col, Form, Row } from "antd";
import React from "react";
import { searchFields } from "./search-fields";

const TutorFilter = (props) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    await props.handleFilter({}, values);
  };

  const onClear = async () => {
    form.resetFields();
    await props.handleFilter();
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>{searchFields}</Row>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button style={{ margin: "0 8px" }} onClick={onClear}>
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TutorFilter;
