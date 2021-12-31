import * as React from "react";
import "./style.css";
import Paper from "@material-ui/core/Paper";
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import appointments from "./demo-data/today-appointments";

const Schedule = () => {
  return (
    <div className="schedule">
      <Paper>
        <Scheduler data={appointments} height={830}>
          <WeekView startDayHour={6} endDayHour={23} />
          <Appointments />
        </Scheduler>
      </Paper>
    </div>
  );
};
export default Schedule;
