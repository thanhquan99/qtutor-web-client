import { Spin } from "antd";
import _ from "lodash";
import React, { Component } from "react";
import { withAlert } from "react-alert";
import { Tab, Tabs } from "react-bootstrap";
import tutorService from "../../api-services/tutor.service";
import { CreateTutorProvider } from "../../contexts/create-tutor.context";
import CreateTutor from "../../views/tutor/create-tutor/create-tutor.component";
import MyStudents from "../../views/tutor/my-students/my-students.component";
import MyTutorProfile from "../../views/tutor/my-tutor-profile/my-tutor-profile.component";

class MyTutorTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTutor: {},
      loadding: true,
    };
  }

  async componentDidMount() {
    this.setState((curState) => ({ ...curState, loadding: true }));
    const { alert } = this.props;
    const data = await tutorService.getMe({ component: this, alert });
    this.setState((curState) => ({
      ...curState,
      currentTutor: data,
      loadding: false
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
         {_.isEmpty(this.state.currentTutor) && (
          <CreateTutorProvider value={{}}>
            <CreateTutor />
          </CreateTutorProvider>
        )}
        {!_.isEmpty(this.state.currentTutor) && (
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="profile" title="Tutor Profile">
              <MyTutorProfile />
            </Tab>
            <Tab eventKey="students" title="Your Students">
              <MyStudents />
            </Tab>
          </Tabs>
        )}
      </div>
    );
  }
}

export default withAlert()(MyTutorTabs);