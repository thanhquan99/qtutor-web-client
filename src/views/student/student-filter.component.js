import { Select, Input, Row, Space, Button } from "antd";
import _ from "lodash";
import React, { Component } from "react";
import cityService from "../../api-services/city.service";
import subjectService from "../../api-services/subject.service";
import TutorAPIContext from "../../contexts/tutor-api.context";

class UserFilter extends Component {
  static contextType = TutorAPIContext;
  constructor(props) {
    super(props);
    this.onEnterName = this.onEnterName.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onSearchCity = this.onSearchCity.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onSearchSubject = this.onSearchSubject.bind(this);

    this.reload = this.reload.bind(this);

    this.state = {
      cities: [],
      subjects: [],
    };
  }

  async componentDidMount() {
    const { alert } = this.props;
    const { results: cities } = await cityService.getMany({
      alert,
      qs: { perPage: 5 },
    });
    const { results: subjects } = await subjectService.getMany({
      alert,
      qs: { perPage: 5 },
    });
    this.setState((curState) => ({
      ...curState,
      cities,
      subjects,
    }));
  }

  onChangeName = (e) => {
    const name = e.target.value;
    this.context.customFilter = JSON.stringify({
      ...JSON.parse(this.context.customFilter),
      name,
    });
  };
  onEnterName = async (e) => {
    if (e.key === "Enter") {
      await this.props.handleFilter();
    }
  };

  onChangeGender(value) {
    if (typeof value !== "boolean") {
      this.context.customFilter = JSON.stringify({
        ...JSON.parse(this.context.customFilter),
        isMale: undefined,
      });
      return;
    }

    this.context.customFilter = JSON.stringify({
      ...JSON.parse(this.context.customFilter),
      isMale: value,
    });
  }

  onChangeCity(value) {
    this.context.customFilter = JSON.stringify({
      ...JSON.parse(this.context.customFilter),
      cityId: value,
    });
  }
  async onSearchCity(value) {
    const { alert } = this.props;
    if (_.isEmpty(value)) {
      return;
    }
    const filter = { name: { $ilike: value } };
    const { results: cities } = await cityService.getMany({
      alert,
      qs: { perPage: 5, filter: JSON.stringify(filter) },
    });
    this.setState((curState) => ({
      ...curState,
      cities,
    }));
  }

  onChangeSubject(value) {
    this.context.customFilter = JSON.stringify({
      ...JSON.parse(this.context.customFilter),
      subjectId: value,
    });
  }
  async onSearchSubject(value) {
    const { alert } = this.props;
    if (_.isEmpty(value)) {
      return;
    }
    const filter = { name: { $ilike: value } };
    const { results: subjects } = await subjectService.getMany({
      alert,
      qs: { perPage: 5, filter: JSON.stringify(filter) },
    });
    this.setState((curState) => ({
      ...curState,
      subjects,
    }));
  }

  reload() {
    window.location.reload();
  }

  render() {
    return (
      <div className="group-filter">
        <Input
          style={{ width: 280 }}
          size="large"
          placeholder="Name"
          onKeyDown={this.onEnterName}
          onChange={this.onChangeName}
        />
        <Select
          size="large"

          showSearch
          style={{ width: 280 }}
          placeholder="Select gender"
          optionFilterProp="children"
          onChange={this.onChangeGender}
        >
          <Select.Option value={"all"}>All</Select.Option>
          <Select.Option value={true}>Boy</Select.Option>
          <Select.Option value={false}>Girl</Select.Option>
        </Select>

        <Select
          showSearch
          size="large"

          style={{ width: 280 }}
          placeholder="Select a city"
          optionFilterProp="children"
          onChange={this.onChangeCity}
          onSearch={this.onSearchCity}
        >
          {this.state.cities?.map((city) => (
            <Select.Option key={city.id} value={city.id}>
              {city.name}
            </Select.Option>
          ))}
        </Select>

        <Select
          size="large"

          showSearch
          style={{ width: 280 }}
          placeholder="Select a subject"
          optionFilterProp="children"
          onChange={this.onChangeSubject}
          onSearch={this.onSearchSubject}
        >
          {this.state.subjects?.map((subject) => (
            <Select.Option key={subject.id} value={subject.id}>
              {subject.name}
            </Select.Option>
          ))}
        </Select>

        <Button size="large" type="primary" onClick={this.props.handleFilter}>
          Filter
        </Button>
        <Button size="large" danger onClick={this.reload}>
          Clear Filter
        </Button>
      </div>
    );
  }
}

export default UserFilter;
