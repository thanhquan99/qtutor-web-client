import { Component } from "react";
import { withAlert } from "react-alert";
import { ACADEMIC_ACTION, DEFAULT_AVATAR } from "../../constant";
import { withRouter } from "react-router-dom";
import { Row, Space } from "antd";
import { FaStar, FaComment } from "react-icons/fa";
import GenderComponent from "../reuse/profile/gender.component";

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
      <div className="card">
        <div className="card-body" onClick={this.onClickCard}>
          <div className="d-flex flex-column align-items-center text-center">
            <img
              src={DEFAULT_AVATAR}
              alt="Admin"
              className="rounded-circle"
              width="150"
            />
          </div>

          <Row>
            <Space>
              <b>{tutor?.profile?.name}</b>
              <GenderComponent
                isMale={tutor?.profile?.isMale}
              ></GenderComponent>
            </Space>
          </Row>
          <Row>
            <span>
              {tutor?.profile?.city?.name ? (
                `Live at ${tutor?.profile?.city?.name}`
              ) : (
                <br />
              )}
            </span>
          </Row>
          <Row>
            <span>
              {tutor?.profile?.academicLevel ? (
                tutor?.profile?.academicLevel
              ) : (
                <br />
              )}
            </span>
          </Row>
          <Row>
            <span>
              {tutor?.profile?.workLocation ? (
                `${ACADEMIC_ACTION[tutor?.profile?.academicLevel]} at ${
                  tutor?.profile?.workLocation
                }`
              ) : (
                <br />
              )}
            </span>
          </Row>
          <Row>
            <Space>
              <span>
                <FaStar style={{ color: "#66CDAA" }}></FaStar> 4.3
              </span>
              <span>
                <FaComment style={{ color: "#FFCC99" }}></FaComment> 29
              </span>
            </Space>
          </Row>
          <Row>
            <span style={{ color: "#8B8B83" }}>
              {tutor?.minimumSalary ? (
                parseInt(tutor?.minimumSalary).toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })
              ) : (
                <br />
              )}
            </span>
          </Row>
        </div>
      </div>
    );
  }
}

export default withAlert()(withRouter(TutorCard));
