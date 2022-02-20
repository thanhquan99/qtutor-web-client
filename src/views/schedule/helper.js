import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import * as React from "react";
import { Row, Col, Avatar } from "antd";

export const Header = ({
  children,
  appointmentData,
  setSchedule,
  ...restProps
}) => {
  return <AppointmentTooltip.Header {...restProps}></AppointmentTooltip.Header>;
};

export const Content = ({ children, appointmentData, ...restProps }) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    {(appointmentData.student || appointmentData.tutor) && (
      <Row>
        <Col span={3} offset={1}>
          <Avatar
            size={40}
            src={
              appointmentData?.student?.profile?.avatar ||
              appointmentData?.tutor?.profile?.avatar
            }
          ></Avatar>
        </Col>
        <Col span={8}>
          {appointmentData?.student?.profile?.name ||
            appointmentData?.tutor?.profile?.name}
        </Col>
      </Row>
    )}
  </AppointmentTooltip.Content>
);
