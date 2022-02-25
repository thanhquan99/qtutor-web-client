import { Spin } from "antd";
import _ from "lodash";
import React, { Component } from "react";
import { withAlert } from "react-alert";
import { Tab, Tabs } from "react-bootstrap";
import studentService from "../../../api-services/student.service";
import CreateStudentView from "../../../views/student/create-student";
import MyLearnings from "../../../views/student/my-learnings/my-learnings.component";
import MyStudentProfile from "../../../views/student/my-student-profile/my-student-profile.component";
import MyTutors from "../../../views/student/my-tutors.component/my-tutors.component";

class MyStudentTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStudent: {},
      loadding: true,
    };
  }

  async componentDidMount() {
    this.setState((curState) => ({ ...curState, loadding: true }));
    const { alert } = this.props;
    const data = await studentService.getMe({ component: this, alert });
    this.setState((curState) => ({
      ...curState,
      currentStudent: data,
      loadding: false,
    }));
  }

  render() {
    return this.state.loadding ? (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
        className="spin"
      >
        <Spin />
      </div>
    ) : (
      <div className="main-tutor">
        {_.isEmpty(this.state.currentStudent) && <CreateStudentView />}
        {!_.isEmpty(this.state.currentStudent) && (
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="profile" title="Student Profile">
              <MyStudentProfile />
            </Tab>
            <Tab eventKey="tutors" title="Your courses">
              <MyLearnings />
            </Tab>
          </Tabs>
        )}
      </div>
    );
  }
}

export default withAlert()(MyStudentTabs);
