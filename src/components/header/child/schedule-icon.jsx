import { Button } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { WEB_CLIENT_URL } from "../../../constant";

class ScheduleIcon extends Component {
  gotoMySchedule = async () => {
    window.open(`${WEB_CLIENT_URL}/schedule/me`, "_self");
  };

  render() {
    return (
      <div className="grop-number">
        <Button onClick={this.gotoMySchedule}>
          <AiOutlineSchedule style={{ width: 50, height: "100%" }} />
        </Button>
      </div>
    );
  }
}

export default ScheduleIcon;
