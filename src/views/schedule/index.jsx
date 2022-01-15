import {
  Appointments, 
  Scheduler,
  WeekView,
  AppointmentTooltip
} from "@devexpress/dx-react-scheduler-material-ui";
import Paper from "@material-ui/core/Paper";
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getMySchedules } from "../../api/schedule.api";
import ModalAddSchedule from "../../components/Modal-add-schedule";
import "./style.css";

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
const styles = theme => ({
  button: {
    color: theme.palette.background.default,
    padding: 0,
  },
  text: {
    paddingTop: theme.spacing(1),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});
const AppointmentBase = ({
  children,
  data,
  onClick,
  classes,
  toggleVisibility,
  onAppointmentMetaChange,
  ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
  >
    <React.Fragment>
      <IconButton
        className={classes.button}
        onClick={({ target }) => {
          toggleVisibility();
          onAppointmentMetaChange({ target: target.parentElement.parentElement, data });
        }}
      >
        <InfoIcon fontSize="small" />
      </IconButton>
      {children}
    </React.Fragment>
  </Appointments.Appointment>
);

const Appointment = withStyles(styles, { name: 'Appointment' })(AppointmentBase);


const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [visible, setVisible] =useState(false)
  const [appointmentMeta, setAppointmentMeta] =useState(
    {
      target: null,
      data: {},
    },
  )
  const toggleVisibility = () => {
    // const { visible: tooltipVisibility } = this.state;
    // this.setState({ visible: !tooltipVisibility });
    setVisible(!visible)
  };
  const onAppointmentMetaChange = ({ data, target }) => {
    // this.setState({ appointmentMeta: { data, target } });
    setAppointmentMeta(
      {
        target,
        data,
      },
    )
  };
  const myAppointment =(props)=> {
    return (
      <Appointment
        {...props}
        toggleVisibility={toggleVisibility}
        onAppointmentMetaChange={onAppointmentMetaChange}
      />
    );
  }
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
        <ModalAddSchedule fectchListStudents={fectchListStudents}/>
      </div>
      <Paper>
        <Scheduler data={schedule} height={840}>
          <WeekView startDayHour={6} endDayHour={23} cellDuration={60} />
          <Appointments 
          appointmentComponent={myAppointment}

          />
           <AppointmentTooltip
           className="tootip"
            showCloseButton
            visible={visible}
            onVisibilityChange={toggleVisibility}
            appointmentMeta={appointmentMeta}
            onAppointmentMetaChange={onAppointmentMetaChange}
          />
        </Scheduler>
      </Paper>
    </div>
  );
};
export default Schedule;
