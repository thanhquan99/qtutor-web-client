import { Col, Row, Space, Tabs } from "antd";
import { Component } from "react";
import { FcPlanner } from "react-icons/fc";
import { GiNotebook } from "react-icons/gi";
import { AiOutlineStar } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import TutorSchedule from "../tutor-schedule";
import TutorCVBasicInfo from "./basic-information";
import "./style.css";
import TutorCVSubjects from "./subjects";
import TeachingSummaryCVTab from "./teaching-summary.js";
import WorkExperienceCVTab from "./work-experience";
import TutorRating from "../tutor-rating";
const { TabPane } = Tabs;

class TutorCVDetail extends Component {
  state = {};

  render() {
    const { tutor } = this.props;
    return (
      <Row>
        <Col
          span={6}
          offset={1}
          style={{ backgroundColor: "whitesmoke", padding: 15 }}
        >
          <TutorCVBasicInfo tutor={tutor} />
          <TutorCVSubjects tutor={tutor} />
        </Col>

        <Col
          span={15}
          offset={1}
          style={{ backgroundColor: "whitesmoke", padding: 15 }}
        >
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <Space>
                  <MdWork />
                  <span>Teaching Experience</span>
                </Space>
              }
              key="1"
            >
              <WorkExperienceCVTab tutor={tutor} />
            </TabPane>
            <TabPane
              tab={
                <Space>
                  <GiNotebook />
                  <span>Teachings</span>
                </Space>
              }
              key="2"
            >
              <TeachingSummaryCVTab tutor={tutor} />
            </TabPane>
            <TabPane
              tab={
                <Space>
                  <FcPlanner />
                  <span>Free Time</span>
                </Space>
              }
              key="3"
            >
              <TutorSchedule schedule={tutor?.schedules} />
            </TabPane>
            <TabPane
              tab={
                <Space>
                  <AiOutlineStar />
                  <span>Rating</span>
                </Space>
              }
              key="4"
            >
              <TutorRating tutor={tutor} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

export default TutorCVDetail;
