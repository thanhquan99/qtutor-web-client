import { Space, Tag } from "antd";
import TransactionModalEdit from "../../../components/transaction/modal-edit";
import TransactionPaypalPayment from "../../../components/transaction/paypal-payment";
const STATUS_COLOR = {
  Unpaid: "volcano",
  Pending: "geekblue",
  Paid: "green",
};

export const transactionColumns = [
  {
    title: "Tutor",
    dataIndex: "tutorUser",
    render: (e) => e.profile?.name,
  },
  {
    title: "Student",
    dataIndex: "studentUser",
    render: (e) => e.profile?.name,
  },
  {
    title: "Subject",
    dataIndex: "subject",
    render: (e) => e.name,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: true,
  },
  {
    title: "Pay Type",
    dataIndex: "payType",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (e) => (
      <Tag color={STATUS_COLOR[e]} key={e}>
        {e.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "Start Time",
    dataIndex: "startTime",
    sorter: true,
    render: (e) => new Date(e).toLocaleString("vi-VN"),
  },
  {
    title: "End Time",
    dataIndex: "endTime",
    sorter: true,
    render: (e) => new Date(e).toLocaleString("vi-VN"),
  },
  {
    title: "Modified By",
    dataIndex: "modifiedUser",
    render: (e) => e?.profile?.name,
  },
  {
    title: "",
    render: (text, record) => (
      <Space size="middle">
        {record.isEdit && <TransactionModalEdit transaction={record} />}
        {record.isCanPay && <TransactionPaypalPayment transaction={record} />}
      </Space>
    ),
  },
];
