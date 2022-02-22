import { Col, List, Pagination, Row } from "antd";
import { Component } from "react";
import tutorApi from "../../../api/tutor.api";
import TutorCard from "../../../components/tutor/tutor-card/tutor-card.component";
import TutorsFilter from "../../../components/tutor/tutor-filter/tutors-filter.component";
import "./tutor-list.css";

class ListTutors extends Component {
  state = {
    tutors: [],
    total: 1,
    filter: {},
    page: 1,
    perPage: 12,
    customFilter: {},
  };

  componentDidMount = async () => {
    await this.fetchData();
  };

  fetchData = async () => {
    const { perPage, page, filter, customFilter } = this.state;
    const res = await tutorApi.getMany({
      perPage,
      page,
      filter: JSON.stringify(filter),
      customFilter: JSON.stringify(customFilter),
    });
    if (res) {
      this.setState({ tutors: res.results, total: res.total });
    }
  };

  onChangePage = async (page) => {
    await this.setState({ page });
    await this.fetchData();
  };

  handleFilter = async (filter = {}, customFilter = {}) => {
    await this.setState({ filter, page: 1, customFilter });
    await this.fetchData();
  };

  render() {
    return (
      <div className="mt-3">
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <TutorsFilter handleFilter={this.handleFilter} />
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <div className="mt-3 align-items-center text-center">
              <List
                grid={{ gutter: 12, column: 4 }}
                dataSource={this.state.tutors || []}
                renderItem={(tutor) => (
                  <List.Item>
                    <TutorCard tutor={tutor} />
                  </List.Item>
                )}
              />
              <Pagination
                total={this.state.total}
                onChange={this.onChangePage}
                defaultPageSize={12}
                current={this.state.page}
              />
            </div>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    );
  }
}

export default ListTutors;
