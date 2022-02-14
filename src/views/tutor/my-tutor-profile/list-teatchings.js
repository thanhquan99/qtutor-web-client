import { Avatar, List } from "antd";
import { Component } from "react";

class ListTeachings extends Component {
  render() {
    const { tutor } = this.props;
    return (
      <List
        itemLayout="horizontal"
        dataSource={tutor?.teachings}
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

export default ListTeachings;
