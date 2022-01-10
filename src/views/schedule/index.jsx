import {
  Appointments, Scheduler,
  WeekView
} from "@devexpress/dx-react-scheduler-material-ui";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getMySchedules } from "../../api/schedule.api";
import ModalAddSchedule from "../../components/Modal-add-schedule";
import "./style.css";
const currentDate = moment();
let date = currentDate.date();

const makeTodayAppointment = (startDate, endDate) => {
  const days = moment(startDate).diff(endDate, "days");
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
  const [schedule, setSchedule] = useState([]);

  const fectchListStudents = async () => {
    const response = await getMySchedules();
    console.log(response, "res");

    let dataNew = [];
    response?.map(({ startDate, endDate, ...restArgs }) => {
      const result = {
        ...makeTodayAppointment(startDate, endDate),
        ...restArgs,
      };
      date += 1;
      if (date > 31) date = 1;
      dataNew.push(result);
    });
    console.log(dataNew);
    setSchedule(dataNew);
  };
  useEffect(() => {
    fectchListStudents();
  }, []);
  return (
    <div className="schedule">
      <div className="buttonAdd" style={{ float: "right" }}>
        <ModalAddSchedule />
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
