import { Form, Select } from "antd";
import React, { Component } from "react";
import cityApi from "../../../api/city.api";

class CitySearch extends Component {
  state = { cities: [], filter: {}, orderBy: { name: "ASC" }, perPage: 5 };

  componentDidMount = async () => {
    await this.fetchData();
  };

  fetchData = async () => {
    const { filter, orderBy, perPage } = this.state;
    const { results: cities } = await cityApi.getMany({
      perPage,
      orderBy: JSON.stringify(orderBy),
      filter: JSON.stringify(filter),
    });
    this.setState({ cities });
  };

  onSearchCity = async (value) => {
    await this.setState({ filter: { name: { $ilike: value } } });
    await this.fetchData();
  };

  render() {
    const { cities } = this.state;
    return (
      <Form.Item name="cityId" label="City">
        <Select
          showSearch
          style={{ width: 120 }}
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
    );
  }
}

export default CitySearch;
