import _ from "lodash";
import React, { Component } from "react";
import { withAlert } from "react-alert";
import subjectService from "../../api-services/subject.service";
import tutorService from "../../api-services/tutor.service";
import { invalidSetState, validSetState } from "../utils";
import CreateTutorStepOne from "./create-tutor-multi-step/step-one.component";
import CreateTutorStepTwo from "./create-tutor-multi-step/step-two.component";

class CreateTutor extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onSearchSubject = this.onSearchSubject.bind(this);
    this.handleNextStep = this.handleNextStep.bind(this);
    this.handlePreviousStep = this.handlePreviousStep.bind(this);

    this.handleCreateTutor = this.handleCreateTutor.bind(this);

    this.state = {
      currentTutor: {},
      subjects: [],
      step: 1,
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

  onChangeSubject(values, elements) {
    if (_.isEmpty(values)) {
      this.setState((curState) => {
        return invalidSetState({
          curState,
          fieldName: "tutorSubjects",
          message: "Select at least 1 subject",
        });
      });
      this.setState((curState) => ({
        ...curState,
        payload: { ...curState.payload, tutorSubjects: [] },
      }));
      return;
    }
    this.setState((curState) => {
      return validSetState({
        curState,
        fieldName: "tutorSubjects",
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

  handleNextStep() {
    this.setState((curState) => ({
      ...curState,
      step: curState.step + 1,
    }));
  }

  handlePreviousStep() {
    this.setState((curState) => ({
      ...curState,
      step: curState.step - 1,
    }));
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
    switch (this.state.step) {
      case 1:
        return <CreateTutorStepOne handleNextStep={this.handleNextStep} />;
      case 2:
        return <CreateTutorStepTwo handlePreviousStep={this.handlePreviousStep} />;
      default:
        break;
    }
  }
}

export default withAlert()(CreateTutor);
