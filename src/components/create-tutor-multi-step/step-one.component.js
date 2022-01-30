import { Col, Row, Select, Button, Input, Form } from "antd";
import _ from "lodash";
import React, { Component } from "react";
import { withAlert } from "react-alert";
import subjectService from "../../api-services/subject.service";
import CreateTutorContext from "../../contexts/create-tutor.context";
import './style.css'
class CreateTutorStepOne extends Component {
  static contextType = CreateTutorContext;
  constructor(props) {
    super(props);

    this.onSearchSubject = this.onSearchSubject.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onFinish = this.onFinish.bind(this);

    this.state = {
      subjects: [],
      tutorSubjects: [],
    };
  }

  async componentDidMount() {
    const { alert } = this.props;
    const { results: subjects } = await subjectService.getMany({
      alert,
      qs: { perPage: 5 },
    });
    this.setState((curState) => ({ ...curState, subjects, tutorSubjects: this.context.payload?.tutorSubjects }));
  }

  onChangeSubject(values, elements) {
    this.setState((curState) => ({
      ...curState,
      tutorSubjects: elements.map((e) => ({ subjectId: e.key })),
    }));
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

  onFinish(values) {
    this.context.payload = {
      ...values,
      tutorSubjects: this.state.tutorSubjects,
    };
    this.props.handleNextStep();
  }

  render() {
    const { payload } = this.context;
    return (
      <div className="create-student">
        <Row className="justify-content-md-center"
      
        >
          <Col
           xs={10}
           style={{
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' ,
            padding: "50px 60px",
            background: "white",
            margin: "40px 0"
          }}
           className="">
            <h2 className="">Become a Tutor</h2>
            <Form
              name="basic"
           
              onFinish={this.onFinish}
              initialValues={{
                description: payload?.description,
                subjects: payload?.subjects,
              }}
            >
                              <p>Description</p>
              <Form.Item
              
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please write some thing about your teaching",
                  },
                ]}
              >
                <Input.TextArea placeholder="Some thing about your teaching" />
              </Form.Item>
              <p>Subject</p>
              <Form.Item
                name="subjects"
                rules={[
                  {
                    required: true,
                    message: "Select a least 1 subject",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select one subject"
                  onSearch={this.onSearchSubject}
                  onChange={this.onChangeSubject}
                  optionLabelProp="label"
                >
                  {this.state.subjects?.map((subject) => (
                    <Select.Option key={subject.id} value={subject.name}>
                      {subject.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button size="large" type="primary" htmlType="submit">
                  Next
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withAlert()(CreateTutorStepOne);
