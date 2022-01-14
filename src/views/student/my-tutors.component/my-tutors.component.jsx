/* eslint-disable jsx-a11y/alt-text */
import React,{useEffect,useState} from "react";
import { Col, List, Pagination, Row } from "antd";
import MyTutorCard from "../../../components/my-tutor-card"
import {myCourses} from "../../../api/listMyTutor"
import { toast } from "react-toastify";
import './style.css';
const MyStudent = () => {
  const [tutor,setTutor] = useState(null)
  const [total,setTotal] = useState()
  const fectchListStudents =async()=>{
    const [response] = await Promise.all([
      myCourses(1).catch((error)=>{
        toast.error("error!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
    ])
    setTutor(response.results)
    setTotal(response.total)
  }
  const onChangePage= async(page)=> {
    const response = await  myCourses(page).catch((error)=>{
      toast.error("error!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    setTutor(response.results)
    }

  useEffect(() => {
    fectchListStudents()
  }, [])
  return (
    <div className="my__tudents">
        <div className="mt-3">
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <div className="mt-3 align-items-center text-center">
              <List
                grid={{ gutter: 12, column: 5 }}
                dataSource={tutor ? tutor : []}
                renderItem={(item) => (
                  <List.Item>
                    <MyTutorCard data={item}/>
                  </List.Item>
                )}
              />
              <Pagination
                total={total && total}
                onChange={onChangePage}
                defaultPageSize={10}
                pageSize={10}
              />
            </div>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    </div>
  );
};
export default MyStudent;
