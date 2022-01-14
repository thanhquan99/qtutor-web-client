/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./style.css";
import Slider from "react-slick";
import CardSuggets from "./CardSuggest";
const slideSuggets = ({ data, type }) => {
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
      
      {
        data.length > 4 ?
        <Slider {...settings}>
        {data.map((item) => (
          <div>
            <CardSuggets type={type} data={item} />
          </div>
        ))}
      </Slider>
        : <div className="row">
          {data.map((item) => (
            <div className="col-md-3">
              <CardSuggets type={type} data={item} />
            </div>
          ))}
        </div>
      }
     
    </div>
  );
};
export default slideSuggets;
