import { Button } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
import { GiNotebook } from "react-icons/gi";
import { WEB_CLIENT_URL } from "../../../constant";

class StudentIcon extends Component {
  gotoMyStudentProfile = async () => {
    window.open(`${WEB_CLIENT_URL}/students/me`, "_self");
  };

  render() {
    return (
      <div className="grop-number">
        <Button onClick={this.gotoMyStudentProfile}>
          <GiNotebook style={{ width: 50, height: "100%" }} />
        </Button>
      </div>
    );
  }
}

export default StudentIcon;
