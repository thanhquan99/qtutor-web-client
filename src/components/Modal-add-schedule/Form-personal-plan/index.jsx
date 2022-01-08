import { Input, Select } from "antd";
import React, { useEffect } from "react";
import "./style.css";

const ModalAddSchedule = ({dataPersonalPlan, setDataPersonalPlan}) => {
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
    setDataPersonalPlan({
      ...dataPersonalPlan,
      startTimeDate:{
        dayOfWeek: value,
        hour: dataPersonalPlan.startTimeDate.hour,
        minute: dataPersonalPlan.startTimeDate.minute,
      }
    });
  };
  const onHourChange = (value) => {
    setDataPersonalPlan({
      ...dataPersonalPlan,
      startTimeDate:{
        dayOfWeek: dataPersonalPlan.startTimeDate.dayOfWeek,
        hour: value,
        minute: dataPersonalPlan.startTimeDate.minute,
      }
    });
  };
  const onMinuteChange = (value) => {
    setDataPersonalPlan({
      ...dataPersonalPlan,
      startTimeDate:{
        dayOfWeek: dataPersonalPlan.startTimeDate.dayOfWeek,
        hour: dataPersonalPlan.startTimeDate.hour,
        minute: value,
      }
    });
  };

  const onDayChange1 = (value) => {
    setDataPersonalPlan({
      ...dataPersonalPlan,
      endTimeDate:{
        dayOfWeek: value,
        hour: dataPersonalPlan.endTimeDate.hour,
        minute: dataPersonalPlan.endTimeDate.minute,
      }
    });
  };
  const onHourChange1 = (value) => {
    setDataPersonalPlan({
      ...dataPersonalPlan,
      endTimeDate:{
        dayOfWeek: dataPersonalPlan.endTimeDate.dayOfWeek,
        hour: value,
        minute: dataPersonalPlan.endTimeDate.minute,
      }
    });
  };
  const onMinuteChange1 = (value) => {
    setDataPersonalPlan({
      ...dataPersonalPlan,
      endTimeDate:{
        dayOfWeek: dataPersonalPlan.endTimeDate.dayOfWeek,
        hour: dataPersonalPlan.endTimeDate.hour,
        minute: value,
      }
    });
  };
  const onDesChange = (value) => {
    setDataPersonalPlan({
      ...dataPersonalPlan,
      description: value.target.value
    });
  };
  return (
    <div className="free__time">
      <div className="time">
        <span>Description: </span>
        <div className="group__select">
          <TextArea 
           onChange={onDesChange}
           placeholder="description...."
          rows={3} />
        </div>
      </div>
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
            <Option value=" THURSDAY">Thursday</Option>
            <Option value="FRIDAY">Friday</Option>
            <Option value="SATURDAY">Saturday</Option>
          </Select>
          <Select
            size="large"
            style={{ width: "150px" }}
           placeholder = "7 hour"
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
            placeholder="0 minute"
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
