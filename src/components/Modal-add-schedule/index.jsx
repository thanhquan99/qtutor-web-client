import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { Button,Form, InputNumber, Modal, Select, Space } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { getTeaching } from "../../api/schedule.api";
import FormFreeTime from "./Form-free-time"
import FormPersonal from "./Form-personal-plan"
import FormTeaching from "./Form-teaching"
const ModalAddSchedule = ({}) => {
  const { Option } = Select;
const [optionActive, setOptionActive] = useState("Free Time")
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = () => {
    console.log("hihihi");
  };
  const [schedule, setSchedule] = useState([]);

  const fectchTeaching = async () => {
    const [response] = await Promise.all([getTeaching().catch((error) => {})]);
    console.log(response, "response");
  };
  const onOptionChange = (value) => {
    setOptionActive(value)
  };
  useEffect(() => {
    fectchTeaching();
  }, []);
  return (
    <div className="ModalAddSchedule">
      <div className="plus">
        <PlusOutlined onClick={showModal} />
      </div>
      <Modal
        centered
        closeIcon={false}
        title={<div className="header__title">
          <div className="title">
          Add Schedule
          </div>
          <Select
          style={{ width: "300px" }}
          onChange={onOptionChange}
          defaultValue="Free Time"
          size="large"
          
        >
            <Option value="Free Time">Free Time</Option>
            <Option value="Teaching">Teaching</Option>
            <Option value="Personal Plan">Personal Plan</Option>
        </Select>
          </div>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={650}
      >
       {
         optionActive == "Free Time" ?(
           <FormFreeTime/>
         ): null
       }
        {
         optionActive === "Teaching" ?(
           <FormTeaching/>
         ): null
       }
        {
         optionActive === "Personal Plan" ?(
           <FormPersonal/>
         ): null
       }
      </Modal>
    </div>
  );
};
export default ModalAddSchedule;
