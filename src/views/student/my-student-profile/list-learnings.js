import { Avatar, List } from "antd";
import { Component } from "react";

class ListLearnings extends Component {
  render() {
    const { student } = this.props;
    return (
      <List
        itemLayout="horizontal"
        dataSource={student?.learnings}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar shape="square" size={40} src={item.subject?.image} />
              }
              title={item.subject?.name}
            />
          </List.Item>
        )}
      />
    );
  }
}

export default ListLearnings;
