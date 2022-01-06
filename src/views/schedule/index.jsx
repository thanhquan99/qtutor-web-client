import React,{useEffect, useState} from "react";
import "./style.css";
import Paper from "@material-ui/core/Paper";
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import appointments from "./demo-data/today-appointments";
import { getMySchedules } from "../../api/schedule.api"
import { toast } from "react-toastify";
import moment from 'moment';
import { Modal, Button } from 'antd';
import ModalAddSchedule from "../../components/Modal-add-schedule";
import { PlusOutlined, SearchOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
const currentDate = moment();
let date = currentDate.date();
const makeTodayAppointment = (startDate, endDate) => {
  const days = moment(startDate).diff(endDate, 'days');
  const nextStartDate = moment(startDate)
    .year(currentDate.year())
    .month(currentDate.month())
    .date(date);
  const nextEndDate = moment(endDate)
    .year(currentDate.year())
    .month(currentDate.month())
    .date(date + days);

  return {
    startDate: nextStartDate.toDate(),
    endDate: nextEndDate.toDate(),
  };
};
const Schedule = () => {
  const [schedule,setSchedule] = useState([])
 
  const fectchListStudents =async()=>{
    const [response] = await Promise.all([
      getMySchedules().catch((error)=>{
        toast.error("error!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
    ])
   const res = []
   response.forEach(element => {
     res.push({
       id: Math.floor((Math.random() * 10000000000000) + 1),
       title: element.title,
       startDate: element.startDate,
       endDate: element.endDate
     })
   });
   let dataNew= []
   res.map(({ startDate, endDate, ...restArgs }) => {
    const result = {
      ...makeTodayAppointment(startDate, endDate),
      ...restArgs,
    };
    date += 1;
    if (date > 31) date = 1;
    dataNew.push(result);
    
  });
  setSchedule(dataNew)
  }
  useEffect(() => {
    fectchListStudents()
  }, [])
  return (
    <div className="schedule">
      <div className="buttonAdd" style={{float:'right'}}>
        <ModalAddSchedule/>
    </div>
      <Paper>
        <Scheduler data={schedule} height={840}>
          <WeekView startDayHour={6} endDayHour={23} cellDuration={60} />
          <Appointments />
        </Scheduler>
      </Paper>
    </div>
  );
};
export default Schedule;
