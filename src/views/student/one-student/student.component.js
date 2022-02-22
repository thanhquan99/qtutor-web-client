import { Col, Divider, List, Row, Space } from "antd";
import React, { Component } from "react";
import { withAlert } from "react-alert";
import studentApi from "../../../api/student.api";
import TeachingRegistration from "../../../components/Offer-student";
import { DEFAULT_AVATAR } from "../../../constant";
import StudentPriceTable from "../student-price";
import StudentSchedule from "../student-schedule";
import "./student.css";

class Student extends Component {
  state = {
    currentStudent: {},
  };

  handleChange = (value) => {
    this.setState((curState) => ({ ...curState, value: value }));
  };

  componentDidMount = async () => {
    const res = await studentApi.getOne(this.props.match.params.id);
    if (res) {
      this.setState({ currentStudent: res });
    }
  };

  render() {
    const { currentStudent } = this.state;

    return (
      <div className="wrappers mt-3 view-student">
        <div className="centers">
          <Row>
            <h3>Student View</h3>
          </Row>
          <Row>
            <Col
              style={{
                boxShadow: "rgba(100, 100, 111, 0.15) 0px 5px 10px 0px",
                padding: "50px 60px",
                background: "white",
                marginRight: "25px",
              }}
              span={14}
            >
              <div className="" style={{ backgroundColor: "#FFFFFF" }}>
                <br />
                <Row>
                  <Col span={10}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className=""
                    >
                      <img
                        src={currentStudent?.profile?.avatar || DEFAULT_AVATAR}
                        alt="Admin"
                        className="rounded-circle"
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <b>{currentStudent?.profile?.name}</b>
                    </Row>
                    <Row>
                      <span>Live at {currentStudent?.profile?.city?.name}</span>
                    </Row>
                    <Row>
                      <span>{currentStudent?.description}</span>
                    </Row>
                    <Row>
                      <Space>
                        <TeachingRegistration
                          student={this.state.currentStudent}
                        />
                      </Space>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Divider orientation="left">Free Time</Divider>
                  <StudentSchedule
                    schedule={this.state.currentStudent?.schedules}
                  />
                </Row>
              </div>
            </Col>

            <Col span={9}>
              <div
                className="container"
                style={{
                  boxShadow: "rgba(100, 100, 111, 0.15) 0px 5px 10px 0px",
                  // padding: "50px 60px",
                  background: "white",
                }}
              >
                <Row>
                  <Divider orientation="left">Desire To Learn</Divider>
                  <List
                    size="small"
                    dataSource={currentStudent?.studentSubjects}
                    renderItem={(e) => (
                      <List.Item key={e.subject?.id}>
                        {e.subject?.name}
                      </List.Item>
                    )}
                  />
                </Row>
                <Row>
                  <Divider orientation="left">Desired Price</Divider>
                </Row>
                <Row>
                  <StudentPriceTable student={this.state.currentStudent} />
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withAlert()(Student);
