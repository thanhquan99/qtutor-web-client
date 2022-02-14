import { Avatar, Button, List } from "antd";
import { Component } from "react";
import ModalTeachingEdit from "./modal-teaching-edit";

class ListAbilityTeachings extends Component {
  render() {
    const { tutor } = this.props;
    return (
      <List
        itemLayout="horizontal"
        dataSource={tutor?.tutorSubjects}
        renderItem={(item) => (
          <List.Item actions={[<ModalTeachingEdit tutorSubject={item} />]}>
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

export default ListAbilityTeachings;
