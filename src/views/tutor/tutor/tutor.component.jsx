import { Button, Col, List, Row, Space } from "antd";
import _ from "lodash";
import React, { Component } from "react";
import { withAlert } from "react-alert";
import tutorService from "../../../api-services/tutor.service";
import RegisterACourse from "../../../components/register-a-course/register-a-course.component";
import TutorPriceTable from "../../../components/tutor/tutor-price/tutor-price-table.component";
import TutorRating from "../../../components/tutor/tutor-rating";
import { DEFAULT_AVATAR } from "../../../constant";
import "./tutor.css";

class Tutor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTutor: {},
      value: 3,
      valueComment: "",
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
      this.setState((curState) => ({ ...curState, currentTutor: data }));
    }
  }
  render() {
    const { currentTutor } = this.state;

    return (
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
              <p>{currentTutor?.description}</p>
              <Space>
                <RegisterACourse tutor={this.state.currentTutor} />
                <Button size="large">More Info</Button>
              </Space>
            </div>
            <div className="content-info">
              <div className="row">
                <div className="col-md-6 bg-white">
                  <b>About me</b>
                  <p>Live at {currentTutor?.profile?.city?.name}</p>
                  <p>{currentTutor?.additionalInformation}</p>
                  <p>{currentTutor?.dateOfBirth}</p>
                  <p>{currentTutor?.description}</p>
                </div>
                <div className="col-md-6 bg-white">
                  <b>Chuyên môn</b>
                  <p>số năm kinh nhiệm: {currentTutor?.yearsExperience}</p>
                  <p>Số môn học đã dạy: {currentTutor?.totalCourses}</p>
                  <p>Số học sinh đã dạy: {currentTutor?.totalStudents}</p>
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
                  <TutorPriceTable tutor={this.state.currentTutor} />
                </div>
              </div>
              <TutorRating tutor={this.state.currentTutor} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withAlert()(Tutor);
