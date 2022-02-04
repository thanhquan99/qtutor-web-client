import { Table } from "antd";
import "antd/dist/antd.css";
import _ from "lodash";
import React, { Component } from "react";
import transactionApi from "../../../api/transaction.api";
import eventBus from "../../../common/EventBus";
import TransactionPaypalAccount from "../../../components/transaction/paypal-account";
import { AdvancedSearchForm } from "../../../components/transaction/search-form";
import { SORTER_ORDER } from "../../../constant";
import { transactionColumns } from "./table-column";

class MyTransactionsView extends Component {
  state = {
    transactions: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
    filter: {},
    orderBy: {},
  };

  async componentDidMount() {
    await this.fetchData();

    eventBus.on("update-transaction", (data) => {
      this.setState({
        transactions: this.state.transactions.map((e) => {
          if (e.id === data.id) {
            return data;
          }
          return e;
        }),
      });
    });
    eventBus.on("delete-transaction", (data) => {
      console.log(data);
    });
  }

  componentWillUnmount() {
    eventBus.remove("update-transaction");
    eventBus.remove("delete-transaction");
  }

  handleTableChange = async (pagination, filters, sorter) => {
    if (!_.isEmpty(sorter)) {
      if (sorter.order) {
        const orderBy = {};
        orderBy[sorter.field] = SORTER_ORDER[sorter.order];
        await this.setState({ orderBy });
      } else {
        await this.setState({ orderBy: {} });
      }
    }
    if (!_.isEmpty(pagination)) {
      await this.setState((curState) => ({
        pagination: {
          ...curState.pagination,
          current: pagination.current,
          pageSize: pagination.pageSize,
        },
      }));
    }
    await this.fetchData();
  };

  handleSearchForm = async (filter) => {
    await this.setState({ filter });
    console.log(this.state)
    await this.fetchData()
  };

  fetchData = async () => {
    this.setState({ loading: true });

    const { pagination, filter, orderBy } = this.state;
    const res = await transactionApi.getMyTransactions({
      perPage: pagination.pageSize,
      page: pagination.current,
      filter: JSON.stringify(filter),
      orderBy: _.isEmpty(orderBy)
        ? JSON.stringify({ createdAt: "DESC" })
        : JSON.stringify(orderBy),
    });

    this.setState((curState) => ({
      loading: false,
      transactions: res.results,
      pagination: {
        ...curState.pagination,
        total: res.total,
      },
    }));
  };

  render() {
    const { transactions, pagination, loading } = this.state;
    return (
      <div>
        <AdvancedSearchForm handleSearchForm={this.handleSearchForm} />
        <TransactionPaypalAccount />
        <Table
          columns={transactionColumns}
          rowKey={(record) => record.id}
          dataSource={transactions}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default MyTransactionsView;
