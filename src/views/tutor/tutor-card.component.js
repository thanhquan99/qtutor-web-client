import { Component } from "react";
import { withAlert } from "react-alert";
import { ACADEMIC_ACTION, DEFAULT_AVATAR } from "../../constant";
import { withRouter } from "react-router-dom";
import { Row, Space,Col } from "antd";
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
    console.log(tutor,"turot")
    this.props.history.push("/tutors/" + tutor.id);
  }

  render() {
    const { tutor } = this.props;
    return (
      <div style={{border:'none'}} className="card hover-card">
        <div className="card-body" onClick={this.onClickCard}>
          <Row>
            <Col span={10} >
            <img
              src={DEFAULT_AVATAR}
              alt="Admin"
              className="rounded-circle"
              width="180px"
            />
            </Col>
            <Col style={{paddingLeft:'10px'}} span={14}>
            <div className="nameAndGender">
              <b style={{marginRight:'5px'}}>{tutor?.profile?.name}</b>
              <GenderComponent
                isMale={tutor?.profile?.isMale}
              ></GenderComponent>
            </div>
            <div className="nameAndGender">
              {tutor?.profile?.city?.name ? (
                `Live at ${tutor?.profile?.city?.name}`
              ) : (
                <br />
              )}
            </div>
            <div className="nameAndGender">
              {tutor?.profile?.academicLevel ? (
                tutor?.profile?.academicLevel
              ) : (
                <br />
              )}
            </div>
            <div className="nameAndGender">
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
            <div className="nameAndGender" style={{ color: "#8B8B83" }}>
              {tutor?.minimumSalary ? (
                parseInt(tutor?.minimumSalary).toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })
              ) : (
                <br />
              )}
            </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withAlert()(withRouter(TutorCard));
