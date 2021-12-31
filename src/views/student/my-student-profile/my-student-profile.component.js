
import _ from "lodash";
import React, { Component } from "react";
import { withAlert } from "react-alert";
import { ListGroup } from "react-bootstrap";
import studentService from "../../../api-services/student.service";
import "./my-student-profile.component.css"

class MyStudentProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStudent: {},
    };
  }

  async componentDidMount() {
    const { alert } = this.props;
    const data = await studentService.getMe({ alert, component: this });
    if (!_.isEmpty(data)) {
      this.setState((curState) => ({ ...curState, currentStudent: data }));
    }
  }
  render() {
    return (
      <div className="tutor-profile">
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
                      src="https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg"
                      alt="Admin"
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>{this.state.currentStudent?.profile?.name}</h4>
                      <p className="text-secondary mb-1">
                        Studying at Da Nang University
                      </p>
                      <p className="text-muted font-size-sm">
                        Hai Chau, Da Nang city
                      </p>
                      {/* <button className="btn btn-primary">Follow</button>
                      <button className="btn btn-outline-primary">
                        Message
                      </button> */}
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
          <div className="col-md-3">
            <div
              style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
              className="card h-100"
            >
              <div className="card-body">
               
                <h6 className="d-flex align-items-center mb-3 text-info">
                        Want to Learn
                      </h6>
                       <ListGroup variant="flush">
                         {this.state.currentStudent?.subjects?.map((subject) => (
                          <ListGroup.Item key={subject.id}>
                            {subject.name}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
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
                        Studying
                       </h6>
                       <ListGroup variant="flush">
                        <ListGroup.Item>Coming soon</ListGroup.Item>
                      </ListGroup>
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
              <h6 className="d-flex align-items-center mb-3 text-success">
                         Your Studying History
                       </h6>
                       <ListGroup variant="flush">
                       <ListGroup.Item>Coming soon</ListGroup.Item>
                      </ListGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(MyStudentProfile);
