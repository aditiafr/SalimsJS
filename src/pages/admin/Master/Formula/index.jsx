"use client";

import { Button, Input, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import EditFormula from "./edit";
import DeleteFormula from "./delete";
import DetailFormula from "./detail";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: "Branch",
    dataIndex: "Branch",
    key: "Branch",
    width: 100,
  },
  {
    title: "Version",
    dataIndex: "Version",
    key: "Version",
    width: 100,
  },
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
    title: "Is Numeric",
    dataIndex: "IsNumeric",
    key: "IsNumeric",
    width: 110,
    render: (isNumeric) => (
      <Tag color={isNumeric ? 'geekblue' : 'blue' }> {isNumeric ? 'Yes' : 'No'} </Tag>
    ),
  },
  {
    title: "Result Type",
    dataIndex: "ResultType",
    key: "ResultType",
    width: 120,
  },
  {
    title: "Is Compare Spec",
    dataIndex: "IsCompareSpec",
    key: "IsCompareSpec",
    width: 150,
    render: (isCompareSpec) => (
      <Tag color={isCompareSpec ? 'geekblue' : 'blue' }> {isCompareSpec ? 'Yes' : 'No'} </Tag>
    ),
  },
  {
    title: "Sim Result",
    dataIndex: "SimResult",
    key: "SimResult",
    width: 120,
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
    width: 110,
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
        <DetailFormula />
        <EditFormula />
        <DeleteFormula name={record.Name} />
      </Space>
    ),
  },
];
const data = [
  {
    key: 1,
    Branch: "0002",
    Version: 2,
    Code: "GI_E03",
    Name: "Gula Sebelum Inversi LS 1",
    Desciption: "Gula Sebelum Inversi LS 1",
    IsNumeric: true,
    ResultType: "Support",
    IsCompareSpec: true,
    Suspended: false,
    SimResult: 34.675,
  },
  {
    Key: 2,
    Branch: "0002",
    Version: 2,
    Code: "GI_E04",
    Name: "Gula Sebelum Inversi LS 2",
    Desciption: null,
    IsNumeric: false,
    ResultType: "Final",
    IsCompareSpec: false,
    Suspended: true,
    SimResult: 34.675,
  },
];

const Formula = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Formula"
          subtitle="All data formula"
        />
        <div>
          <Link to="/master/formula/form">
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

export default Formula;
