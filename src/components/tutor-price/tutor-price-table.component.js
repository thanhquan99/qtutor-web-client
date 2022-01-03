import { Table } from "antd";
import React, { Component } from "react";
import { withAlert } from "react-alert";

class TutorPriceTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTutor: {},
    };
  }

  async componentDidMount() {}

  render() {
    const columns = [
      {
        title: "Subject",
        dataIndex: "subject",
        key: "subject",
      },
      {
        title: "Session",
        dataIndex: "sessionsOfWeek",
        key: "sessionsOfWeek",
        render: (sessions) => <span>{sessions} days/week</span>,
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (price) => (
          <span style={{ color: "#8B8B83" }}>
            {parseInt(price).toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        ),
      },
    ];
    const { teachingPrices } = this.props.tutor;
    const data = teachingPrices?.map((e)=>(
      {
        key: e.id,
        subject: e.subject?.name,
        price: e.price,
        sessionsOfWeek: e.sessionsOfWeek,
      }
    ))
    return <Table columns={columns} dataSource={data} pagination={false} />;
  }
}

export default withAlert()(TutorPriceTable);
