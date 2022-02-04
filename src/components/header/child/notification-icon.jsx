import { BellOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
import { getNotifiNumber } from "../../../api/notification";
import Notification from "../../notification";

class NotificationIcon extends Component {
  state = {
    visible: false,
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };

  async componentDidMount() {
    const { totalUnread } = await getNotifiNumber();

    this.setState({
      numberNotificationUnRead: totalUnread,
    });
  }

  render() {
    const { numberNotificationUnRead } = this.state;
    return (
      <Popover
        placement="bottomRight"
        content={<Notification hide={this.hide} />}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <div className="grop-number">
          <BellOutlined className="far" />
          {numberNotificationUnRead ? (
            <div className="chil">
              <span>{numberNotificationUnRead}</span>
            </div>
          ) : null}
        </div>
      </Popover>
    );
  }
}

export default NotificationIcon;
