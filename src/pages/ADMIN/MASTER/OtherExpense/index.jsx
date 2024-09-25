"use client";

import { Button, Input, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import EditOtherExpense from "./edit";
import DeleteOtherExpense from "./delete";
import { getOtherExpense } from "../../../../Api/Master/getData";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const OtherExpense = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getOtherExpense( {
        sortParam: 'expensecode', 
        sortOrder: 'asc',
      });
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Code",
      dataIndex: "OtherExpenseCode",
      key: "OtherExpenseCode",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "OtherExpenseName",
      key: "OtherExpenseName",
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
      render: (isDefaultTakingSample) => (
        <Tag color={isDefaultTakingSample ? 'cyan' : 'magenta' }> {isDefaultTakingSample ? 'Yes' : 'No'} </Tag>
      ),
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
      dataIndex: "IsSuspend",
      key: "IsSuspend",
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
          <EditOtherExpense dataSource={record} onEdit={fetchData} />
          <DeleteOtherExpense OtherExpenseCode={record.OtherExpenseCode} name={record.OtherExpenseName} onDelete={fetchData} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Other Expense"
          subtitle="All data other expense"
        />
        <div>
          <Link to="/master/other_expense/form">
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
