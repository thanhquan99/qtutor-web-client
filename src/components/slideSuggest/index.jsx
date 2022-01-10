/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./style.css";
import Slider from "react-slick";
import CardSuggets from "./CardSuggest";
const slideSuggets = ({ data }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className="slideSuggets">
      <Slider {...settings}>
        {data.map((item) => (
          <div>
            <CardSuggets data={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default slideSuggets;
