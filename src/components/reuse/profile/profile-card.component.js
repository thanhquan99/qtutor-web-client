import { Component } from "react";
import { withAlert } from "react-alert";
import userService from "../../../api-services/user.service";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { invalidSetState, validSetState } from "../../utils";

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    // this.handleLogin = this.handleLogin.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.openPopup = this.openPopup.bind(this);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeAdditionalInformation =
      this.onChangeAdditionalInformation.bind(this);

    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);

    this.state = {
      isPopupOpen: false,
      currentUser: {},
      payload: {},
      errs: {
        name: {
          isValidated: true,
          message: undefined,
        },
        phone: {
          isValidated: true,
          message: undefined,
        },
        dateOfBirth: {
          isValidated: true,
          message: undefined,
        },
        address: {
          isValidated: true,
          message: undefined,
        },
        additionalInformation: {
          isValidated: true,
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
      payload: { dateOfBirth: data?.profile?.dateOfBirth },
      currentUser: data,
    }));
  }

  onChangeName(e) {
    const name = e.target.value;
    if (_.isEmpty(name)) {
      this.setState((curState) => {
        return invalidSetState({ curState, fieldName: "name" });
      });
      return;
    }
    this.setState((curState) => {
      return validSetState({ curState, fieldName: "name", value: name });
    });
  }

  onChangePhone(e) {
    const phone = e.target.value;
    if (_.isEmpty(phone)) {
      this.setState((curState) => {
        return invalidSetState({ curState, fieldName: "phone" });
      });
      return;
    }
    this.setState((curState) => {
      return validSetState({ curState, fieldName: "phone", value: phone });
    });
  }

  onChangeDateOfBirth(e) {
    const dateOfBirth = new Date(e);
    if (_.isEmpty(dateOfBirth.toISOString())) {
      this.setState((curState) => {
        return invalidSetState({ curState, fieldName: "dateOfBirth" });
      });
      return;
    }
    this.setState((curState) => {
      return validSetState({
        curState,
        fieldName: "dateOfBirth",
        value: dateOfBirth.toISOString(),
      });
    });
  }

  onChangeAddress(e) {
    const address = e.target.value;
    if (_.isEmpty(address)) {
      this.setState((curState) => {
        return invalidSetState({ curState, fieldName: "address" });
      });
      return;
    }
    this.setState((curState) => {
      return validSetState({ curState, fieldName: "address", value: address });
    });
  }

  onChangeAdditionalInformation(e) {
    const additionalInformation = e.target.value;
    if (_.isEmpty(additionalInformation)) {
      this.setState((curState) => {
        return invalidSetState({
          curState,
          fieldName: "additionalInformation",
        });
      });
      return;
    }
    this.setState((curState) => {
      return validSetState({
        curState,
        fieldName: "additionalInformation",
        value: additionalInformation,
      });
    });
  }

  async handleUpdateProfile(e) {
    e.preventDefault();
    const { alert } = this.props;
    const { errs } = this.state;

    for (const key in errs) {
      if (!errs[key].isValidated) {
        return;
      }
    }

    const data = await userService.updateMe({
      component: this,
      payload: this.state.payload,
      alert,
    });
    this.setState((curState) => ({
      ...curState,
      currentUser: data,
      isPopupOpen: false,
    }));
  }

  openPopup() {
    this.setState((curState) => ({
      ...curState,
      isPopupOpen: true,
    }));
  }

  closePopup() {
    this.setState((curState) => ({
      ...curState,
      isPopupOpen: false,
    }));
  }

  render() {
    return (
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
              <Button variant="primary" onClick={this.openPopup}>
                Edit
              </Button>

              <Modal show={this.state.isPopupOpen} onHide={this.closePopup}>
                <Modal.Header closeButton>
                  <Modal.Title>Profile</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form noValidate>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Full Name"
                        onChange={this.onChangeName}
                        defaultValue={this.state.currentUser?.profile?.name}
                      />
                      {this.state.errs.name.message && (
                        <Form.Text className="text-danger ">
                          {this.state.errs.name.message}
                        </Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        defaultValue={this.state.currentUser?.email}
                      />
                    </Form.Group>

                    {/* <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Phone"
                        onChange={this.onChangePassword}
                        defaultValue={this.state.currentUser?.profile?.phone}
                      />
                      {this.state.errs.phone.message && (
                        <Form.Text className="text-danger ">
                          {this.state.errs.phone.message}
                        </Form.Text>
                      )}
                    </Form.Group> */}

                    <Form.Group className="mb-3">
                      <Form.Label>Birth Day</Form.Label>
                      <DatePicker
                        onChange={this.onChangeDateOfBirth}
                        value={
                          this.state.payload?.dateOfBirth
                            ? new Date(this.state.payload?.dateOfBirth)
                            : null
                        }
                        locale="vi-VI"
                        clearIcon={null}
                      />
                      {this.state.errs.dateOfBirth.message && (
                        <Form.Text className="text-danger ">
                          {this.state.errs.dateOfBirth.message}
                        </Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Additional Information</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Additional Information"
                        onChange={this.onChangeAdditionalInformation}
                        defaultValue={
                          this.state.currentUser?.profile?.additionalInformation
                        }
                      />
                      {this.state.errs.additionalInformation.message && (
                        <Form.Text className="text-danger ">
                          {this.state.errs.additionalInformation.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Form>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" onClick={this.closePopup}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={this.handleUpdateProfile}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withAlert()(ProfileCard));
