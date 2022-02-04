import { Button } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
import { GiTeacher } from "react-icons/gi";
import { WEB_CLIENT_URL } from "../../../constant";

class TutorIcon extends Component {
  gotoMyTutorProfile = async () => {
    window.open(`${WEB_CLIENT_URL}/tutors/me`, "_self");
  };

  render() {
    return (
      <div className="grop-number">
        <Button onClick={this.gotoMyTutorProfile}>
          <GiTeacher style={{ width: 50, height: "100%" }} />
        </Button>
      </div>
    );
  }
}

export default TutorIcon;
