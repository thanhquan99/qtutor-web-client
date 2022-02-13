import { Button, Col, List, Row, Space, Spin } from "antd";
import _ from "lodash";
import React, { Component } from "react";
import { withAlert } from "react-alert";
import tutorService from "../../../api-services/tutor.service";
import RegisterACourse from "../../../components/register-a-course/register-a-course.component";
import TutorPriceTable from "../../../components/tutor/tutor-price/tutor-price-table.component";
import TutorRating from "../../../components/tutor/tutor-rating";
import TutorSchedule from "../../../components/tutor/tutor-schedule";
import { DEFAULT_AVATAR } from "../../../constant";
import "./tutor.css";

class Tutor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTutor: {},
      value: 3,
      valueComment: "",
      loading: true,
    };
  }
  handleChangeRate = (value) => {
    this.setState((curState) => ({ ...curState, value: value }));
  };
  onCmtChange = ({ target: { value } }) => {
    this.setState((curState) => ({ ...curState, valueComment: value }));
  };
  async componentDidMount() {
    const { alert } = this.props;
    console.log(this.props.match.params);
    const data = await tutorService.getOne({
      alert,
      id: this.props.match.params.id,
    });
    if (!_.isEmpty(data)) {
      this.setState((curState) => ({
        ...curState,
        currentTutor: data,
        loading: false,
      }));
    }
  }
  render() {
    const { currentTutor, loading } = this.state;
    return loading ? (
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
      <div className=" mt-3 view-tutor">
        <Row>
          <Col span={4}></Col>
          <Col span={16}>
            <div className="info__header">
              <div className="bia">
                <img
                  src="https://akadon.edu.vn/static/media/public-profile.e2e4a8be.svg"
                  alt=""
                />
                <div className="avts">
                  <img
                    src={currentTutor?.profile?.avatar || DEFAULT_AVATAR}
                    alt="Admin"
                    className="rounded"
                  />
                </div>
              </div>
            </div>
            <div className="descript">
              <b>{currentTutor?.profile?.name}</b>
              <p>Live at {currentTutor?.profile?.city?.name}</p>
              <Space>
                <RegisterACourse tutor={this.state.currentTutor} />
              </Space>
            </div>
            <div className="content-info">
              <div className="row">
                <div className="col-md-6 bg-white">
                  <b>About me</b>
                  <p style={{ fontSize: 14 }}>{currentTutor?.description}</p>
                </div>
                <div className="col-md-6 bg-white">
                  <b>Teaching Experience</b>
                  <List
                    dataSource={[
                      `Years experience: ${currentTutor?.yearsExperience}`,
                      `Total courses: ${currentTutor?.totalCourses}`,
                      `Total students: ${currentTutor?.totalStudents}`,
                    ]}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 bg-white">
                  <b>Subject</b>
                  <List
                    size="small"
                    dataSource={currentTutor?.subjects}
                    renderItem={(subject) => (
                      <List.Item key={subject.id}>{subject.name}</List.Item>
                    )}
                  />
                </div>
                <div className="col-md-6 bg-white">
                  <b>Price</b>
                  <TutorPriceTable tutor={currentTutor} />
                </div>
              </div>
              <div className="row bg-white">
                <b>Free Time</b>
                <TutorSchedule schedule={currentTutor?.schedules} />
              </div>
              <TutorRating tutor={currentTutor} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withAlert()(Tutor);
