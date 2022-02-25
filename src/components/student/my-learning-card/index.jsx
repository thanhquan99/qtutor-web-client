/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./style.css";
import GenderComponent from "../../profile/gender.component";
import { Avatar, Tag, Space, Button } from "antd";
import { DEFAULT_AVATAR, TUTOR_STUDENT_STATUS } from "../../../constant";
import { UserOutlined } from "@ant-design/icons";
import tutorStudentApi from "../../../api/tutor-student.api";
import LearningDetail from "./learning-detail.js";

const MyLearningCard = ({
  data,
  handleUpdateLearning,
  handleRemoveLearning,
}) => {
  const onAccept = async () => {
    const res = await tutorStudentApi.updateOne(data.id, {
      status: TUTOR_STUDENT_STATUS.ACCEPTED,
    });
    if (res) {
      handleUpdateLearning(res);
    }
  };

  const onCancel = async () => {
    const res = await tutorStudentApi.updateOne(data.id, {
      status: TUTOR_STUDENT_STATUS.CANCEL,
    });
    if (res) {
      handleRemoveLearning(data);
    }
  };

  return (
    <div className="my__tudents">
      <div style={{ border: "none" }} className="card hover-card">
        <div className="card-body">
          <img
            src={data.subject?.image}
            alt="Admin"
            width="100%"
            height={150}
          />
          <div className="item-card mt-2">
            <b style={{ marginRight: "5px" }}>{data?.subject?.name}</b>
          </div>
          <div className="item-card" style={{ color: "#8B8B83" }}>
            {new Intl.NumberFormat().format(data?.salary)}
          </div>
          <div className="item-card">
            <Avatar
              size={40}
              icon={<UserOutlined />}
              src={data.tutor?.profile?.avatar || DEFAULT_AVATAR}
            />
            {data && data.tutor?.profile?.name}
            <GenderComponent
              isMale={data && data.tutor?.profile?.isMale}
            ></GenderComponent>
          </div>
          <div className="mt-2">
            {data.status === TUTOR_STUDENT_STATUS.ACCEPTED ? (
              <>
                <Tag color="success">Learning</Tag>
                <LearningDetail learning={data} />
              </>
            ) : null}
            {data.status === TUTOR_STUDENT_STATUS.WAITING_STUDENT_ACCEPT ? (
              <Tag color="geekblue">Waiting for you accept</Tag>
            ) : null}
            {data.status === TUTOR_STUDENT_STATUS.WAITING_TUTOR_ACCEPT ? (
              <Tag color="volcano">{data.status}</Tag>
            ) : null}
          </div>
          <div className="item-card">
            {data.status === TUTOR_STUDENT_STATUS.WAITING_STUDENT_ACCEPT ? (
              <Space size={"large"}>
                <Button type="primary" onClick={onAccept}>
                  Accept
                </Button>
                <Button type="ghost" onClick={onCancel}>
                  Cancel
                </Button>
              </Space>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyLearningCard;
