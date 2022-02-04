import { Avatar, Image, Space } from "antd";
import _ from "lodash";
import { Component } from "react";
import {
  positions,
  Provider as AlertProvider,
  transitions,
  types,
} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { getNotifiNumber } from "../../api/notification";
import eventBus from "../../common/EventBus";
import { DEFAULT_AVATAR, WEB_CLIENT_URL } from "../../constant";
import NotificationIcon from "./child/notification-icon";
import ScheduleIcon from "./child/schedule-icon";
import StudentIcon from "./child/student-icon";
import TransactionIcon from "./child/transaction-icon";
import TutorIcon from "./child/tutor-icon";
import "./style.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

    this.state = {
      currentUser: undefined,
      numberNotificationUnRead: 0,
    };
  }

  componentDidMount() {
    getNotifiNumber()
      .then((response) => {
        this.setState({
          numberNotificationUnRead: response.totalUnread,
        });
      })
      .catch((error) => {
        console.log("error");
      });
    const user = JSON.parse(localStorage.getItem("user"));
    if (!_.isEmpty(user)) {
      this.setState({
        currentUser: user,
      });
    }

    eventBus.on("logout", () => {
      this.logout();
    });
    eventBus.on("login", () => {
      this.login();
    });
  }

  componentWillUnmount() {
    eventBus.remove("logout");
    eventBus.remove("login");
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    this.setState({
      currentUser: undefined,
    });
    window.open(`${WEB_CLIENT_URL}/login`, "_self");
  }

  login() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({
      currentUser: user,
    });
  }

  render() {
    const { currentUser } = this.state;
    const alertOptions = {
      position: positions.TOP_RIGHT,
      timeout: 5000,
      offset: "30px",
      transition: transitions.FADE,
      type: types.INFO,
    };

    return (
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Navbar collapseOnSelect expand="lg" id="navbar">
          <div className="header mx-5">
            <Nav.Link href="/home">
              <span className="logo">QTutor</span>{" "}
            </Nav.Link>
            <Nav className="me-auto">
              <NavDropdown title="Find" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/tutors">Tutor</NavDropdown.Item>
                <NavDropdown.Item href="/students">Student</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {_.isEmpty(currentUser) ? (
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Space size="large">
                  <TutorIcon />
                  <StudentIcon />
                  <ScheduleIcon />
                  <TransactionIcon />
                  <NotificationIcon />
                  <NavDropdown
                    title={
                      <Avatar
                        src={currentUser?.profile?.avatar || DEFAULT_AVATAR}
                        size={40}
                      />
                    }
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href="/users/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={this.logout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Space>
              </Nav>
            )}
          </div>
        </Navbar>
      </AlertProvider>
    );
  }
}

export default Header;
