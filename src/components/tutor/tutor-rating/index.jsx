import { Rate, Space } from "antd";
import React, { Component } from "react";
import cityApi from "../../../api/city.api";
import TutorListRatings from "../tutor-list-ratings";
import TutorRatingComment from "../tutor-rating-comment";

class TutorRating extends Component {
  state = {};

  componentDidMount = async () => {
    const { results: cities } = await cityApi.getMany({
      perPage: 5,
      orderBy: JSON.stringify({ name: "ASC" }),
    });
    await this.setState({ cities });
  };

  onFinish = async (values) => {
    console.log(values);
  };

  render() {
    return (
      <div className="row ">
        <div className="col-md-12 bg-white ">
          <b>Ratings & Reviews</b>
          <div>
            <Space size="middle">
              <Rate
                style={{ color: "#66CDAA" }}
                disabled
                allowHalf
                defaultValue={4.6}
              />
              <span style={{ fontSize: 30, color: "#66CDAA" }}>4.3</span>
            </Space>
            <br />
            <span>10 reviews</span>
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
