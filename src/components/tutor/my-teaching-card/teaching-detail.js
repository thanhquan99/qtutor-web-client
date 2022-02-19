import { Button, Col, Modal, Row, Statistic } from "antd";
import React, { Component } from "react";
import tutorApi from "../../../api/tutor.api";
import TutorSchedule from "../tutor-schedule";

class TeachingDetail extends Component {
  state = {
    visible: false,
    teachingDetail: {},
  };

  componentDidMount = async () => {
    const { teaching } = this.props;
    const res = await tutorApi.getMyTeachingDetail(teaching.id);
    if (res) {
      this.setState({ teachingDetail: res });
    }
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { teachingDetail } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Detail
        </Button>
        <Modal
          title="Teaching Detail"
          visible={this.state.visible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="Total Lessons"
                value={teachingDetail?.totalLessons}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total Earn"
                value={teachingDetail?.totalMoney}
              />
            </Col>
            <Col span={12}>
              <Statistic title="Total Paid" value={teachingDetail?.totalPaid} />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total Unpaid"
                value={teachingDetail?.totalUnpaid}
              />
            </Col>
          </Row>
          <Row>
            <TutorSchedule schedule={teachingDetail?.schedules || []} />
          </Row>
        </Modal>
      </>
    );
  }
}

export default TeachingDetail;
