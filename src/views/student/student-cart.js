import { Component } from "react";
import { withAlert } from "react-alert";
import { FaComment, FaStar } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import { ACADEMIC_ACTION } from "../../constant";
import GenderComponent from "../reuse/profile/gender.component";

class StudentCard extends Component {
  constructor(props) {
    super(props);
    this.onClickCard = this.onClickCard.bind(this);
    this.state = {
      students: [],
    };
  }

  onClickCard() {
    const { students } = this.props;
    this.props.history.push("/students/" + students.id);
  }

  render() {
    const { students } = this.props;
    return (
      <div style={{border:'none'}} className="card hover-card">
        <div className="card-body" onClick={this.onClickCard}>
            <img
              src="https://cdn.mytutor.co.uk/images/tutor-profiles/135969.180_1-1_8.jpg?v=0"
              alt="Admin"
              className="rounded-circle"
              width="180px"
            />
            <div className="item-card">
              <b style={{marginRight:'5px'}}>{students?.profile?.name}</b>
              <GenderComponent
                isMale={students?.profile?.isMale}
              ></GenderComponent>
            </div>
            <div className="item-card" style={{ color: "#8B8B83" }}>
              {students?.minimumSalary ? (
                parseInt(students?.minimumSalary).toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })
              ) : (
                <br />
              )}
            </div>
            <div className="item-card">
              {students?.profile?.city?.name ? (
                `Live at ${students?.profile?.city?.name}`
              ) : (
                <br />
              )}
            </div>
            <div className="">
              {students?.profile?.academicLevel ? (
                students?.profile?.academicLevel
              ) : (
                <br />
              )}
            </div>
            <div className="">
              {students?.profile?.workLocation ? (
                `${ACADEMIC_ACTION[students?.profile?.academicLevel]} at ${
                  students?.profile?.workLocation
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
