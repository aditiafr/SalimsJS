import { Button, Input, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";

const data = [
  {
    testpreparationid: "TP001",
    testpreparationname: "Sample Dilution",
    description: "Process of diluting a sample to achieve the desired concentration for accurate testing",
    issuspend: false
  },
  {
    testpreparationid: "TP002",
    testpreparationname: "Heat Treatment",
    description: "Applying controlled heat to a sample to prepare it for specific chemical or biological tests",
    issuspend: false
  },
  {
    testpreparationid: "TP003",
    testpreparationname: "Filtration",
    description: "Removing impurities or separating components of a sample through a filter medium",
    issuspend: true
  }
];

const TestPreparation = () => {
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
      title: "testpreparationid",
      dataIndex: "testpreparationid",
      key: "testpreparationid",
    },
    {
      title: "testpreparationname",
      dataIndex: "testpreparationname",
      key: "testpreparationname",
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
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TEST PREPARATION" subtitle="All data Test Preparation" />
        <div>
          <Link to="/master/test_preparation/form">
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

export default TestPreparation;
