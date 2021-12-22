import React, { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import validator from "validator";
import authService from "../../api-services/auth.service";
import { withAlert } from "react-alert";
import eventBus from "../../common/EventBus";
import { invalidSetState, validSetState } from "../utils";
import "./login.css"
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
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

  onChangeEmail(e) {
    const email = e.target.value;
    if (!validator.isEmail(email)) {
      this.setState((curState) => {
        return invalidSetState({ curState, fieldName: "email" });
      });
      return;
    }
    this.setState((curState) => {
      return validSetState({ curState, fieldName: "email", value: email });
    });
  }

  onChangePassword(e) {
    const password = e.target.value;
    if (!validator.isLength(password, { min: 8 })) {
      this.setState((curState) => {
        return invalidSetState({ curState, fieldName: "password" });
      });
      return;
    }
    this.setState((curState) => {
      return validSetState({
        curState,
        fieldName: "password",
        value: password,
      });
    });
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
      <div className="login">
        <Row  className="justify-content-md-center">
          <Col
            xs={5}
            className="justify-content-md-center border border-light"
            style={{
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' ,
              padding: "50px 60px",
              background: "white",
              margin: "40px 0"
            }}
          >
            <Form noValidate onSubmit={this.handleLogin}>
              <h2 className="">Login</h2>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={this.onChangeEmail}
                />
                {this.state.errs.email.message && (
                  <Form.Text className="text-danger ">
                    {this.state.errs.email.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={this.onChangePassword}
                />
                {this.state.errs.password.message && (
                  <Form.Text className="text-danger ">
                    {this.state.errs.password.message}
                  </Form.Text>
                )}
              </Form.Group>
                  <div className="loginButton">
                  <button type="submit">
                Login
              </button>
                  </div>
              
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withAlert()(Login);
