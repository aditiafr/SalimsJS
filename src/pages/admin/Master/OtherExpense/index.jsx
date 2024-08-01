"use client";

import { Button, Input, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import EditOtherExpense from "./edit";
import DeleteOtherExpense from "./delete";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: "Code",
    dataIndex: "Code",
    key: "Code",
    width: 80,
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    width: 100,
  },
  {
    title: "Default Value",
    dataIndex: "DefaultValue",
    key: "DefaultValue",
    width: 100,
    render: (text) => {
      const value = text ?? 0;

      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(value);
    },
  },
  {
    title: "Default Taking Sample",
    dataIndex: "IsDefaultTakingSample",
    key: "IsDefaultTakingSample",
    width: 100,
    render: (text) => (text ?? "N/A"),
  },
  {
    title: "Desciption",
    dataIndex: "Desciption",
    key: "Desciption",
    width: 200,
    render: (text) => (text ?? "N/A"),
  },
  {
    title: "Suspended",
    dataIndex: "Suspended",
    key: "Suspended",
    width: 100,
    render: (suspended) => (
      <Tag color={suspended ? 'red' : 'green' }> {suspended ? 'Yes' : 'No'} </Tag>
   ),
  },
  {
    title: "Action",
    fixed: "right",
    width: 100,
    render: (_, record) => (
      <Space>
        <EditOtherExpense />
        <DeleteOtherExpense name={record.Name} />
      </Space>
    ),
  },
];
const data = [
  {
    key: 1,
    Code: "OE001",
    Name: "Other Expense 1",
    DefaultValue: 1500000,
    Desciption: "Description 1",
    IsDefaultTakingSample: true,
    Suspended: false,
  },
  {
    key: 2,
    Code: "OE002",
    Name: "Other Expense 2",
    DefaultValue: 0,
    Desciption: null,
    IsDefaultTakingSample: true,
    Suspended: true,
  },
  {
    key: 3,
    Code: "OE003",
    Name: "Other Expense 3",
    DefaultValue: null,
    Desciption: "Description 3",
    IsDefaultTakingSample: false,
    Suspended: false,
  },
];

const OtherExpense = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Other Expense"
          subtitle="All data other expense"
        />
        <div>
          <Link to="/master/other-expense/form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
      <div className="w-full bg-white p-4 rounded-lg">
        <div className="w-full flex justify-end pb-4">
          <Search
            placeholder="Search..."
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </div>
        <Table
          // loading={true}
          rowSelection
          columns={columns}
          dataSource={data}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 10,
          }}
          scroll={{
            x: 1000,
          }}
        />
      </div>
    </>
  );
};

export default OtherExpense;
