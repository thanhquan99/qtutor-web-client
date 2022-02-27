import { Rate, Space } from "antd";
import React, { Component } from "react";
import cityApi from "../../../api/city.api";
import TutorListRatings from "../tutor-list-ratings";
import TutorRatingComment from "../tutor-rating-comment";

class TutorRating extends Component {
  state = {};

  render() {
    const { tutor } = this.props;
    return (
      <div className="row ">
        <div className="col-md-12 bg-white ">
          <b style={{ fontSize: 20 }}>Ratings & Reviews</b>
          <div>
            <Space size="middle">
              <Rate
                style={{ color: "#66CDAA" }}
                disabled
                allowHalf
                defaultValue={tutor?.averageRating}
              />
              <span style={{ fontSize: 30, color: "#66CDAA" }}>
                {tutor?.averageRating}
              </span>
            </Space>
            <br />
            <span style={{ fontSize: 20 }}>{tutor?.totalRatings} reviews</span>
          </div>

          <div className="cmt cmtAndRate">
            <TutorRatingComment tutor={this.props.tutor} />
            <TutorListRatings tutor={this.props.tutor} />
          </div>
        </div>
      </div>
    );
  }
}

export default TutorRating;
