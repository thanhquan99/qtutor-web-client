/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import "./style.css";
import ItemNotification from "./itemNotifi";
import { useState } from "react";
import { getlistNotifi } from "../../api/notification";
const Notificaticon = () => {
  const [data, setData] = useState(null);
  const fetchListNotifi = async () => {
    await getlistNotifi()
      .then((response) => {
        console.log(response, "res");
        setData(response.results);
      })
      .catch((error) => {
       console.log("loi")
      });
  };

  useEffect(() => {
    fetchListNotifi();
  }, []);
  return (
    <div className="notifi">
      { data && data.map((item) => (
        <ItemNotification data={item} />
      ))}
    </div>
  );
};
export default Notificaticon;
