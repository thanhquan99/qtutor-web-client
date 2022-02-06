import { Component } from "react";
import { FaComment, FaStar } from "react-icons/fa";
import {
  ACADEMIC_ACTION,
  DEFAULT_AVATAR,
  WEB_CLIENT_URL,
} from "../../../constant";
import GenderComponent from "../../profile/gender.component";
import "./style.css";

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
    window.open(`${WEB_CLIENT_URL}/tutors/${tutor.id}`, "_blank");
  }

  render() {
    const { tutor } = this.props;
    return (
      <div style={{ border: "none" }} className="card hover-card">
        <div className="card-body" onClick={this.onClickCard}>
          <div className="avtTT">
            <img
              src={tutor?.profile?.avatar || DEFAULT_AVATAR}
              alt="Admin"
              width="120"
              height="160"
            />
          </div>

          <div className="item-card">
            <b style={{ marginRight: "5px" }}>{tutor?.profile?.name}</b>
            <GenderComponent isMale={tutor?.profile?.isMale}></GenderComponent>
          </div>
          <div className="item-card" style={{ color: "#8B8B83" }}>
            {tutor?.minimumSalary ? (
              new Intl.NumberFormat().format(tutor?.minimumSalary)
            ) : (
              <br />
            )}
          </div>
          <div className="item-card">
            {tutor?.profile?.city?.name ? (
              `Live at ${tutor?.profile?.city?.name}`
            ) : (
              <br />
            )}
          </div>
          <div className="">
            {tutor?.profile?.academicLevel ? (
              tutor?.profile?.academicLevel
            ) : (
              <br />
            )}
          </div>
          <div className="">
            {tutor?.profile?.workLocation ? (
              `${ACADEMIC_ACTION[tutor?.profile?.academicLevel]} at ${
                tutor?.profile?.workLocation
              }`
            ) : (
              <br />
            )}
          </div>

          <div className="nameAndGender">
            <span>
              <FaStar style={{ color: "#66CDAA" }}></FaStar> 4.3
            </span>
            <span>
              <FaComment style={{ color: "#FFCC99" }}></FaComment> 29
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default TutorCard;
