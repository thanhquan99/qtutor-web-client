import { Form, Select } from "antd";
import React, { Component } from "react";

class GenderSearch extends Component {
  state = {};

  render() {
    return (
      <Form.Item name="isMale" label="Gender">
        <Select
          style={{ width: 120 }}
          placeholder="Select a gender"
          optionFilterProp="children"
        >
          <Select.Option value={true}>Boy</Select.Option>
          <Select.Option value={false}>Girl</Select.Option>
        </Select>
      </Form.Item>
    );
  }
}

export default GenderSearch;
