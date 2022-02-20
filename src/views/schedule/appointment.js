import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
import { Space } from "antd";
import React from "react";
import { deleteSchedule } from "../../api/schedule.api";

const styles = (theme) => ({
  button: {
    color: theme.palette.background.default,
    padding: 0,
  },
  text: {
    paddingTop: theme.spacing(1),
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

const AppointmentBase = ({
  children,
  data,
  onClick,
  classes,
  toggleVisibility,
  onAppointmentMetaChange,
  setSchedule,
  schedule,
  ...restProps
}) => {
  const onDelete = async () => {
    const res = await deleteSchedule(data.id);
    if (res) {
      setSchedule(schedule.filter((e) => e.id !== data.id));
    }
  };

  return (
    <Appointments.Appointment
      {...restProps}
      style={{
        backgroundColor: data.isFreeTime ? "#28B463" : "bl",
        borderRadius: "8px",
      }}
    >
      <React.Fragment>
        <Space size={"small"}>
          <IconButton
            className={classes.button}
            onClick={({ target }) => {
              toggleVisibility();
              onAppointmentMetaChange({
                target: target.parentElement.parentElement,
                data,
              });
            }}
          >
            <InfoIcon fontSize="small" />
          </IconButton>

          <IconButton className={classes.button} onClick={onDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Space>
        {children}
      </React.Fragment>
    </Appointments.Appointment>
  );
};

export const Appointment = withStyles(styles, { name: "Appointment" })(
  AppointmentBase
);
