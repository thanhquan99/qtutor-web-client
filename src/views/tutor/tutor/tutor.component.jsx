import {
  Avatar, Button, Col,
  Comment, Input, List, Rate,
  Row,
  Space
} from "antd";
import _ from "lodash";
import React, { Component } from "react";
import { withAlert } from "react-alert";
import tutorService from "../../../api-services/tutor.service";
import RegisterACourse from "../../../components/register-a-course/register-a-course.component";
import TutorPriceTable from "../../../components/tutor/tutor-price/tutor-price-table.component";
import { DEFAULT_AVATAR } from "../../../constant";
import "./tutor.css";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const { TextArea } = Input;

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
    console.log(currentTutor, "currentTutor");
    const { value } = this.state;
    const { valueComment } = this.state;

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
                  <p>Số  môn học đã dạy: {currentTutor?.totalCourses}</p>
                  <p>Số học sinh đã dạy: {currentTutor?.totalStudents}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 bg-white">
                  <b>Môn học</b>

                  <List
                    size="small"
                    dataSource={currentTutor?.subjects}
                    renderItem={(subject) => (
                      <List.Item key={subject.id}>{subject.name}</List.Item>
                    )}
                  />
                </div>
                <div className="col-md-6 bg-white">
                  <b>Bảng giá</b>

                  <TutorPriceTable tutor={this.state.currentTutor} />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-12 bg-white ">
                  <b>Đánh giá</b>

                  <div className="cmt cmtAndRate">
                    <div>
                      <Rate
                        tooltips={desc}
                        onChange={this.handleChangeRate}
                        value={value}
                      />
                    </div>
                    <div className="items-center">
                      <TextArea
                        placeholder="Autosize height with minimum and maximum number of lines"
                        autoSize={{ minRows: 2, maxRows: 6 }}
                      />
                    </div>
                    <div className="buttonCmt">
                      <Button type="primary" size="large">
                        Comment
                      </Button>
                    </div>
                    <div className="list-cmt ">
                      <Comment
                        author={
                          <span>
                            Anonymous{" "}
                            <Rate
                              style={{ color: "#66CDAA" }}
                              disabled
                              defaultValue={4}
                            />
                          </span>
                        }
                        avatar={<Avatar src={DEFAULT_AVATAR} alt="User 1" />}
                        content={
                          <p>
                            We supply a series of design principles, practical
                            patterns and high quality design resources (Sketch
                            and Axure), to help people create their product
                            prototypes beautifully and efficiently.
                          </p>
                        }
                      />
                      <Comment
                        author={
                          <span>
                            Anonymous{" "}
                            <Rate
                              style={{ color: "#66CDAA" }}
                              disabled
                              defaultValue={4}
                            />
                          </span>
                        }
                        avatar={<Avatar src={DEFAULT_AVATAR} alt="User 1" />}
                        content={
                          <p>
                            We supply a series of design principles, practical
                            patterns and high quality design resources (Sketch
                            and Axure), to help people create their product
                            prototypes beautifully and efficiently.
                          </p>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col span={4}></Col>
        </Row>

        {/* <div className="centers">
          <Row>
            <h3>Tutor View</h3>
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
                        src={currentTutor?.profile?.avatar || DEFAULT_AVATAR}
                        alt="Admin"
                        className="rounded-circle"
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <Row>
                    </Row>
                    <Row>
                      <span>Live at {currentTutor?.profile?.city?.name}</span>
                    </Row>
                    <Row>
                      <span>Study at Da Nang university</span>
                    </Row>
                    <Row>
                      <Space>
                        <span>
                          <FaStar style={{ color: "#66CDAA" }}></FaStar> 4.3
                        </span>
                        <span>
                          <FaComment style={{ color: "#FFCC99" }}></FaComment>{" "}
                          29
                        </span>
                      </Space>
                    </Row>
                    <Row>
                      <span style={{ color: "#8B8B83" }}>
                        {parseInt(currentTutor?.minimumSalary).toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                      </span>
                    </Row>
                    <Row>
                      <Space>
                        <StudyingRegistration tutor={this.state.currentTutor} />
                        <Button>More Info</Button>
                      </Space>
                    </Row>
                  </Col>
                </Row>

                <Divider orientation="left">About me</Divider>
                <Row>
                  <p>{currentTutor?.profile?.description}</p>
                </Row>

                <Divider orientation="left">About my teaching</Divider>
                <Row>
                  <p>{currentTutor?.description}</p>
                </Row>

                <Divider orientation="left">Rating & Reviews</Divider>
                <Row className="align-items-center text-center">
                  <Space size="middle">
                    <Rate
                      style={{ color: "#66CDAA" }}
                      disabled
                      allowHalf
                      defaultValue={4.6}
                    />
                    <span style={{ fontSize: 30, color: "#66CDAA" }}>4.3</span>
                  </Space>
                </Row>
                <Row>
                  <span>10 reviews</span>
                </Row>

                <Divider orientation="left"></Divider>
                <Row>
                  <Comment
                    author={
                      <span>
                        Anonymous{" "}
                        <Rate
                          style={{ color: "#66CDAA" }}
                          disabled
                          defaultValue={4}
                        />
                      </span>
                    }
                    avatar={<Avatar src={DEFAULT_AVATAR} alt="User 1" />}
                    content={
                      <p>
                        We supply a series of design principles, practical
                        patterns and high quality design resources (Sketch and
                        Axure), to help people create their product prototypes
                        beautifully and efficiently.
                      </p>
                    }
                  />
                </Row>
                <Divider orientation="left"></Divider>
                <Row>
                  <Comment
                    author={
                      <span>
                        Anonymous{" "}
                        <Rate
                          style={{ color: "#66CDAA" }}
                          disabled
                          defaultValue={4}
                        />
                      </span>
                    }
                    avatar={<Avatar src={DEFAULT_AVATAR} alt="User 1" />}
                    content={
                      <p>
                        We supply a series of design principles, practical
                        patterns and high quality design resources (Sketch and
                        Axure), to help people create their product prototypes
                        beautifully and efficiently.
                      </p>
                    }
                  />
                </Row>
                <Divider orientation="left"></Divider>
                <Row>
                  <Comment
                    author={
                      <span>
                        Anonymous{" "}
                        <Rate
                          style={{ color: "#66CDAA" }}
                          disabled
                          defaultValue={4}
                        />
                      </span>
                    }
                    avatar={<Avatar src={DEFAULT_AVATAR} alt="User 1" />}
                    content={
                      <p>
                        We supply a series of design principles, practical
                        patterns and high quality design resources (Sketch and
                        Axure), to help people create their product prototypes
                        beautifully and efficiently.
                      </p>
                    }
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
                  <Divider orientation="left">Teach Ability</Divider>
                  <List
                    size="small"
                    dataSource={currentTutor?.subjects}
                    renderItem={(subject) => (
                      <List.Item key={subject.id}>{subject.name}</List.Item>
                    )}
                  />
                </Row>
                <Row>
                  <Divider orientation="left">Subjects offered</Divider>
                </Row>
                <Row>
                </Row>
              </div>
            </Col>
          </Row>
        </div> */}
      </div>
    );
  }
}

export default withAlert()(Tutor);
