import {
  Avatar,
  Col,
  Comment,
  Divider,
  Rate,
  Row,
  Space,
  List,
  Button,
} from "antd";
import _ from "lodash";
import React, { Component } from "react";
import { withAlert } from "react-alert";
import { FaComment, FaStar } from "react-icons/fa";
import tutorService from "../../../api-services/tutor.service";
import { DEFAULT_AVATAR } from "../../../constant";
import RegisterACourse from "../../../components/register-a-course/register-a-course.component";
import TutorPriceTable from "../../../components/tutor-price/tutor-price-table.component";
import "./tutor.css";
class Tutor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTutor: {},
    };
  }

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
      <div className="wrappers mt-3 view-tutor">
        <div className="centers">
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
                      <b>{currentTutor?.profile?.name}</b>
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
                        <RegisterACourse tutor={this.state.currentTutor} />
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
                  <TutorPriceTable tutor={this.state.currentTutor} />
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withAlert()(Tutor);
