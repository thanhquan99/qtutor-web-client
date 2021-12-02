import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/login.component";
import {
  transitions,
  positions,
  Provider as AlertProvider,
  types,
} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import _ from "lodash";
import { Component } from "react";
import eventBus from "./common/EventBus";
import Register from "./components/auth/register.component";
import VerifyEmail from "./components/auth/verify-email.component";
import Profile from "./components/user/profile.component";
import MyTutorTabs from "./components/tutor/my-tutor-tabs.component";
import MyStudentTabs from "./components/student/my-student-tabs.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
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
    window.location.reload();
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
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/home">QTutor</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/tutors/me">Tutor</Nav.Link>
                <Nav.Link href="/students/me">Student</Nav.Link>
                <Nav.Link href="/schedule/me">Schedule</Nav.Link>
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
                  <NavDropdown
                    title={currentUser.profile.name}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href="/users/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={this.logout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/verify-email" component={VerifyEmail} />
          <Route path="/users/profile" component={Profile} />
          <Route path="/tutors/me" component={MyTutorTabs} />
          <Route path="/students/me" component={MyStudentTabs} />
        </Switch>
      </AlertProvider>
    );
  }
}

export default App;
