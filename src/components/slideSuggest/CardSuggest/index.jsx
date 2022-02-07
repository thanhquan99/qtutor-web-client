/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./style.css";
import IconMap from "./icon.png";
import { Button } from "antd";
import { DEFAULT_AVATAR, WEB_CLIENT_URL } from "../../../constant";

const CardSuggets = ({ data, type }) => {
  return (
    <div className="CardSuggets">
      <div className="card__top">
        <div className="avt">
          <img
            style={{ width: "100px", height: "100px" }}
            src={data.profile?.avatar || DEFAULT_AVATAR}
            alt="avatar"
          />
        </div>
        <div className="name">
          <b style={{ color: "tomato" }}>
            {data.profile.name ? data.profile.name : <br />}
          </b>
          <div className="adress">
            <img
              style={{ width: "20px", height: "20px" }}
              src={IconMap}
              alt=""
            />
            <span>
              {data.profile.city.name ? data.profile.city.name : <br />}
            </span>
          </div>
        </div>
      </div>
      <p>{data.description ? data.description : <br />}</p>
      <p>{data.profile.workLocation ? data.profile.workLocation : <br />}</p>
      <p>{data.minimumSalary ? data.minimumSalary : <br />}</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() =>
            type === "tutor"
              ? window.open(`${WEB_CLIENT_URL}/tutors/${data.id}`, "_blank")
              : window.open(`${WEB_CLIENT_URL}/students/${data.id}`, "_blank")
          }
          size="large"
          type="primary"
        >
          {" "}
          View Profile
        </Button>
      </div>
    </div>
  );
};
export default CardSuggets;
