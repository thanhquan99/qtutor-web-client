import { Button, Empty, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { getlistNotifi } from "../../../api/notification";
import ItemNotification from "../itemNotifi";
import "./style.css";

const Notification = ({ hide }) => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchListNotifi = async () => {
    setLoading(true);
    await getlistNotifi(page)
      .then((response) => {
        console.log(response, "res");
        setData(response.results);
      })
      .catch((error) => {
        console.log("loi");
      });
    setLoading(false);
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

  const handleUpdateOne = (notification) => {
    setData(
      data.map((e) => {
        if (e.id === notification.id) {
          return notification;
        }
        return e;
      })
    );
  };

  useEffect(() => {
    fetchListNotifi(page);
  }, []);
  return loading ? (
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
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.id}>
            <ItemNotification
              data={item}
              fetchListNotifi={fetchListNotifi}
              hide={hide}
              handleUpdateOne={handleUpdateOne}
            />
          </div>
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <div
        style={
          data.length > 0
            ? { textAlign: "center", marginTop: "10px" }
            : { display: "none" }
        }
        className="button"
      >
        <Button onClick={handleLoadMore} style={{ backgroundColor: "#ffd803" }}>
          Load more
        </Button>
      </div>{" "}
    </div>
  );
};
export default Notification;
