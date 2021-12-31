import { Component } from "react";
import { withAlert } from "react-alert";
import userService from "../../api-services/user.service";
import { Form } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { invalidSetState, validSetState } from "../../views/utils";
import { Select } from "antd";
import { Modal, Button } from "antd";
import cityService from "../../api-services/city.service";
import { FaMars, FaVenus } from "react-icons/fa";
import { ACADEMIC_LEVEL } from "../../constant";

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.closePopup = this.closePopup.bind(this);
    this.openPopup = this.openPopup.bind(this);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeAdditionalInformation =
      this.onChangeAdditionalInformation.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onSearchCity = this.onSearchCity.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeAcademicLevel = this.onChangeAcademicLevel.bind(this);
    this.onChangeWorkLocation = this.onChangeWorkLocation.bind(this);

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
        cityId: {
          isValidated: true,
          message: undefined,
        },
        isMale: {
          isValidated: true,
          message: undefined,
        },
        academicLevel: {
          isValidated: true,
          message: undefined,
        },
        workLocation: {
          isValidated: true,
          message: undefined,
        },
      },
      cities: [],
    };
  }

  async componentDidMount() {
    const { alert } = this.props;
    const data = await userService.getMe({ component: this, alert });
    const { results: cities } = await cityService.getMany({
      alert,
      qs: { perPage: 5 },
    });
    this.setState((curState) => ({
      ...curState,
      payload: { dateOfBirth: data?.profile?.dateOfBirth },
      currentUser: data,
      cities,
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

  onChangeCity(value) {
    this.setState((curState) => {
      return validSetState({
        curState,
        fieldName: "cityId",
        value,
      });
    });
  }
  async onSearchCity(value) {
    const { alert } = this.props;
    if (_.isEmpty(value)) {
      return;
    }
    const filter = { name: { $ilike: value } };
    const { results: cities } = await cityService.getMany({
      alert,
      qs: { perPage: 5, filter: JSON.stringify(filter) },
    });
    this.setState((curState) => ({
      ...curState,
      cities,
    }));
  }

  onChangeGender(value) {
    this.setState((curState) => {
      return validSetState({
        curState,
        fieldName: "isMale",
        value,
      });
    });
  }

  onChangeAcademicLevel(value) {
    this.setState((curState) => {
      return validSetState({
        curState,
        fieldName: "academicLevel",
        value,
      });
    });
  }

  onChangeWorkLocation(e) {
    const workLocation = e.target.value;
    if (_.isEmpty(workLocation)) {
      this.setState((curState) => {
        return invalidSetState({ curState, fieldName: "workLocation" });
      });
      return;
    }
    this.setState((curState) => {
      return validSetState({
        curState,
        fieldName: "workLocation",
        value: workLocation,
      });
    });
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

  render() {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Full Name</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {this.state.currentUser?.profile?.name + "  "}
              {this.state.currentUser?.profile?.isMale ? (
                <FaMars style={{ color: "#419fcf" }} />
              ) : (
                <FaVenus style={{ color: "#f378ac" }} />
              )}
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
              <h6 className="mb-0">City</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {this.state.currentUser?.profile?.city?.name}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Academic Level</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {this.state.currentUser?.profile?.academicLevel}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Work Location</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              {this.state.currentUser?.profile?.workLocation}
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
              <Button type="primary" onClick={this.openPopup}>
                Edit
              </Button>

              <Modal
                title="Profile"
                visible={this.state.isPopupOpen}
                onOk={this.closePopup}
                onCancel={this.closePopup}
                footer={[
                  <Button key="back" onClick={this.closePopup}>
                    Cancel
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    onClick={this.handleUpdateProfile}
                  >
                    Save
                  </Button>,
                ]}
              >
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

                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Select a city"
                      optionFilterProp="children"
                      onChange={this.onChangeCity}
                      onSearch={this.onSearchCity}
                      defaultValue={this.state.currentUser?.profile?.city?.id}
                    >
                      {this.state.cities?.map((city) => (
                        <Select.Option key={city.id} value={city.id}>
                          {city.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Academic Level</Form.Label>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Select your academic Level"
                      optionFilterProp="children"
                      onChange={this.onChangeAcademicLevel}
                      defaultValue={
                        this.state.currentUser?.profile?.academicLevel
                      }
                    >
                      {Object.values(ACADEMIC_LEVEL).map((e) => (
                        <Select.Option value={e}>{e}</Select.Option>
                      ))}
                    </Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Work Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Work location"
                      onChange={this.onChangeWorkLocation}
                      defaultValue={
                        this.state.currentUser?.profile?.workLocation
                      }
                    />
                    {this.state.errs.name.message && (
                      <Form.Text className="text-danger ">
                        {this.state.errs.name.message}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Select gender"
                      optionFilterProp="children"
                      onChange={this.onChangeGender}
                      defaultValue={this.state.currentUser?.profile?.isMale}
                    >
                      <Select.Option value={true}>Boy</Select.Option>
                      <Select.Option value={false}>Girl</Select.Option>
                    </Select>
                  </Form.Group>
                </Form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withAlert()(ProfileCard));
