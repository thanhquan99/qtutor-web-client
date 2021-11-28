import React, { Component } from "react";
import { withAlert } from "react-alert";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import subjectService from "../../api-services/subject.service";
import { invalidSetState, validSetState } from "../utils";
import _ from "lodash";
import tutorService from "../../api-services/tutor.service";

class CreateTutor extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.handleCreateTutor = this.handleCreateTutor.bind(this);

    this.state = {
      currentTutor: {},
      subjects: [],
      payload: {
        description: undefined,
        tutorSubjects: undefined,
      },
      errs: {
        description: {
          isValidated: false,
          message: undefined,
        },
        tutorSubjects: {
          isValidated: false,
          message: undefined,
        },
      },
    };
  }

  async componentDidMount() {
    const { alert } = this.props;
    const { results: subjects } = await subjectService.getMany({ alert });
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

  onChangeSubject(e) {
    const { value, checked } = e.target;
    let tutorSubjects = this.state.payload.tutorSubjects || [];

    if (checked) {
      tutorSubjects.push({ subjectId: value });
    } else {
      tutorSubjects = tutorSubjects.filter(
        (tutorSubject) => tutorSubject.subjectId !== value
      );
    }

    if (_.isEmpty(tutorSubjects)) {
      this.setState((curState) => {
        return invalidSetState({
          curState,
          fieldName: "tutorSubjects",
          message: "At least 1 subject",
        });
      });
      return;
    }
    this.setState((curState) => {
      return validSetState({
        curState,
        fieldName: "tutorSubjects",
        value: tutorSubjects,
      });
    });
  }

  async handleCreateTutor(e) {
    e.preventDefault();
    const { alert } = this.props;
    const { errs } = this.state;

    for (const key in errs) {
      if (!errs[key].isValidated) {
        return;
      }
    }

    const data = await tutorService.createTutor({
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
      <Container className="mt-md-5">
        <Row className="justify-content-md-center">
          <Col
            xs={5}
            className="justify-content-md-center border border-light bg-light"
          >
            <Form noValidate onSubmit={this.handleCreateTutor}>
              <h2 className="text-primary text-center">Become a Tutor</h2>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Description"
                  onChange={this.onChangeDescription}
                />
                {this.state.errs.description?.message && (
                  <Form.Text className="text-danger ">
                    {this.state.errs.description?.message}
                  </Form.Text>
                )}
              </Form.Group>
              
              <Form.Label>Teach Ability</Form.Label>
              <br />
              {this.state.subjects.map((subject) => (
                <Form.Check
                  inline
                  label={subject.name}
                  type="checkbox"
                  key={subject.id}
                  value={subject.id}
                  className="col-3"
                  onClick={this.onChangeSubject}
                />
              ))}
              <br />
              {this.state.errs.tutorSubjects?.message && (
                <Form.Text className="text-danger ">
                  {this.state.errs.tutorSubjects?.message}
                </Form.Text>
              )}
              <br />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withAlert()(CreateTutor);
