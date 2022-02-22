import { Table } from "antd";
import React, { Component } from "react";

class StudentPriceTable extends Component {
  state = {};

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
    const { student } = this.props;
    const data = student.studentSubjects?.map((e) => ({
      key: e.id,
      subject: e.subject?.name,
      price: e.price,
      sessionsOfWeek: e.sessionsOfWeek,
    }));
    return <Table columns={columns} dataSource={data} pagination={false} />;
  }
}

export default StudentPriceTable;
