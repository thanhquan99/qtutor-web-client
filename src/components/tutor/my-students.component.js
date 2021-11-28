import React, { Component } from "react";
import { withAlert } from "react-alert";
import { Container } from "react-bootstrap";

class MyStudents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTutor: {},
    };
  }

  async componentDidMount() {
    console.log("hello");
  }

  render() {
    return <Container>COMING SOON</Container>;
  }
}

export default withAlert()(MyStudents);
