import { Col, Form, Select } from "antd";

export const searchFields = [
  <Col span={4}>
    <Form.Item name="payType" label="Pay Type">
      <Select style={{ width: 120 }}>
        <Select.Option value="Paypal">Paypal</Select.Option>
        <Select.Option value="Transfer">Transfer</Select.Option>
        <Select.Option value="Cash">Cash</Select.Option>
      </Select>
    </Form.Item>
  </Col>,
  <Col span={4}>
    <Form.Item name="status" label="Status">
      <Select style={{ width: 120 }}>
        <Select.Option value="Unpaid">Unpaid</Select.Option>
        <Select.Option value="Pending">Pending</Select.Option>
        <Select.Option value="Paid">Paid</Select.Option>
      </Select>
    </Form.Item>
  </Col>,
];
