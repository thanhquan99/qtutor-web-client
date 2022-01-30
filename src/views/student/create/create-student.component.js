import { Select, Button } from "antd";
import _ from "lodash";
import React, { Component } from "react";
import { withAlert } from "react-alert";
import { Col, Form, Row } from "react-bootstrap";
import studentService from "../../../api-services/student.service";
import subjectService from "../../../api-services/subject.service";
import { invalidSetState, validSetState } from "../../utils";
import "../style.css";
import "./create-student-component.css";
class CreateStudent extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onSearchSubject = this.onSearchSubject.bind(this);

    this.handleCreateStudent = this.handleCreateStudent.bind(this);

    this.state = {
      currentTutor: {},
      subjects: [],
      payload: {
        description: undefined,
        Experience: undefined,
        studentSubjects: undefined,
      },
      errs: {
        description: {
          isValidated: false,
          message: undefined,
        },
        Experience: {
          isValidated: false,
          message: undefined,
        },
        studentSubjects: {
          isValidated: false,
          message: undefined,
        },
      },
    };
  }

  async componentDidMount() {
    const { alert } = this.props;
    const { results: subjects } = await subjectService.getMany({
      alert,
      qs: { perPage: 5 },
    });
    this.setState((curState) => ({ ...curState, subjects }));
  }

  onChangeDescription(e) {
    const description = e.target.value;
    if (_.isEmpty(description)) {
      this.setState((curState) => {
        return invalidSetState({
          curState,
          fieldName: "description",
        });
      });
      return;
    }
    this.setState((curState) => {
      return validSetState({
        curState,
        fieldName: "description",
        value: description,
      });
    });
  }
  onChangExperience(e) {
    const Experience = e.target.value;
    if (_.isEmpty(Experience)) {
      this.setState((curState) => {
        return invalidSetState({
          curState,
          fieldName: "Experience",
        });
      });
      return;
    }
    this.setState((curState) => {
      return validSetState({
        curState,
        fieldName: "Experience",
        value: Experience,
      });
    });
  }
  onChangeSubject(values, elements) {
    if (_.isEmpty(values)) {
      this.setState((curState) => {
        return invalidSetState({
          curState,
          fieldName: "studentSubjects",
          message: "Select at least 1 subject",
        });
      });
      this.setState((curState) => ({
        ...curState,
        payload: { ...curState.payload, studentSubjects: [] },
      }));
      return;
    }
    this.setState((curState) => {
      return validSetState({
        curState,
        fieldName: "studentSubjects",
        value: elements.map((e) => ({ subjectId: e.key })),
      });
    });
  }

  async onSearchSubject(value) {
    const { alert } = this.props;
    if (_.isEmpty(value)) {
      return;
    }
    const filter = { name: { $ilike: value } };
    const { results: subjects } = await subjectService.getMany({
      alert,
      qs: { perPage: 5, filter: JSON.stringify(filter) },
    });
    this.setState((curState) => ({
      ...curState,
      subjects,
    }));
  }

  async handleCreateStudent(e) {
    e.preventDefault();
    const { alert } = this.props;
    const { errs } = this.state;

    for (const key in errs) {
      if (!errs[key].isValidated) {
        return;
      }
    }

    const data = await studentService.createStudent({
      payload: this.state.payload,
      alert,
      component: this,
    });
    if (!_.isEmpty(data)) {
      window.location.reload();
    }
  }

  render() {
    return (
      <div className="create-student">
        <Row className="justify-content-md-center">
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
            <Form noValidate onSubmit={this.handleCreateStudent}>
              <h2 className="">Become a Student</h2>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Something about your wishes"
                  onChange={this.onChangeDescription}
                />
                {this.state.errs.description?.message && (
                  <Form.Text className="text-danger ">
                    {this.state.errs.description?.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Years experience</Form.Label>
                <Form.Control
                  as="input"
                  rows={3}
                  placeholder="Years experience"
                  onChange={this.onChangExperience}
                />
                {this.state.errs.Experience?.message && (
                  <Form.Text className="text-danger ">
                    {this.state.errs.Experience?.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Label>Want to Learn</Form.Label>
              <br />
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select one subject"
                onChange={this.onChangeSubject}
                onSearch={this.onSearchSubject}
                optionLabelProp="label"
              >
                {this.state.subjects?.map((subject) => (
                  <Select.Option key={subject.id} value={subject.name}>
                    {subject.name}
                  </Select.Option>
                ))}
              </Select>
              <br />
              {this.state.errs.studentSubjects?.message && (
                <Form.Text className="text-danger ">
                  {this.state.errs.studentSubjects?.message}
                </Form.Text>
              )}
              <br />

              <div className="loginButton">
                  <Button size="large" type="primary" type="submit">
                Submit
              </Button>
                  </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withAlert()(CreateStudent);
