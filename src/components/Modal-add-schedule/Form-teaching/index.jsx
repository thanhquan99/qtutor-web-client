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
  useEffect(() => {}, []);
  return (
    <div className="free__time">
      <Select
        style={{ width: "250px" }}
        showSearch
        placeholder="Select a subject"
        optionFilterProp="children"
        // onChange={onChange}
      >
        {/* {tutor?.subjects?.map((e, index) => (
          <Select.Option key={index} value={e.id}>
            {e.name}
          </Select.Option>
        ))} */}
      </Select>
    </div>
  );
};
export default ModalAddSchedule;
