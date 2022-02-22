import { Component } from "react";
import { DEFAULT_AVATAR, WEB_CLIENT_URL } from "../../constant";
import GenderComponent from "../profile/gender.component";

class StudentCard extends Component {
  constructor(props) {
    super(props);
    this.onClickCard = this.onClickCard.bind(this);
    this.state = {
      student: [],
    };
  }

  onClickCard() {
    const { student } = this.props;
    window.open(`${WEB_CLIENT_URL}/students/${student.id}`, "_self");
  }

  render() {
    const { student } = this.props;
    return (
      <div style={{ border: "none" }} className="card hover-card">
        <div className="card-body" onClick={this.onClickCard}>
          <img
            src={student?.profile?.avatar || DEFAULT_AVATAR}
            alt="Admin"
            width="120"
            height="160"
          />
          <div className="item-card">
            <b style={{ marginRight: "5px" }}>{student?.profile?.name}</b>
            <GenderComponent
              isMale={student?.profile?.isMale}
            ></GenderComponent>
          </div>
          <div className="item-card">
            {student?.profile?.city?.name ? (
              `Live at ${student?.profile?.city?.name}`
            ) : (
              <br />
            )}
          </div>
          <div className="">
            {student?.profile?.academicLevel ? (
              student?.profile?.academicLevel
            ) : (
              <br />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default StudentCard;
