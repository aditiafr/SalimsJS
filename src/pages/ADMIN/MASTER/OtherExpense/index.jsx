import { Button, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import EditOtherExpense from "./edit";
import DeleteOtherExpense from "./delete";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";

const OtherExpense = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    try {
      const response = [];
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (val) => val && val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );


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
        <Tag color={suspended ? 'red' : 'green'}> {suspended ? 'Yes' : 'No'} </Tag>
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
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="OTHER EXPENSE"
          subtitle="All data other expense"
        />
        <div>
          <Link to="form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
      <div className="w-full bg-white p-4 rounded-lg">
        <div className="w-full flex justify-end pb-4">
          <SearchInput value={searchText} onChange={handleSearch} />
        </div>
        <Table
          loading={loading}
          rowSelection
          columns={columns}
          dataSource={filteredData}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 10,
          }}
          scroll={{
            x: 1500,
          }}
        />
      </div>
    </>
  );
};

export default OtherExpense;
