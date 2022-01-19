import { Input, Select } from "antd";
import React, { useEffect } from "react";
import "./style.css";

const Teaching = ({ teachings , dataTeaching, setDataTeaching}) => {
  const { Option } = Select;
  const { TextArea } = Input;

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
    setDataTeaching({
      ...dataTeaching,
      startTimeDate:{
        dayOfWeek: value,
        hour: dataTeaching.startTimeDate.hour,
        minute: dataTeaching.startTimeDate.minute,
      }
    });
  };
  const onHourChange = (value) => {
    setDataTeaching({
      ...dataTeaching,
      startTimeDate:{
        dayOfWeek: dataTeaching.startTimeDate.dayOfWeek,
        hour: value,
        minute: dataTeaching.startTimeDate.minute,
      }
    });
  };
  const onMinuteChange = (value) => {
    setDataTeaching({
      ...dataTeaching,
      startTimeDate:{
        dayOfWeek: dataTeaching.startTimeDate.dayOfWeek,
        hour: dataTeaching.startTimeDate.hour,
        minute: value,
      }
    });
  };

  const onDayChange1 = (value) => {
    setDataTeaching({
      ...dataTeaching,
      endTimeDate:{
        dayOfWeek: value,
        hour: dataTeaching.endTimeDate.hour,
        minute: dataTeaching.endTimeDate.minute,
      }
    });
  };
  const onHourChange1 = (value) => {
    setDataTeaching({
      ...dataTeaching,
      endTimeDate:{
        dayOfWeek: dataTeaching.endTimeDate.dayOfWeek,
        hour: value,
        minute: dataTeaching.endTimeDate.minute,
      }
    });
  };
  const onMinuteChange1 = (value) => {
    setDataTeaching({
      ...dataTeaching,
      endTimeDate:{
        dayOfWeek: dataTeaching.endTimeDate.dayOfWeek,
        hour: dataTeaching.endTimeDate.hour,
        minute: value,
      }
    });
  };
  const onStudentChange = (value) => {
    setDataTeaching({
      ...dataTeaching,
      tutorStudentId: value
    });
  };
  return (
    <div className="free__time">
      <div className="time">
        <span>Teaching: </span>
        <div className="group__select">
        <Select
            size="large"
            style={{ width: "300px" }}
            defaultValue="hay chon"
            onChange={onStudentChange}
          >
            {teachings.map((item, index) => (
              <Option key={index} value={item.id}>{`${item.student.profile.name} - ${item.subject.name}`}</Option>
            ))}
          </Select>
        </div>
      </div>
        <div className="time">
        <span>Start Time: </span>
        <div className="group__select">
          <Select
            size="large"
            style={{ width: "150px" }}
            defaultValue="Sunday"
            onChange={onDayChange}
          >
            <Option value="SUNDAT">Sunday</Option>
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
            {listHour.map((item, index) => (
              <Option key={index} value={item}>{`${item} hour`}</Option>
            ))}
          </Select>
          <Select
            size="large"
            style={{ width: "150px" }}
            placeholder="0 minute"
            onChange={onMinuteChange}
          >
            {listMinute.map((item, index) => (
              <Option key={index} value={item}>{`${item} minute`}</Option>
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
            <Option value="THURSDAY">Thursday</Option>
            <Option value="FRIDAY">Friday</Option>
            <Option value="SATURDAY">Saturday</Option>
          </Select>
          <Select
            size="large"
            style={{ width: "150px" }}
            placeholder="7 hour"
            onChange={onHourChange1}
          >
            {listHour.map((item, index) => (
              <Option key={index} value={item}>{`${item} hour`}</Option>
            ))}
          </Select>
          <Select
            size="large"
            style={{ width: "150px" }}
            placeholder="0 minute"
            onChange={onMinuteChange1}
          >
            {listMinute.map((item, index) => (
              <Option key={index} value={item}>{`${item} minute`}</Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};
export default Teaching;
