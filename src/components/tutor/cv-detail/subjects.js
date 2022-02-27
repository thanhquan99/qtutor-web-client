import { Avatar, Button, Divider, List, Space } from "antd";
import { Component } from "react";
import ModalCreateTeaching from "../modal-create-teaching";
import { RiDeleteBinLine } from "react-icons/ri";
import tutorSubjectApi from "../../../api/tutor-subject.api";

class TutorCVSubjects extends Component {
  state = {
    subjects: [],
  };

  componentDidMount = () => {
    const { tutor } = this.props;
    this.setState({ subjects: tutor.tutorSubjects });
  };

  handleCreateSubject = (subject) => {
    this.setState({ subjects: [subject].concat(this.state.subjects) });
  };

  async deleteSubject(subject) {
    const res = await tutorSubjectApi.deleteOne(subject.id);
    if (res) {
      this.setState({
        subjects: this.state.subjects.filter((e) => e.id !== subject.id),
      });
    }
  }

  render() {
    const { subjects } = this.state;
    return (
      <>
        <Divider orientation="left">
          <Space size="large">
            <b style={{ fontSize: 20 }}>Subjects</b>
            <ModalCreateTeaching
              handleCreateSubject={this.handleCreateSubject}
            />
          </Space>
        </Divider>
        <List
          itemLayout="horizontal"
          dataSource={subjects}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar size={50} shape="square" src={item.subject?.image} />
                }
                title={
                  <Space size="middle">
                    <b>{item.subject?.name}</b>
                    <Button
                      onClick={async () => {
                        await this.deleteSubject(item);
                      }}
                    >
                      <RiDeleteBinLine />
                    </Button>
                  </Space>
                }
                description={
                  <span style={{ fontWeight: "bold" }}>
                    {new Intl.NumberFormat().format(item.price)}/lessons{" "}
                    {item.sessionsOfWeek}days/week
                  </span>
                }
              />
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default TutorCVSubjects;
