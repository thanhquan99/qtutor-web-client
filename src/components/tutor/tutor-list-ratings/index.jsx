import { Avatar, Button, Comment, List, Rate } from "antd";
import { Component } from "react";
import tutorApi from "../../../api/tutor.api";
import { DEFAULT_AVATAR } from "../../../constant";
import delay from "delay";

class TutorListRatings extends Component {
  state = {
    initLoading: true,
    loading: false,
    ratings: [],
    page: 1,
    total: 0,
  };

  componentDidMount = async () => {
    await delay(2000);
    await this.fetchData({
      perPage: 3,
      page: 1,
      orderBy: JSON.stringify({ createdAt: "DESC" }),
    });
  };

  fetchData = async (qs) => {
    await this.setState({ loading: true });
    const { tutor } = this.props;

    const res = await tutorApi.getRatings(tutor.id, qs);
    if (res) {
      console.log(res);
      this.setState({
        ratings: this.state.ratings.concat(res.results),
        loading: false,
        total: res.total
      });
    }
  };

  onLoadMore = async () => {
    if (this.state.page * 3 >= this.state.total) {
      await this.setState({ initLoading: false });
      return;
    }

    await this.setState((curState) => ({
      page: curState.page + 1,
    }));
    await this.fetchData({
      perPage: 3,
      page: this.state.page,
      orderBy: JSON.stringify({ createdAt: "DESC" }),
    });
  };

  render() {
    const { initLoading, loading, ratings } = this.state;
    const loadMore = initLoading && (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={this.onLoadMore}>loading more</Button>
      </div>
    );

    return (
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={ratings}
        renderItem={(rating) => (
          <Comment
            author={
              <span>
                {rating.reviewer?.profile?.name}{" "}
                <Rate
                  style={{ color: "#66CDAA" }}
                  disabled
                  defaultValue={rating.rating}
                />
              </span>
            }
            avatar={
              <Avatar
                src={rating.reviewer?.profile?.avatar || DEFAULT_AVATAR}
              />
            }
            content={<p>{rating.comment}</p>}
          />
        )}
      />
    );
  }
}

export default TutorListRatings;
