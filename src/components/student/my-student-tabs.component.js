import _ from "lodash";
import React, { Component } from "react";
import { withAlert } from "react-alert";
import { Container, Tab, Tabs } from "react-bootstrap";
import studentService from "../../api-services/student.service";
import CreateStudent from "./create-student.component";
import MyStudentProfile from "./my-student-profile.component";
import MyTutors from "./my-tutors.component";

class MyStudentTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStudent: {},
    };
  }

  async componentDidMount() {
    const { alert } = this.props;
    const data = await studentService.getMe({ component: this, alert });
    this.setState((curState) => ({
      ...curState,
      currentStudent: data,
    }));
  }

  render() {
    return (
      <Container>
        {_.isEmpty(this.state.currentStudent) && <CreateStudent />}
        {!_.isEmpty(this.state.currentStudent) && (
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="profile" title="Student Profile">
              <MyStudentProfile />
            </Tab>
            <Tab eventKey="tutors" title="Your Tutors">
              <MyTutors />
            </Tab>
          </Tabs>
        )}
      </Container>
    );
  }
}

export default withAlert()(MyStudentTabs);