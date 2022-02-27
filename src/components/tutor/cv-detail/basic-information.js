import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { Avatar, Col, Divider, Row, Space } from "antd";
import { Component } from "react";
import { FaBusinessTime } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

class TutorCVBasicInfo extends Component {
  state = {};

  render() {
    const { tutor } = this.props;
    const user = JSON.parse(localStorage.getItem("user"));
    return (
      <>
        <Row>
          <Col span={24} align="middle">
            <Avatar size={200} src={tutor.profile?.avatar} />
          </Col>
        </Row>
        <Row>
          <Col span={24} align="middle">
            <b>{tutor.profile?.name}</b>
          </Col>
        </Row>
        <Row>
          <Col span={24} align="middle">
            <p>{tutor.profile?.academicLevel}</p>
          </Col>
        </Row>
        <Row>
          <Divider orientation="left">
            <b style={{ fontSize: 20 }}>Personal Information</b>
          </Divider>
        </Row>
        <Row>
          <Space size="large">
            <MdLocationOn />
            <span>{tutor.profile?.city?.name}</span>
          </Space>
        </Row>
        <Row>
          <Space size="large">
            <MailOutlined />
            <span style={{ fontSize: 20 }}>{user.email}</span>
          </Space>
        </Row>
        <Row>
          <Space size="large">
            <PhoneOutlined />
            <span>123456789</span>
          </Space>
        </Row>
        <Row>
          <Space size="large">
            <FaBusinessTime />
            <span>{tutor.yearsExperience} years experience</span>
          </Space>
        </Row>
      </>
    );
  }
}

export default TutorCVBasicInfo;
