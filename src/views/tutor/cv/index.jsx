import { Component } from "react";
import TutorCVDetail from '../../../components/tutor/cv-detail'

class MyTutorCVView extends Component {
  state={

  }

  render() {
    const { tutor } = this.props;
    return (
      <TutorCVDetail />
    );
  }
}

export default MyTutorCVView;
