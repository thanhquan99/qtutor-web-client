import { Table } from "antd";
import React, { Component } from "react";

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
            {new Intl.NumberFormat().format(price)}/lesson
          </span>
        ),
      },
    ];
    const { tutor } = this.props;
    const data = tutor.tutorSubjects?.map((e) => ({
      key: e.id,
      subject: e.subject?.name,
      price: e.price,
      sessionsOfWeek: e.sessionsOfWeek,
    }));
    return <Table columns={columns} dataSource={data} pagination={false} />;
  }
}

export default TutorPriceTable;
