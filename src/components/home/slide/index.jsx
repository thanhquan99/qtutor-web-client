import { Component } from "react";
import "./style.css";

class HomeSlide extends Component {
  render() {
    return (
      <div className="accordian">
        <ul>
          <li>
            <div className="image_title">
              <a href="#">Tutor Search System 4.0</a>
            </div>
            <a href="#">
              <img
                src="https://images.theconversation.com/files/268455/original/file-20190409-2931-rzhl22.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip"
                alt=""
                width={700}
                height={500}
              />
            </a>
          </li>
          <li>
            <div className="image_title">
              <a href="#">Easy</a>
            </div>
            <a href="#">
              <img
                src="https://1en5vh48t4rqdnq1j3h9ihn4-wpengine.netdna-ssl.com/wp-content/uploads/2018/02/students-working-at-desk.jpeg"
                width={700}
                height={500}
                alt=""
              />
            </a>
          </li>
          <li>
            <div className="image_title">
              <a href="#">Safe</a>
            </div>
            <a href="#">
              <img
                src="https://kblog.kaplan.com.hk/wp-content/uploads/2021/04/istock-152059480small.jpg"
                alt=""
                width={700}
                height={500}
              />
            </a>
          </li>
          <li>
            <div className="image_title">
              <a href="#">Convenient</a>
            </div>
            <a href="#">
              <img
                src="https://www.thebalancecareers.com/thmb/NA2g1Iwr7aTBdvX7jglFp9jIZC8=/2121x1414/filters:fill(auto,1)/GettyImages-498698046-590f1fa95f9b58647025160e.jpg"
                alt=""
                width={700}
                height={500}
              />
            </a>
          </li>
          <li>
            <div className="image_title">
              <a href="#">No commission fee</a>
            </div>
            <a href="#">
              <img
                src="https://thumbs.dreamstime.com/z/tutor-student-studying-hard-exam-teacher-couple-male-home-tutor-helping-girl-studies-teacher-collaborates-colleagues-148773106.jpg"
                alt=""
                width={700}
                height={500}
              />
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default HomeSlide;
