import { Table } from "antd";
import React, { Component } from "react";
import { DAY_OF_WEEKS } from "../../../constant";

class TutorSchedule extends Component {
  state = {};

  render() {
    const columns = [
      {
        title: "Day",
        dataIndex: "day",
        key: "day",
        render: (e) => <b style={{fontSize: 20}}>{e}</b>,
      },
      {
        title: "Time",
        dataIndex: "time",
        key: "time",
        render: (e) => <span style={{fontSize: 20}}>{e}</span>,
      },
    ];
    const { schedule } = this.props;
    const data = schedule?.map((e) => {
      const startTime = new Date(e.startTime).toLocaleTimeString("vi-VN");
      const endTime = new Date(e.endTime).toLocaleTimeString("vi-VN");
      return {
        key: e.id,
        day: DAY_OF_WEEKS[new Date(e.startTime).getDay()],
        time: `${startTime} - ${endTime}`,
      };
    });
    return <Table columns={columns} dataSource={data} pagination={false} />;
  }
}

export default TutorSchedule;
