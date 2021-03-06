import { Button, Col, Row } from "antd";
import React, { Component } from "react";
import studentApi from "../../../api/student.api";
import tutorApi from "../../../api/tutor.api";
import eventBus from "../../../common/EventBus";
import SliderSuggest from "../../../components/slideSuggest";
import { DEFAULT_AVATAR } from "../../../constant";
import ListAbilityTeachings from "./list-ability-teachings";
import ListTeachings from "./list-teatchings";
import ModalCreateTeaching from "./modal-create-teaching";
import "./my-tutor-profile.css";

class MyTutorProfile extends Component {
  state = {
    students: [],
    tutor: {},
  };

  componentDidMount = async () => {
    const [tutor, { results: students }] = await Promise.all([
      tutorApi.getMe(),
      studentApi.getMySuggestion({ qs: { perPage: 15, page: 1 } }),
    ]);
    this.setState({ students, tutor });

    eventBus.on("update-tutor-subject", (tutorSubject) => {
      this.setState({
        tutor: {
          ...this.state.tutor,
          tutorSubjects: this.state.tutor?.tutorSubjects?.map((e) => {
            if (e.id === tutorSubject.id) {
              return tutorSubject;
            }
            return e;
          }),
        },
      });
    });

    eventBus.on("create-tutor-subject", (tutorSubject) => {
      this.setState({
        tutor: {
          ...this.state.tutor,
          tutorSubjects: [tutorSubject].concat(this.state.tutor?.tutorSubjects),
        },
      });
    });
  };

  componentWillUnmount() {
    eventBus.remove("update-tutor-subject");
    eventBus.remove("create-tutor-subject");
  }

  render() {
    const { tutor } = this.state;
    return (
      <div className="tutor-profile">
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <div className="row">
              <div className="col-md-3">
                <div
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    marginRight: "30px",
                  }}
                  className="card"
                >
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src={tutor?.profile?.avatar || DEFAULT_AVATAR}
                        alt="Admin"
                        className="rounded-circle"
                        width="150"
                      />
                      <div className="mt-3">
                        <h4>{tutor?.profile?.name}</h4>
                        <p className="text-secondary mb-1">
                          {tutor?.profile?.academicLevel}
                        </p>
                        <p className="text-muted font-size-sm">
                          Live at {tutor?.profile?.city?.name}
                        </p>
                      </div>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <h6 className="mb-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-twitter mr-2 icon-inline text-info"
                          >
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                          </svg>
                          Twitter
                        </h6>
                        <span className="text-secondary">Twitter</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <h6 className="mb-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-instagram mr-2 icon-inline text-danger"
                          >
                            <rect
                              x="2"
                              y="2"
                              width="20"
                              height="20"
                              rx="5"
                              ry="5"
                            ></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                          Instagram
                        </h6>
                        <span className="text-secondary">Instagram</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <h6 className="mb-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-facebook mr-2 icon-inline text-primary"
                          >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                          Facebook
                        </h6>
                        <span className="text-secondary">Facebook</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                  className="card h-100"
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-10">
                        <h6 className="d-flex align-items-center mb-3 text-info">
                          Teach Ability
                        </h6>
                      </div>

                      <div className="col-md-2">
                        <ModalCreateTeaching />
                      </div>
                    </div>

                    <ListAbilityTeachings tutor={tutor} />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                  className="card h-100"
                >
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3 text-danger">
                      Teaching
                    </h6>
                    <ListTeachings tutor={tutor} />
                  </div>
                </div>
              </div>
            </div>
            <div className="list_student_succgest">
              <h1>Students recommend for you</h1>

              <SliderSuggest
                type="student"
                data={this.state.students ? this.state.students : null}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MyTutorProfile;
