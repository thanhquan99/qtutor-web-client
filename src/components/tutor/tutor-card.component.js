import { Component } from "react";
import { withAlert } from "react-alert";
import { DEFAULT_AVATAR } from "../../constant";
import { withRouter } from 'react-router-dom';

class TutorCard extends Component {
  constructor(props) {
    super(props);
    this.onClickCard = this.onClickCard.bind(this);
    this.state = {
      tutors: [],
    };
  }

  onClickCard() {
    const { tutor } = this.props;
    this.props.history.push("/tutors/" + tutor.id);
  }

  render() {
    const { tutor } = this.props;
    return (
      <div className="card pd-3">
        <div className="card-body" onClick={this.onClickCard}>
          <div className="d-flex flex-column align-items-center text-center">
            <img
              src={DEFAULT_AVATAR}
              alt="Admin"
              className="rounded-circle"
              width="150"
            />
            <div className="mt-3">
              <h4>{tutor?.profile?.name}</h4>
              <p className="text-secondary mb-1">
                Studying at Da Nang University
              </p>
              <p className="text-muted font-size-sm">
                Live at {tutor.profile?.city?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(withRouter(TutorCard));
