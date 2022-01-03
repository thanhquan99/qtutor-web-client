/* eslint-disable jsx-a11y/alt-text */
import React,{useEffect,useState} from "react";
import "./style.css";
import { Col, List, Pagination, Row } from "antd";
import MyStudentCard from "../../../components/my-student-card"
import {myTeachings} from "../../../api/listMyStudent"
import { toast } from "react-toastify";
const MyStudents = () => {
  const [student,setStudent] = useState(null)
  const [total,setTotal] = useState()
  const fectchListStudents =async()=>{
    const [response] = await Promise.all([
      myTeachings(1).catch((error)=>{
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
    setStudent(response.results)
    setTotal(response.total)
  }
  const onChangePage= async(page)=> {
    const response = await  myTeachings(page).catch((error)=>{
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
    setStudent(response.results)
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
                dataSource={student ? student : []}
                renderItem={(item) => (
                  <List.Item>
                    <MyStudentCard data={item}/>
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
export default MyStudents;
