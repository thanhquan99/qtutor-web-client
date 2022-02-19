import { Button } from "antd";
import React from "react";
import TimeAgo from "react-timeago";
import "./style.css";
import notificationApi from "../../../api/notification.api";
import tutorStudentApi from "../../../api/tutor-student.api";
import { TUTOR_STUDENT_STATUS, WEB_CLIENT_URL } from "../../../constant";

const NotificationItem = ({ data, hide, handleUpdateOne }) => {
  const handleClickItem = async () => {
    if (!data.isRead) {
      const updatedData = await notificationApi.updateOne(data.id, {
        isRead: true,
      });
      if (updatedData) {
        handleUpdateOne(updatedData);
      }
    }
    window.open(`${WEB_CLIENT_URL}/${data.url}`, "_self");
  };

  const handleAccept = async () => {
    const updatedTeaching = await tutorStudentApi.updateOne(data.extraId, {
      status: TUTOR_STUDENT_STATUS.ACCEPTED,
    });
    hide();
    if (updatedTeaching) {
      handleUpdateOne(updatedTeaching.notification);
    }
  };

  const handleCancel = async () => {
    const updatedTeaching = await tutorStudentApi.updateOne(data.extraId, {
      status: TUTOR_STUDENT_STATUS.CANCEL,
    });
    hide();
    if (updatedTeaching) {
      handleUpdateOne(updatedTeaching.notification);
    }
  };

  const backgroundColor = data.isRead ? "white" : "whitesmoke";

  return (
    <div className="wrap-notifi" style={{ backgroundColor }}>
      <div onClick={handleClickItem} className="item-notifi">
        <div className="group__left">
          <div className="avt">
            <img src={data.sender?.profile?.avatar} alt="" />
          </div>
          <div className="text">
            <div style={{ marginTop: "3px" }} className="messenger">
              <p dangerouslySetInnerHTML={{ __html: data.message }} />
            </div>
          </div>
        </div>

        <div style={{ color: "#888" }} className="time">
          <TimeAgo date={data.createdAt} />
        </div>
      </div>
      {data.type === "Edit" && (
        <div className="group__button">
          <Button
            onClick={handleAccept}
            style={{ marginRight: "5px" }}
            type="primary"
          >
            Accept
          </Button>
          <Button onClick={handleCancel} className="cancel" type="primary">
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};
export default NotificationItem;
