import { Form, Select } from "antd";
import React, { Component } from "react";
import subjectApi from "../../../api/subject.api";

class SubjectSearch extends Component {
  state = { subjects: [], filter: {}, orderBy: { name: "ASC" }, perPage: 5 };

  componentDidMount = async () => {
    await this.fetchData();
  };

  fetchData = async () => {
    const { filter, orderBy, perPage } = this.state;
    const { results: subjects } = await subjectApi.getMany({
      perPage,
      orderBy: JSON.stringify(orderBy),
      filter: JSON.stringify(filter),
    });
    this.setState({ subjects });
  };

  onSearchSubject = async (value) => {
    await this.setState({ filter: { name: { $ilike: value } } });
    await this.fetchData();
  };

  render() {
    const { subjects } = this.state;
    return (
      <Form.Item name="subjectId" label="Subject">
        <Select
          showSearch
          style={{ width: 120 }}
          placeholder="Select a subject"
          optionFilterProp="children"
          onSearch={this.onSearchSubject}
        >
          {subjects?.map((e) => (
            <Select.Option key={e.id} value={e.id}>
              {e.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
  }
}

export default SubjectSearch;
