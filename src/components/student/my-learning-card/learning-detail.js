import { Button, Modal, Row } from "antd";
import React, { Component } from "react";
import studentApi from "../../../api/student.api";
import StudentSchedule from "../student-schedule";

class LearningDetail extends Component {
  state = {
    visible: false,
    learningDetail: {},
  };

  componentDidMount = async () => {
    const { learning } = this.props;
    const res = await studentApi.getMyLearningDetail(learning.id);
    if (res) {
      this.setState({ learningDetail: res });
    }
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { learningDetail } = this.state;
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
          width={600}
        >
          <div class="container bootstrap snippets bootdey">
            <div class="row">
              <div class="col-lg-6 col-sm-6">
                <div class="circle-tile ">
                  <div class="circle-tile-heading dark-blue">
                    <i class="fa fa-book fa-fw fa-3x"></i>
                  </div>
                  <div class="circle-tile-content dark-blue">
                    <div class="circle-tile-description text-faded">
                      Total Lessons
                    </div>
                    <div class="circle-tile-number text-faded ">
                      {learningDetail?.totalLessons}
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 col-sm-6">
                <div class="circle-tile ">
                  <div class="circle-tile-heading blue">
                    <i class="fa fa-dollar fa-fw fa-3x"></i>
                  </div>
                  <div class="circle-tile-content blue">
                    <div class="circle-tile-description text-faded">
                      Total Fee
                    </div>
                    <div class="circle-tile-number text-faded ">
                      {new Intl.NumberFormat().format(
                        learningDetail?.totalMoney
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="container bootstrap snippets bootdey">
            <div class="row">
              <div class="col-lg-6 col-sm-6">
                <div class="circle-tile ">
                  <div class="circle-tile-heading green ">
                    <i class="fa fa-check fa-fw fa-3x"></i>
                  </div>
                  <div class="circle-tile-content green">
                    <div class="circle-tile-description text-faded">
                      Total Paid
                    </div>
                    <div class="circle-tile-number text-faded ">
                      {new Intl.NumberFormat().format(
                        learningDetail?.totalPaid
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 col-sm-6">
                <div class="circle-tile ">
                  <div class="circle-tile-heading red">
                    <i class="fa fa-spinner fa-fw fa-3x"></i>
                  </div>
                  <div class="circle-tile-content red">
                    <div class="circle-tile-description text-faded">
                      Total Unpaid
                    </div>
                    <div class="circle-tile-number text-faded ">
                      {new Intl.NumberFormat().format(
                        learningDetail?.totalUnpaid
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <StudentSchedule schedule={learningDetail?.schedules || []} />
          </Row>
        </Modal>
      </>
    );
  }
}

export default LearningDetail;
