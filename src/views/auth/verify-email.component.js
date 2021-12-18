import React, { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import validator from "validator";
import authService from "../../api-services/auth.service";
import { withAlert } from "react-alert";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.handleVerifyEmail = this.handleVerifyEmail.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeVerifyEmailCode = this.onChangeVerifyEmailCode.bind(this);

    this.state = {
      payload: {
        email: undefined,
        verifyEmailCode: undefined,
      },
      errs: {
        email: {
          isValidated: false,
          message: undefined,
        },
        verifyEmailCode: {
          isValidated: false,
          message: undefined,
        },
      },
    };
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

  onChangeVerifyEmailCode(e) {
    const verifyEmailCode = e.target.value;
    if (!validator.isLength(verifyEmailCode, { min: 10 })) {
      this.setState((curState) => ({
        ...curState,
        errs: {
          ...curState.errs,
          verifyEmailCode: {
            isValidated: false,
            message: "Invalid verification code",
          },
        },
      }));
      return;
    }
    this.setState((curState) => ({
      ...curState,
      payload: {
        ...curState.payload,
        verifyEmailCode,
      },
      errs: {
        ...curState.errs,
        verifyEmailCode: {
          isValidated: true,
          message: undefined,
        },
      },
    }));
  }

  async handleVerifyEmail(e) {
    e.preventDefault();
    const { alert } = this.props;
    const { errs } = this.state;

    for (const key in errs) {
      if (!errs[key].isValidated) {
        return;
      }
    }

    const data = await authService.verifyEmail({
      payload: this.state.payload,
      alert,
    });
    if (data) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <Container className="mt-md-5">
        <Row className="justify-content-md-center">
          <Col
            xs={5}
            className="justify-content-md-center border border-light bg-light"
          >
            <Form noValidate onSubmit={this.handleVerifyEmail}>
              <h2 className="text-primary text-center">VerifyEmail</h2>

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
                <Form.Label>Verification Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Verification Code"
                  onChange={this.onChangeVerifyEmailCode}
                />
                {this.state.errs.verifyEmailCode.message && (
                  <Form.Text className="text-danger ">
                    {this.state.errs.verifyEmailCode.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Button variant="primary" type="submit">
                Verify Email
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withAlert()(VerifyEmail);
