import React, { Component } from "react";
import { withAlert } from "react-alert";
import { ListGroup } from "react-bootstrap";
import validator from "validator";
import authService from "../../api-services/auth.service";
import userService from "../../api-services/user.service";
import eventBus from "../../common/EventBus";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      currentUser: {},
      payload: {
        email: undefined,
        password: undefined,
      },
      errs: {
        email: {
          isValidated: false,
          message: undefined,
        },
        password: {
          isValidated: false,
          message: undefined,
        },
      },
    };
  }

  async componentDidMount() {
    const { alert } = this.props;
    const data = await userService.getMe({ component: this, alert });
    this.setState((curState) => ({
      ...curState,
      currentUser: data,
    }));
    console.log(this.state);
  }

  onChangeEmail(e) {
    const email = e.target.value;
    if (!validator.isEmail(email)) {
      this.setState((curState) => ({
        ...curState,
        errs: {
          ...curState.errs,
          email: {
            isValidated: false,
            message: "Invalid email",
          },
        },
      }));
      return;
    }
    this.setState((curState) => ({
      ...curState,
      payload: {
        ...curState.payload,
        email,
      },
      errs: {
        ...curState.errs,
        email: {
          isValidated: true,
          message: undefined,
        },
      },
    }));
  }

  onChangePassword(e) {
    const password = e.target.value;
    if (!validator.isLength(password, { min: 8 })) {
      this.setState((curState) => ({
        ...curState,
        errs: {
          ...curState.errs,
          password: {
            isValidated: false,
            message: "Password must be grate than 8",
          },
        },
      }));
      return;
    }
    this.setState((curState) => ({
      ...curState,
      payload: {
        ...curState.payload,
        password,
      },
      errs: {
        ...curState.errs,
        password: {
          isValidated: true,
          message: undefined,
        },
      },
    }));
  }

  async handleLogin(e) {
    e.preventDefault();
    const { alert } = this.props;
    const { errs } = this.state;

    for (const key in errs) {
      if (!errs[key].isValidated) {
        return;
      }
    }

    const data = await authService.login({
      payload: this.state.payload,
      alert,
    });
    if (data) {
      eventBus.dispatch("login");
      this.props.history.push("/home");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg"
                      alt="Admin"
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>{this.state.currentUser?.profile?.name}</h4>
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
                </div>
              </div>
              <div className="card mt-3">
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

            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {this.state.currentUser?.profile?.name}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {this.state.currentUser?.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {this.state.currentUser?.profile?.phone}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">BirthDay</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {new Date(
                        this.state.currentUser?.profile?.dateOfBirth
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      Hai Chau, Da Nang city
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Additional Information</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {this.state.currentUser?.profile?.additionalInformation}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <button className="btn btn-info">Edit</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3 text-info">
                        Teaching
                      </h6>
                      <ListGroup variant="flush">
                        <ListGroup.Item>Toan 11</ListGroup.Item>
                        <ListGroup.Item>Toan 10</ListGroup.Item>
                        <ListGroup.Item>Su 9</ListGroup.Item>
                        <ListGroup.Item>Van 12</ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3 text-danger">
                        Studying
                      </h6>
                      <ListGroup variant="flush">
                        <ListGroup.Item>TOEIC beginner</ListGroup.Item>
                        <ListGroup.Item>English communication beginner</ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(Profile);
