import { Avatar, List } from "antd";
import { Component } from "react";
import ModalLearningEdit from "./modal-learning-edit";

class ListDesiredLearnings extends Component {
  render() {
    const { student } = this.props;
    return (
      <List
        itemLayout="horizontal"
        dataSource={student?.studentSubjects}
        renderItem={(item) => (
          <List.Item actions={[<ModalLearningEdit studentSubject={item} />]}>
            <List.Item.Meta
              avatar={
                <Avatar shape="square" size={40} src={item.subject?.image} />
              }
              title={item.subject?.name}
              description={`${item.sessionsOfWeek}days/week`}
            />
            <div>{`${new Intl.NumberFormat().format(item.price)}/lesson`}</div>
          </List.Item>
        )}
      />
    );
  }
}

export default ListDesiredLearnings;
