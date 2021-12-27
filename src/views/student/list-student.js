import { Col, List, Pagination, Row } from "antd";
import { Component } from "react";
import { withAlert } from "react-alert";
import StudentService from "../../api-services/student.service";
import StudentAPIContext from "../../contexts/student-api-context";
import StudentCard from "./student-cart";
import StudentsFilter from "./student-filter.component";
import "./student-list.css"
class ListStudents extends Component {
  static contextType = StudentAPIContext;
  constructor(props) {
    super(props);
    this.onChangePage = this.onChangePage.bind(this);
    this.handleFilter = this.handleFilter.bind(this);

    this.state = {
      students: [],
      total: 1,
    };
  }

  async componentDidMount() {
    const { alert } = this.props;
    const { results: students, total } = await StudentService.getMany({
      alert,
      qs: { perPage: 12 },
    });
    this.setState((curState) => ({ ...curState, students, total }));
    console.log(this.state, students, total);
  }

  async onChangePage(page) {
    const { alert } = this.props;
    const { results: students, total } = await StudentService.getMany({
      alert,
      qs: { perPage: 12, page },
    });
    this.setState((curState) => ({ ...curState, students, total }));
  }

  async handleFilter() {
    const data = await StudentService.getMany({
      alert,
      qs: this.context,
    });
    console.log(data,"data")
    this.setState((curState) => ({
      ...curState,
      students: data.results,
      total: data.total,
    }));
  }

  render() {
    return (
      <div className="mt-3">
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <StudentsFilter handleFilter={this.handleFilter} />
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <div className="mt-3 align-items-center text-center">
              <List
                grid={{ gutter: 12, column: 3 }}
                dataSource={this.state.students || []}
                renderItem={(students) => (
                  <List.Item>
                    <StudentCard students={students} />
                  </List.Item>
                )}
              />
              <Pagination
                total={this.state.total}
                onChange={this.onChangePage}
                defaultPageSize={12}
              />
            </div>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    );
  }
}

export default withAlert()(ListStudents);