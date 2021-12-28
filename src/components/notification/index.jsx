/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import "./style.css";
import ItemNotification from "./itemNotifi";
import { useState } from "react";
import { getlistNotifi } from "../../api/notification";
import { Button } from "antd";
import { Spin } from "antd";
import { Empty } from "antd";
const Notificaticon = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loadding, setLoadding] = useState(true);
  const fetchListNotifi = async () => {
    setLoadding(true);
    await getlistNotifi(page)
      .then((response) => {
        console.log(response, "res");
        setData(response.results);
      })
      .catch((error) => {
        console.log("loi");
      });
    setLoadding(false);
  };
  const handleLoadMore = async () => {
    setPage(page + 1);
    await getlistNotifi(page + 1)
      .then((response) => {
        setData(data.concat(response.results));
      })
      .catch((error) => {
        console.log("loi");
      });
  };
  useEffect(() => {
    fetchListNotifi(page);
  }, []);
  return loadding ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "433px",
        height: "200px",
      }}
      className="spin"
    >
      <Spin />
    </div>
  ) : (
    <div className="notifi">
      {data.length>0 ? (
        data.map((item) => (
          <div>
            <ItemNotification 
            data={item} 
            setData={setData}
            />
          </div>
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <div
        style={data.length>0 ? { textAlign: "center", marginTop:'10px' } : { display: "none" }}
        className="button"
      >
        <Button onClick={handleLoadMore} style={{ backgroundColor: "#ffd803" }}>
          Load more
        </Button>
      </div>{" "}
    </div>
  );
};
export default Notificaticon;
