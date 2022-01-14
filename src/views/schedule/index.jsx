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

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  const fectchListStudents = async () => {
    const response = await getMySchedules();

    const dataNew = response?.map((schedule)=>({
      ...schedule,
      startDate: moment(schedule.startDate),
      endDate: moment(schedule.endDate)
    }))
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
