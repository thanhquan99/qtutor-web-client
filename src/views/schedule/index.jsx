import {
  Appointments,
  AppointmentTooltip,
  Scheduler,
  WeekView
} from "@devexpress/dx-react-scheduler-material-ui";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getMySchedules } from "../../api/schedule.api";
import ModalAddSchedule from "../../components/Modal-add-schedule";
import { Appointment } from "./appointment";
import { Content, Header } from "./helper";
import "./style.css";

const now = new Date();
const lastSunday = new Date(now.setDate(now.getDate() - now.getDay()));
const lastSundayMidNight = lastSunday.setHours(0, 0, 0, 0);
const sundayInDB = new Date("2022/01/09").getTime();

const distance = lastSundayMidNight - sundayInDB;

const makeTodayAppointment = (startDate, endDate) => {
  const startTime = new Date(new Date(startDate).getTime() + distance);
  const endTime = new Date(new Date(endDate).getTime() + distance);

  return {
    startDate: moment(startTime).toDate(),
    endDate: moment(endTime).toDate(),
  };
};

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [visible, setVisible] = useState(false);
  const [appointmentMeta, setAppointmentMeta] = useState({
    target: null,
    data: {},
  });

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const onAppointmentMetaChange = ({ data, target }) => {
    setAppointmentMeta({
      target,
      data,
    });
  };

  const myAppointment = (props) => {
    return (
      <Appointment
        {...props}
        toggleVisibility={toggleVisibility}
        onAppointmentMetaChange={onAppointmentMetaChange}
        setSchedule={setSchedule}
        schedule={schedule}
      />
    );
  };

  const fectchListStudents = async () => {
    const response = await getMySchedules();
    let dataNew = [];
    response?.map(({ startDate, endDate, ...restArgs }) => {
      const result = {
        ...makeTodayAppointment(startDate, endDate),
        ...restArgs,
      };
      dataNew.push(result);
    });
    setSchedule(dataNew);
  };

  useEffect(() => {
    fectchListStudents();
  }, []);

  return (
    <div className="schedule">
      <div className="buttonAdd" style={{ float: "right" }}>
        <ModalAddSchedule fectchListStudents={fectchListStudents} />
      </div>
      <Paper>
        <Scheduler data={schedule} height={840}>
          <WeekView startDayHour={6} endDayHour={23} cellDuration={60} />
          <Appointments appointmentComponent={myAppointment} />
          <AppointmentTooltip
            visible={visible}
            onVisibilityChange={toggleVisibility}
            appointmentMeta={appointmentMeta}
            onAppointmentMetaChange={onAppointmentMetaChange}
            headerComponent={Header}
            contentComponent={Content}
          />
        </Scheduler>
      </Paper>
    </div>
  );
};
export default Schedule;
