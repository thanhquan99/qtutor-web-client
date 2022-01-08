import React, { useEffect } from "react";
import "./style.css";
import { Select } from "antd";

const ModalAddSchedule = ({ setDataFreeTime, dataFreeTime }) => {
  const { Option } = Select;
  useEffect(() => {}, []);
  const listHour = [];
  for (let index = 7; index < 23; index++) {
    listHour.push(index);
  }
  const listMinute = [];
  for (let index = 0; index < 46; index += 15) {
    listMinute.push(index);
  }
  const onDayChange = (value) => {
    setDataFreeTime({
      ...dataFreeTime,
      startTimeDate:{
        dayOfWeek: value,
        hour: dataFreeTime.startTimeDate.hour,
        minute: dataFreeTime.startTimeDate.minute,
      }
    });
  };
  const onHourChange = (value) => {
    setDataFreeTime({
      ...dataFreeTime,
      startTimeDate:{
        dayOfWeek: dataFreeTime.startTimeDate.dayOfWeek,
        hour: value,
        minute: dataFreeTime.startTimeDate.minute,
      }
    });
  };
  const onMinuteChange = (value) => {
    setDataFreeTime({
      ...dataFreeTime,
      startTimeDate:{
        dayOfWeek: dataFreeTime.startTimeDate.dayOfWeek,
        hour: dataFreeTime.startTimeDate.hour,
        minute: value,
      }
    });
  };

  const onDayChange1 = (value) => {
    setDataFreeTime({
      ...dataFreeTime,
      endTimeDate:{
        dayOfWeek: value,
        hour: dataFreeTime.endTimeDate.hour,
        minute: dataFreeTime.endTimeDate.minute,
      }
    });
  };
  const onHourChange1 = (value) => {
    setDataFreeTime({
      ...dataFreeTime,
      endTimeDate:{
        dayOfWeek: dataFreeTime.endTimeDate.dayOfWeek,
        hour: value,
        minute: dataFreeTime.endTimeDate.minute,
      }
    });
  };
  const onMinuteChange1 = (value) => {
    setDataFreeTime({
      ...dataFreeTime,
      endTimeDate:{
        dayOfWeek: dataFreeTime.endTimeDate.dayOfWeek,
        hour: dataFreeTime.endTimeDate.hour,
        minute: value,
      }
    });
  };
  return (
    <div className="free__time">
      <div className="time">
        <span>Start Time: </span>
        <div className="group__select">
          <Select
            size="large"
            style={{ width: "150px" }}
            defaultValue="SUNDAY"
            onChange={onDayChange}
          >
            <Option value="SUNDAY">Sunday</Option>
            <Option value="MONDAY">Monday</Option>
            <Option value="TUESDAY">Tuesday</Option>
            <Option value="WEDNESDAY">Wednesday</Option>
            <Option value="THURSDAY">Thursday</Option>
            <Option value="FRIDAY">Friday</Option>
            <Option value="SATURDAY">Saturday</Option>
          </Select>
          <Select
            size="large"
            style={{ width: "150px" }}
            placeholder="7 hour"
            onChange={onHourChange}
          >
            {listHour.map((item) => (
              <Option value={item}>{`${item} hour`}</Option>
            ))}
          </Select>
          <Select
            size="large"
            style={{ width: "150px" }}
            placeholder="0 minute"
            onChange={onMinuteChange}
          >
            {listMinute.map((item) => (
              <Option value={item}>{`${item} minute`}</Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="time">
        <span>End Time: </span>
        <div className="group__select">
          <Select
            size="large"
            style={{ width: "150px" }}
            defaultValue="SUNDAY"
            onChange={onDayChange1}
          >
            <Option value="SUNDAY">Sunday</Option>
            <Option value="MONDAY">Monday</Option>
            <Option value="TUESDAY">Tuesday</Option>
            <Option value="WEDNESDAY">Wednesday</Option>
            <Option value=" THURSDAY">Thursday</Option>
            <Option value="FRIDAY">Friday</Option>
            <Option value="SATURDAY">Saturday</Option>
          </Select>
          <Select
            size="large"
            style={{ width: "150px" }}
            placeholder="7 hour"
            onChange={onHourChange1}
          >
            {listHour.map((item) => (
              <Option value={item}>{`${item} hour`}</Option>
            ))}
          </Select>
          <Select
            size="large"
            style={{ width: "150px" }}
            placeholder="1 minute"
            onChange={onMinuteChange1}
          >
            {listMinute.map((item) => (
              <Option value={item}>{`${item} minute`}</Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};
export default ModalAddSchedule;
