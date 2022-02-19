/* eslint-disable jsx-a11y/alt-text */
import { Col, List, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import tutorApi from "../../../api/tutor.api";
import MyTeachingCard from "../../../components/tutor/my-teaching-card";
import "./style.css";
const perPage = 8;

const MyTeachings = () => {
  const [teachings, setTeachings] = useState(null);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async (qs) => {
    setLoading(true);
    const res = await tutorApi.getMyTeachings(qs);
    if (res) {
      setTeachings(res.results);
      setTotal(res.total);
      setLoading(false);
    }
  };

  const onChangePage = async (page) => {
    fetchData({ page, perPage });
  };

  const handleUpdateTeaching = (teaching) => {
    console.log(teaching)
    setTeachings(
      teachings.map((e) => {
        if (e.id === teaching.id) {
          return teaching;
        }
        return e;
      })
    );
  };

  const handleRemoveTeaching = (teaching) => {
    console.log(teaching)
    setTeachings(teachings.filter((e) => e.id !== teaching.id));
  };

  useEffect(() => {
    fetchData({ page: 1, perPage });
  }, []);

  return (
    <div className="my__tudents">
      <div className="mt-3">
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <div className="mt-3 align-items-center text-center">
              <List
                loading={loading}
                grid={{ gutter: 8, column: 4 }}
                dataSource={teachings ? teachings : []}
                renderItem={(item) => (
                  <List.Item>
                    <MyTeachingCard
                      data={item}
                      handleRemoveTeaching={handleRemoveTeaching}
                      handleUpdateTeaching={handleUpdateTeaching}
                    />
                  </List.Item>
                )}
              />
              <Pagination
                total={total}
                onChange={onChangePage}
                defaultPageSize={perPage}
                pageSize={perPage}
              />
            </div>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    </div>
  );
};
export default MyTeachings;
