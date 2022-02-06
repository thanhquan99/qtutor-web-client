import { Button, Input, Rate, Space } from "antd";
import React, { Component } from "react";
import cityApi from "../../../api/city.api";
import TutorListRatings from '../tutor-list-ratings';

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

class TutorRating extends Component {
  state = {};

  componentDidMount = async () => {
    const { results: cities } = await cityApi.getMany({
      perPage: 5,
      orderBy: JSON.stringify({ name: "ASC" }),
    });
    await this.setState({ cities });
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
            <div>
              <Rate
                tooltips={desc}
                onChange={this.handleChangeRate}
                value={3.5}
              />
            </div>
            <div className="items-center">
              <Input.TextArea
                placeholder="Your comment"
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </div>
            <div className="buttonCmt">
              <Button type="primary" size="large">
                Comment
              </Button>
            </div>
            <TutorListRatings tutor={this.props.tutor} />
          </div>
        </div>
      </div>
    );
  }
}

export default TutorRating;
