/* eslint-disable jsx-a11y/alt-text */
import { Col, List, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import studentApi from "../../../api/student.api";
import MyLearningCard from "../../../components/student/my-learning-card";
import "./style.css";
const perPage = 8;

const MyLearnings = () => {
  const [learnings, setLearnings] = useState(null);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async (qs) => {
    setLoading(true);
    const res = await studentApi.getMyLearnings(qs);
    if (res) {
      setLearnings(res.results);
      setTotal(res.total);
      setLoading(false);
    }
  };

  const onChangePage = async (page) => {
    fetchData({ page, perPage });
  };

  const handleUpdateLearning = (learning) => {
    setLearnings(
      learnings.map((e) => {
        if (e.id === learning.id) {
          return learning;
        }
        return e;
      })
    );
  };

  const handleRemoveLearning = (learning) => {
    setLearnings(learnings.filter((e) => e.id !== learning.id));
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
                dataSource={learnings ? learnings : []}
                renderItem={(item) => (
                  <List.Item>
                    <MyLearningCard
                      data={item}
                      handleRemoveLearning={handleRemoveLearning}
                      handleUpdateLearning={handleUpdateLearning}
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
export default MyLearnings;
