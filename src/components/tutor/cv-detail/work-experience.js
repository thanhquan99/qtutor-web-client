import { Button, Divider, Row, Space } from "antd";
import { Component } from "react";
import { IoIosRocket } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import tutorExperienceApi from "../../../api/tutor-experience.api";
import ModalCreateExperience from "../modal-create-experience";

class WorkExperienceCVTab extends Component {
  state = {
    experiences: [],
  };

  componentDidMount = () => {
    const { tutor } = this.props;
    console.log(tutor);
    this.setState({ experiences: tutor.experiences });
  };

  handleCreateExperience = (experience) => {
    this.setState({ experiences: this.state.experiences.concat([experience]) });
  };

  async deleteSubject(experience) {
    const res = await tutorExperienceApi.deleteOne(experience.id);
    if (res) {
      this.setState({
        experiences: this.state.experiences.filter(
          (e) => e.id !== experience.id
        ),
      });
    }
  }

  render() {
    const { experiences } = this.state;
    return (
      <div style={{ padding: 50 }}>
        <ModalCreateExperience
          handleCreateExperience={this.handleCreateExperience}
        />
        {experiences?.map((e, index) => (
          <div key={index}>
            <Row>
              <h3 style={{ fontWeight: "bold" }}>
                <Space size="large">
                  <IoIosRocket /> {e.title}
                  <Button
                    onClick={async () => {
                      await this.deleteSubject(e);
                    }}
                  >
                    <RiDeleteBinLine />
                  </Button>
                </Space>
              </h3>
            </Row>
            <Row>
              <h5 style={{ marginTop: 10 }}>{e.description}</h5>
            </Row>
            <Divider />
          </div>
        ))}
      </div>
    );
  }
}

export default WorkExperienceCVTab;
