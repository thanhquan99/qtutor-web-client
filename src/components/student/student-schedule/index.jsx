import { Table } from "antd";
import React, { Component } from "react";
import { DAY_OF_WEEKS } from "../../../constant";

class StudentSchedule extends Component {
  state = {};

  render() {
    const columns = [
      {
        title: "Day",
        dataIndex: "day",
        key: "day",
      },
      {
        title: "Time",
        dataIndex: "time",
        key: "time",
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

export default StudentSchedule;
