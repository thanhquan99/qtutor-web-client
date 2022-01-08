import {
  PlusOutlined
} from "@ant-design/icons";
import { Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { createSchedule, getTeaching } from "../../api/schedule.api";
import FormFreeTime from "./Form-free-time";
import FormPersonal from "./Form-personal-plan";
import FormTeaching from "./Form-teaching";
import "./style.css";

const ModalAddSchedule = ({}) => {
  const [dataUser, setDataUser] = useState(null)
  const [dataFreeTime, setDataFreeTime] = useState({
    isFreeTime: true,
    description: "Free time",
    startTimeDate:{
      dayOfWeek: "SUNDAY",
      hour: 7,
      minute: 0,
    },
    endTimeDate:{
      dayOfWeek: "SUNDAY",
      hour: 7,
      minute: 0,
    }
  });

  const [dataPersonalPlan, setDataPersonalPlan] = useState({
    description: "",
    startTimeDate:{
      dayOfWeek: "SUNDAY",
      hour: 7,
      minute: 0,
    },
    endTimeDate:{
      dayOfWeek: "SUNDAY",
      hour: 7,
      minute: 0,
    }
  });
  const [dataTeaching, setDataTeaching] = useState({
    tutorStudentId: "",
    startTimeDate:{
      dayOfWeek: "SUNDAY",
      hour: 7,
      minute: 0,
    },
    endTimeDate:{
      dayOfWeek: "SUNDAY",
      hour: 7,
      minute: 0,
    }
  })
  const { Option } = Select;
const [optionActive, setOptionActive] = useState("Free Time")
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async() => {
    setIsModalVisible(false);
    let data = null
    if( optionActive == "Free Time"){
      data = dataFreeTime
    }
    else if( optionActive === "Teaching"){
      data=dataTeaching
    }
    else if (optionActive === "Personal Plan"){
      data = dataPersonalPlan
    }
    await Promise.all([createSchedule(data).catch((error) => {})]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const fectchTeaching = async () => {
    const [response] = await Promise.all([getTeaching().catch((error) => {})]);
    setDataUser(response)
    
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
            {dataUser?.isTutor && <Option value="Teaching">Teaching</Option>}
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
           <FormFreeTime setDataFreeTime={setDataFreeTime} dataFreeTime={dataFreeTime}/>
         ): null
       }
        {
         optionActive === "Teaching" ?(
           <FormTeaching teachings={dataUser?.teachings} dataTeaching={dataTeaching} setDataTeaching={setDataTeaching}/>
         ): null
       }
        {
         optionActive === "Personal Plan" ?(
           <FormPersonal dataPersonalPlan ={dataPersonalPlan} setDataPersonalPlan={setDataPersonalPlan}/>
         ): null
       }
      </Modal>
    </div>
  );
};
export default ModalAddSchedule;
