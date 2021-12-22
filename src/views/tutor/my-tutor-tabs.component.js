import _ from "lodash";
import React, { Component } from "react";
import { withAlert } from "react-alert";
import { Container, Tab, Tabs } from "react-bootstrap";
import tutorService from "../../api-services/tutor.service";
import { CreateTutorProvider } from "../../contexts/create-tutor.context";
import CreateTutor from "./create-tutor.component";
import MyStudents from "./my-students.component";
import MyTutorProfile from "./my-tutor-profile.component";
import { Spin } from "antd";

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
      <Container>
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
      </Container>
    );
  }
}

export default withAlert()(MyTutorTabs);
