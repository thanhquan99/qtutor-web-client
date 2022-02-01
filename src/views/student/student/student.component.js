import {
  Col, Divider, List, Row,
  Space
} from "antd";
import _ from "lodash";
import React, { Component } from "react";
import { withAlert } from "react-alert";
import StudentService from "../../../api-services/student.service";
import TeachingRegistration from "../../../components/Offer-student";
import TutorPriceTable from "../../../components/tutor-price/tutor-price-table.component";
import { DEFAULT_AVATAR } from "../../../constant";
import "./student.css";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

class Student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStudent: {},
      value: 3,
    };
  }
  handleChange = (value) => {
    this.setState((curState) => ({ ...curState, value: value }));
  };
  async componentDidMount() {
    const { alert } = this.props;
    const data = await StudentService.getOne({
      alert,
      id: this.props.match.params.id,
    });
    if (!_.isEmpty(data)) {
      this.setState((curState) => ({ ...curState, currentStudent: data }));
    }
  }

  render() {
    const { currentStudent } = this.state;
    const { value } = this.state;

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
                    {/* <Row>
                      <span>Study at Da Nang university</span>
                    </Row> */}
                   
                    {/* <Row>
                      <span style={{ color: "#8B8B83" }}>
                        {parseInt(currentStudent?.minimumSalary).toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                      </span>
                    </Row> */}
                    <Row>
                      <span>{currentStudent?.description}</span>
                    </Row>
                    <Row>
                      {" "}
                      <Space>
                        <TeachingRegistration
                          student={this.state.currentStudent}
                        />
                        {/* <Button size='large'>More Info</Button> */}
                      </Space>
                    </Row>
                  </Col>
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
                  <Divider orientation="left">Teach Ability</Divider>
                  <List
                    size="small"
                    dataSource={currentStudent?.subjects}
                    renderItem={(subject) => (
                      <List.Item key={subject.id}>{subject.name}</List.Item>
                    )}
                  />
                </Row>
                <Row>
                  <Divider orientation="left">Subjects offered</Divider>
                </Row>
                <Row>
                  <TutorPriceTable tutor={this.state.currentStudent} />
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
