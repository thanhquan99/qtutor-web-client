import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { Button, Form, InputNumber, Modal, Select, Space } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
const ModalAddSchedule = ({}) => {
  const { Option } = Select;
  useEffect(() => {}, []);
  return (
    <div className="free__time">
      <div className="time">
        <span>Start Time: </span>
        <div className="group__select">
          <Select
            size="large"
            style={{ width: "150px" }}
            defaultValue = "Sunday"
            placeholder="dayOfWeek"
            // onChange={onChange}
          >
             <Option value="Sunday">Sunday</Option>
            <Option value="Monday">Monday</Option>
            <Option value="Tuesday">Tuesday</Option>
            <Option value="Wednesday">Wednesday</Option>
            <Option value=" Thursday">Thursday</Option>
            <Option value="Friday">Friday</Option>
            <Option value="Saturday">Saturday</Option>
           
          </Select>
          <Select
            size="large"
            style={{ width: "150px" }}
            defaultValue = "Sunday"
            placeholder="dayOfWeek"
            // onChange={onChange}
          >
             <Option value="Sunday">Sunday</Option>
            <Option value="Monday">Monday</Option>
            <Option value="Tuesday">Tuesday</Option>
            <Option value="Wednesday">Wednesday</Option>
            <Option value=" Thursday">Thursday</Option>
            <Option value="Friday">Friday</Option>
            <Option value="Saturday">Saturday</Option>
           
          </Select>
          <Select
            size="large"
            style={{ width: "150px" }}
            defaultValue="Sunday"
            placeholder="dayOfWeek"
            // onChange={onChange}
          >
             <Option value="Sunday">Sunday</Option>
            <Option value="Monday">Monday</Option>
            <Option value="Tuesday">Tuesday</Option>
            <Option value="Wednesday">Wednesday</Option>
            <Option value=" Thursday">Thursday</Option>
            <Option value="Friday">Friday</Option>
            <Option value="Saturday">Saturday</Option>
           
          </Select>
        </div>
      </div>
     
    </div>
  );
};
export default ModalAddSchedule;
