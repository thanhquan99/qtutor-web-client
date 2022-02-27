import { Component } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";

class TeachingSummaryCVTab extends Component {
  state = {};

  render() {
    const { tutor } = this.props;
    return (
      <div class="container bootstrap snippets bootdey">
        <div class="row">
          <div class="col-lg-6 col-sm-6">
            <div class="circle-tile ">
              <div class="circle-tile-heading dark-blue">
                <FaUserGraduate size={50} style={{ marginTop: 10 }} />
              </div>
              <div class="circle-tile-content dark-blue">
                <div class="circle-tile-description text-faded">
                  Total Students
                </div>
                <div class="circle-tile-number text-faded ">
                  {tutor.totalStudents}
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-sm-6">
            <div class="circle-tile ">
              <div class="circle-tile-heading blue">
                <GiNotebook size={50} style={{ marginTop: 10 }} />
              </div>
              <div class="circle-tile-content blue">
                <div class="circle-tile-description text-faded">
                  Total Teachings
                </div>
                <div class="circle-tile-number text-faded ">
                  {tutor.totalCourses}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeachingSummaryCVTab;
