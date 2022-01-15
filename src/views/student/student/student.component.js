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
import StudentService from "../../../api-services/student.service";
import { DEFAULT_AVATAR } from "../../../constant";
import OfferStudent from "../../../components/Offer-student";
import TutorPriceTable from "../../../components/tutor-price/tutor-price-table.component";
import "./student.css";
class Student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStudent: {},
    };
  }

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
    return (
      <div className="wrappers mt-3 view-tutor">
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
                        src="https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg"
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
                        {parseInt(currentStudent?.minimumSalary).toLocaleString(
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
                        <OfferStudent tutor={this.state.currentStudent} />
                        <Button>More Info</Button>
                      </Space>
                    </Row>
                  </Col>
                </Row>

                <Divider orientation="left">About me</Divider>
                <Row>
                  <p>{currentStudent?.profile?.description}</p>
                </Row>

                <Divider orientation="left">About my teaching</Divider>
                <Row>
                  <p>{currentStudent?.description}</p>
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
