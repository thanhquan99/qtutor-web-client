/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./style.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="row">
        <div className="col-md-3">
          <ul>
            <li className="title-fl">Custommer Service</li>
            <li>FAQ</li>
            <li>Returns & refunds</li>
            <li>Terms and conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="col-md-3">
          <ul>
            <li className="title-fl">Custommer Service</li>
            <li>FAQ</li>
            <li>Returns & refunds</li>
            <li>Terms and conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="col-md-3">
          <ul>
            <li className="title-fl">Custommer Service</li>
            <li>FAQ</li>
            <li>Returns & refunds</li>
            <li>Terms and conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="col-md-3">
          <div className="title-fl my-10">Follow us</div>
          <div className="img">
            <img src={require(`./img/th.jpg`).default} />
            <img src={require(`./img/twitter-logo-png-round-6.jpg`).default} />
            <img src={require(`./img/th (1).jpg`).default} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
