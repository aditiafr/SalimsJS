"use client";

import { Button, Input, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import EditLabour from "./edit";
import DeleteLabour from "./delete";
import DetailLabour from "./detail";
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
    title: "Branch",
    dataIndex: "Branch",
    key: "Branch",
    width: 80,
  },
  {
    title: "Department",
    dataIndex: "Department",
    key: "Department",
    width: 100,
  },
  {
    title: "Code",
    dataIndex: "Code",
    key: "Code",
    width: 100,
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    width: 100,
  },
  {
    title: "Level",
    dataIndex: "Level",
    key: "Level",
    width: 100,
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
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
        <DetailLabour />
        <EditLabour />
        <DeleteLabour name={record.Name} />
      </Space>
    ),
  },
];
const data = [
  {
    key: 1,
    Branch: "0002",
    Department: "IT",
    Code: "I01",
    Name: "John Doe",
    Level: "Staff",
    Description: "A staff in IT department",
    Suspended: false,
  },
  {
    key: 2,
    Branch: "0002",
    Department: "QA",
    Code: "I02",
    Name: "Jane Doe",
    Level: "Staff",
    Description: "A staff in IT department",
    Suspended: true,
  },
  {
    key: 3,
    Branch: "0002",
    Department: "FIN",
    Code: "I03",
    Name: "John Smith",
    Level: "Staff",
    Description: null,
    Suspended: false,
  },
]

const Labour = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Labour"
          subtitle="All data labour"
        />
        <div>
          <Link to="/master/labour/form">
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

export default Labour;
