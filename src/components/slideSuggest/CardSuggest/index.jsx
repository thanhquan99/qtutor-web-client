/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./style.css";
import IconMap from "./icon.png"
const CardSuggets = ({ data }) => {
 
  return (
    <div className="CardSuggets">
      <div className="card__top">
        <div className="avt">
          <img style={{width:'100px', height:'100px'}} src="https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg" alt="avatar" />
        </div>
        <div className="name">
          <b style={{color:'tomato'}}>{data.profile.name}</b>
          <div className="adress">
          <img style={{width:'20px', height:'20px'}} src={IconMap} alt="" />
          <span>{data.profile.city.name}</span>
        </div>
          </div>
       

      </div>
      <p>{data.description}</p>
      <p>{data.profile.workLocation}</p>
      <p>{data.minimumSalary}</p>
    </div>
  );
};
export default CardSuggets;
