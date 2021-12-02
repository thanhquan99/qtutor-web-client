import { Component } from "react";
import { withAlert } from "react-alert";
import tutorService from "../../api-services/tutor.service";
import TutorAPIContext from "../../contexts/tutor-api.context";
import { List, Pagination } from "antd";
import TutorCard from "./tutor-card.component";

class ListTutors extends Component {
  static contextType = TutorAPIContext;
  constructor(props) {
    super(props);
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      tutors: [],
      total: 1,
    };
  }

  async componentDidMount() {
    const { alert } = this.props;
    const { results: tutors, total } = await tutorService.getMany({
      alert,
      qs: { perPage: 12 },
    });
    this.setState((curState) => ({ ...curState, tutors, total }));
    console.log(this.state);
  }

  async onChangePage(page) {
    const { alert } = this.props;
    const { results: tutors, total } = await tutorService.getMany({
      alert,
      qs: { perPage: 12, page },
    });
    this.setState((curState) => ({ ...curState, tutors, total }));
  }

  render() {
    return (
      <div className="mt-3 pd-3 align-items-center text-center">
        <List
          grid={{ gutter: 12, column: 3 }}
          dataSource={this.state.tutors || []}
          renderItem={(tutor) => (
            <List.Item>
              <TutorCard tutor={tutor}/>
            </List.Item>
          )}
        />
        <Pagination
          total={this.state.total}
          onChange={this.onChangePage}
          defaultPageSize={12}
        />
      </div>
    );
  }
}

export default withAlert()(ListTutors);
