import React from "react";
import "./style.css";
import TimeAgo from 'react-timeago'
const Item = ({ data }) => {
  return (
    <div className="item-notifi">
      <div className="group__left">
        <div className="avt">
          <img src="https://scontent.fhan5-8.fna.fbcdn.net/v/t45.1600-4/cp0/q90/spS444/c99.0.540.540a/p180x540/252463690_23849233481550346_1186527049495825623_n.png.jpg?_nc_cat=107&ccb=1-5&_nc_sid=86c3dc&efg=eyJxZV9ncm91cHMiOlsibm9fc2FmZV9pbWFnZV9mb3JfYWRzX2ltYWdlIl19&_nc_ohc=ScOlAxTNMyUAX9oKLLA&_nc_ht=scontent.fhan5-8.fna&oh=00_AT-MX_p6QpDbM7wUx3rbD4o2f3lHpR9KD7LsLnD36L1LCA&oe=61C338B2" alt="" />
        </div>
        <div className="text">
          <div
            style={{ marginTop: "3px" }}
            className="messenger"
          >
            <p
            dangerouslySetInnerHTML={{ __html:data.message}}
          />
          </div>
        </div>
      </div>

      <div style={{ color: "#888" }} className="time">
      <TimeAgo date= {data.createdAt} />
      </div>
    </div>
  );
};
export default Item;
