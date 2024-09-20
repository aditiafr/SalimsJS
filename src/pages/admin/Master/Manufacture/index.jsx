import { Button, Input, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditManufacture from "./edit";
import DeleteManufacture from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";

const data = [
  {
    manufacturecode: "MAN001",
    manufacturename: "TechVision Electronics",
    issuspend: false,
    description: "Leading manufacturer of consumer electronics and smart devices"
  },
  {
    manufacturecode: "MAN002",
    manufacturename: "GreenLeaf Organics",
    issuspend: false,
    description: "Eco-friendly manufacturer specializing in organic food products"
  },
  {
    manufacturecode: "MAN003",
    manufacturename: "AutoPro Industries",
    issuspend: true,
    description: "Automotive parts manufacturer currently under regulatory review"
  }
];

const Manufacture = () => {
  // const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [loading, setLoading] = useState(false);

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
      title: "No",
      dataIndex: "key",
      key: "key",
      width: 60,
      fixed: "left",
    },
    {
      title: "manufacturecode",
      dataIndex: "manufacturecode",
      key: "manufacturecode",
    },
    {
      title: "manufacturename",
      dataIndex: "manufacturename",
      key: "manufacturename",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Suspend",
      dataIndex: "issuspend",
      key: "issuspend",
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
          <EditManufacture dataSource={record} />
          {record.issuspend === false && (
            <DeleteManufacture dataSource={record} />
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="Manufacture" subtitle="All data Manufacture" />
        <div>
          <Link to="/master/Manufacture/form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
      <div className="w-full bg-white p-4 rounded-lg">
        <div className="w-full flex justify-end pb-4">
          <Input
            placeholder="search..."
            allowClear
            value={searchText}
            onChange={handleSearch}
            style={{ width: 200 }}
          />
        </div>
        <Table
          // loading={loading}
          rowSelection
          columns={columns}
          dataSource={filteredData}
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

export default Manufacture;
