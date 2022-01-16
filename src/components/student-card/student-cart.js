import { Component } from "react";
import { withAlert } from "react-alert";
import { FaComment, FaStar } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import { ACADEMIC_ACTION, DEFAULT_AVATAR } from "../../constant";
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
    const { student} = this.props;
    this.props.history.push("/students/" + student.id);
  }

  render() {
    const { student } = this.props;
    return (
      <div style={{border:'none'}} className="card hover-card">
        <div className="card-body" onClick={this.onClickCard}>
        <img
              src={student?.profile?.avatar || DEFAULT_AVATAR}
              alt="Admin"
              width= "100%"
              height= {150}
            />
            <div className="item-card">
              <b style={{marginRight:'5px'}}>{student?.profile?.name}</b>
              <GenderComponent
                isMale={student?.profile?.isMale}
              ></GenderComponent>
            </div>
            <div className="item-card" style={{ color: "#8B8B83" }}>
              {student?.minimumSalary ? (
                parseInt(student?.minimumSalary).toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })
              ) : (
                <br />
              )}
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
            <div className="">
              {student?.profile?.workLocation ? (
                `${ACADEMIC_ACTION[student?.profile?.academicLevel]} at ${
                  student?.profile?.workLocation
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

export default withAlert()(withRouter(StudentCard));
