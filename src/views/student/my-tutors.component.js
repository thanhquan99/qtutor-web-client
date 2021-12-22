import React, { Component } from "react";
import { withAlert } from "react-alert";
import { Container } from "react-bootstrap";
import "./style.css"
class MyTutors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTutor: {},
    };
  }

  async componentDidMount() {
  }

  render() {
    return <Container>COMING SOON</Container>;
  }
}

export default withAlert()(MyTutors);
