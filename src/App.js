import _ from "lodash";
import { Component } from "react";
import {
  positions,
  Provider as AlertProvider,
  transitions,
  types,
} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import eventBus from "./common/EventBus";
import Footer from "./components/footer";
import Header from "./components/header";
import { DEFAULT_FILTER } from "./constant";
import { TutorAPIProvider } from "./contexts/tutor-api.context";
import "./grid.css";
import Login from "./views/auth/login.component";
import Register from "./views/auth/register.component";
import VerifyEmail from "./views/auth/verify-email.component";
import Schedule from "./views/schedule";
import ListStudents from "./views/student/list-students/list-students";
import MyStudentTabs from "./components/student/my-student-tabs.component/my-student-tabs.component";
import ListTutors from "./views/tutor/list-tutors/list-tutors.component";
import MyTutorTabs from "./components/tutor/my-tutor-tabs.component/my-tutor-tabs.components";
import Tutor from "./views/tutor/tutor/tutor.component";
import Profile from "./views/user/profile.component";
import Student from "./views/student/one-student/student.component";
import MyTransactionsView from "./views/transaction/me";
import TransactionPaymentCallback from "./views/transaction/payment-callback";
import HomeView from "./views/home";
import AuthRegisterView from "./views/auth/register";
import userApi from "./api/user.api";
import MyTutorCVView from "./views/tutor/cv";

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!_.isEmpty(user)) {
      this.setState({
        currentUser: user,
      });
    }

    const token = localStorage.getItem("accessToken");
    if (token) {
      const res = await userApi.getMe();
      if (res) {
        localStorage.setItem("currentUser", JSON.stringify(res));
      }
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
    const alertOptions = {
      position: positions.TOP_RIGHT,
      timeout: 5000,
      offset: "30px",
      transition: transitions.FADE,
      type: types.INFO,
    };

    return (
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Header />
        <Switch>
          <Route exact path={["/home", "/", ""]} component={HomeView} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={AuthRegisterView} />
          <Route exact path="/schedule/me" component={Schedule} />
          <Route exact path="/verify-email" component={VerifyEmail} />
          <Route exact path="/users/profile" component={Profile} />
          <Route exact path="/tutors/me" component={MyTutorTabs} />
          <Route exact path="/students/me" component={MyStudentTabs} />
          <Route exact path="/tutors/:id" component={Tutor} />
          <Route exact path="/students/:id" component={Student} />
          <Route exact path="/transactions/me" component={MyTransactionsView} />
          <Route
            exact
            path="/transactions/me/:id/paypal/payment/callback"
            component={TransactionPaymentCallback}
          />

          <TutorAPIProvider value={DEFAULT_FILTER}>
            <Route exact path="/tutors" component={ListTutors} />
            <Route exact path="/students" component={ListStudents} />
          </TutorAPIProvider>
        </Switch>

        <Route exact path="/tutor-resumes/me" component={MyTutorCVView} />
        <Footer />
      </AlertProvider>
    );
  }
}

export default App;
