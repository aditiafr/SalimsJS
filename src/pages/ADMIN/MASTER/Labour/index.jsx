"use client";

import { Button, Input, Space, Table, Tabs, Tag } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import EditLabour from "./edit";
import DeleteLabour from "./delete";
import DetailLabour from "./detail";
import { getLabour } from "../../../../Api/Master/getData";
import LabourPar from "./LabourPar";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Labour = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getLabour();
      setData(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  },  []);

  const columns = [
    {
      title: "Branch",
      dataIndex: "branchcode",
      key: "branchcode",
      width: 80,
    },
    {
      title: "Labour Code",
      dataIndex: "labourcode",
      key: "labourcode",
      width: 80,
    },
    {
      title: "Labour Name",
      dataIndex: "labourname",
      key: "labourname",
      width: 100,
    },
    {
      title: "Department",
      dataIndex: "depcode",
      key: "depcode",
      width: 100,
    },
    {
      title: "Title",
      dataIndex: "tittle",
      key: "tittle",
      width: 100,
    },
    {
      title: "Date of Use",
      dataIndex: "dateofuse",
      key: "dateofuse",
      width: 100,
    },
    {
      title: "Date of Available",
      dataIndex: "dateofavailable",
      key: "dateofavailable",
      width: 100,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Suspended",
      dataIndex: "issuspend",
      key: "issuspend",
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
          <EditLabour dataSource={record} onEdit={fetchData} />
          {record.issuspend === false && (
            <DeleteLabour name={record.labourname} labourCode={record.labourcode} onDelete={fetchData} />
          )}
        </Space>
      ),
    },
  ];

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
          loading={loading}
          rowSelection
          columns={columns}
          dataSource={data}
          expandable={{ expandedRowRender }}
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

const expandedRowRender = (record) => {
  const items = [
    {
      key: '1',
      label: 'Labour Parameter',
      children: <LabourPar dataSource={record.detail} />,
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} />
  )
}