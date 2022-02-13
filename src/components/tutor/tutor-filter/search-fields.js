import { Col, Form, Input } from "antd";
import CitySearch from "../../helper/form-search/city-search.component";
import GenderSearch from "../../helper/form-search/gender-search.component";
import SubjectSearch from "../../helper/form-search/subject-search.component";

export const searchFields = [
  <Col span={4}>
    <Form.Item name="name" label="Name">
      <Input placeholder="Full name" />
    </Form.Item>
  </Col>,
  <Col span={4}>
    <GenderSearch />
  </Col>,
  <Col span={4}>
    <CitySearch />
  </Col>,
  <Col span={4}>
    <SubjectSearch />
  </Col>,
];
