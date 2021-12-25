import { Col, List, Pagination, Row } from "antd";
import { Component } from "react";
import { withAlert } from "react-alert";
import studentService from "../../api-services/student.service";
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
    const { results: students, total } = await studentService.getMany({
      alert,
      qs: { perPage: 12 },
    });
    this.setState((curState) => ({ ...curState, students, total }));
    console.log(this.state, students, total);
  }

  async onChangePage(page) {
    const { alert } = this.props;
    const { results: students, total } = await studentService.getMany({
      alert,
      qs: { perPage: 12, page },
    });
    this.setState((curState) => ({ ...curState, students, total }));
  }

  async handleFilter() {
    const data = await studentService.getMany({
      alert,
      qs: this.context,
    });
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
          <Col span={3}></Col>
          <Col span={18}>
            <StudentsFilter handleFilter={this.handleFilter} />
          </Col>
          <Col span={3}></Col>
        </Row>
        <Row>
          <Col span={3}></Col>
          <Col span={18}>
            <div className="mt-3 align-items-center text-center">
              <List
                grid={{ gutter: 12, column: 2 }}
                dataSource={this.state.students || []}
                renderItem={(student) => (
                  <List.Item>
                    <StudentCard student={student} />
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
          <Col span={3}></Col>
        </Row>
      </div>
    );
  }
}

export default withAlert()(ListStudents);
