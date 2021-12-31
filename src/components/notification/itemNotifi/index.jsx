import React from "react";
import "./style.css";
import TimeAgo from "react-timeago";
import { useHistory, Link } from "react-router-dom";
import { readNotifi } from "../../../api/notification";
import { Button } from "antd";
import { toast } from "react-toastify";

const Item = ({ data, setData ,fetchListNotifi,hide}) => {
  const history = useHistory();
  const handleNotiItem = async () => {
    await readNotifi(data.id, { isRead: true });
    hide()
    history.push(data.url)
  };
  const handleAccept = async () => {
    await readNotifi(data.id, { status: "Accepted" })
      .then((response) => {
        toast.success("success!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        hide()
        fetchListNotifi()
      })
      .catch((error) => {
        toast.error("error!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const handleCancel = async () => {
    await readNotifi(data.id, { status: "Cancel" })
      .then((response) => {
        toast.success("success!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        hide()
        fetchListNotifi()
        })
        
      .catch((error) => {
        toast.error("error!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  return (
    <div className="wrap-notifi">
      <div onClick={handleNotiItem} className="item-notifi">
        <div className="group__left">
          <div className="avt">
            <img
              src="https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg"
              alt=""
            />
          </div>
          <div className="text">
            <div style={{ marginTop: "3px" }} className="messenger">
              <p dangerouslySetInnerHTML={{ __html: data.message }} />
            </div>
          </div>
        </div>

        <div style={{ color: "#888" }} className="time">
          <TimeAgo date={data.createdAt} />
        </div>
      </div>
      {data.type === "Edit" && (
        <div className="group__button">
          <Button
            onClick={handleAccept}
            style={{ marginRight: "5px" }}
            type="primary"
          >
            Accept
          </Button>
          <Button onClick={handleCancel} className="cancel" type="primary">
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};
export default Item;
