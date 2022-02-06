/* eslint-disable jsx-a11y/alt-text */
import { Tag } from "antd";
import React from "react";
import GenderComponent from "../../profile/gender.component";
import "./style.css";
const MyStudents = ({data}) => {
  return (
    <div className="my__tudents">
       <div style={{border:'none'}} className="card hover-card">
        <div className="card-body">
            <img
              src={data.subject?.image}
              alt="Admin"
              width= "100%"
              height= {150}
            />
            <div className="item-card mt-2">
              <b style={{marginRight:'5px'}}>{data&& data.subject.name}</b>
            </div>
            <div className="item-card" style={{ color: "#8B8B83" }}>
              {data && 
                parseInt(data?.salary).toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })
             }
            </div>
            <div className="item-card">
              {data && (
                 data.tutor.profile.name
              )}
              <GenderComponent
                isMale={data && data.tutor.profile?.isMale}
              ></GenderComponent> 
            </div>
            <div className="mt-2">
              {/* <span style={data&& data.status==="Accepted" ?
               {background:'#67A641', padding:'3px 20px', color:'white', borderRadius:'5px'}
            :  {background:'red', padding:'3px 20px', color:'white'}
            }>
                  {data&& data.status}
                  </span>  */}
                  {
                      data&& data.status==="Accepted" ?
                      <Tag color="cyan">{data&& data.status}</Tag> : 
                      <Tag color="red">{data&& data.status}</Tag>

                  }
                        

            </div>
        </div>
      </div>
    </div>
  );
};
export default MyStudents;
