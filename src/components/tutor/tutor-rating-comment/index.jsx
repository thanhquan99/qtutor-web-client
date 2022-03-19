import { Button, Form, Input, Rate } from "antd";
import React, { Component } from "react";
import tutorApi from "../../../api/tutor.api";
import eventBus from "../../../common/EventBus";
import requestPN from "request-promise-native";

class TutorRatingComment extends Component {
  state = {
    isCommentVisible: false,
  };

  componentDidMount = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const res = await tutorApi.getRatedExamination(this.props.tutor?.id);
      if (res) {
        this.setState({ isCommentVisible: res.canRating });
      }
    }
  };

  onFinish = async (values) => {
    const rating = await tutorApi.createRating(this.props.tutor?.id, values);
    if (rating) {
      eventBus.dispatch("createTutorRating", rating);
      this.setState({ isCommentVisible: false });
      // await requestPN.get('http://127.0.0.1:8000/cf-execution');
    }
  };

  render() {
    const { isCommentVisible } = this.state;
    return isCommentVisible ? (
      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 10 }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="rating"
          rules={[{ required: true, message: "Required" }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item
          name="comment"
          rules={[{ required: true, message: "Required" }]}
          wrapperCol={{ span: 24 }}
        >
          <Input.TextArea
            placeholder="Your comment"
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 6, offset: 0 }}>
          <Button type="primary" htmlType="submit">
            Comment
          </Button>
        </Form.Item>
      </Form>
    ) : (
      <></>
    );
  }
}

export default TutorRatingComment;
