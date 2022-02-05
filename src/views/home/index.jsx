import React, { Component } from "react";
import HomeMain from "../../components/home/main";
import HomeSlide from "../../components/home/slide";

class HomeView extends Component {
  async componentDidMount() {}

  render() {
    return (
      <div>
        <HomeSlide />
        <HomeMain />
      </div>
    );
  }
}

export default HomeView;
