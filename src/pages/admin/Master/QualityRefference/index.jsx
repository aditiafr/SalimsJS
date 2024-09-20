import { Button, Input, Table, Tag } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";

const data = [
  {
    qrid: "QR001",
    qrname: "Premium Grade",
    prodcatcode: "ELEC",
    refvalueqty: 100,
    description: "Highest quality rating for electronic products, meeting all premium standards",
    issuspend: false
  },
  {
    qrid: "QR002",
    qrname: "Standard Grade",
    prodcatcode: "FOOD",
    refvalueqty: 85,
    description: "Normal quality rating for food products, meeting all safety and quality standards",
    issuspend: true
  },
  {
    qrid: "QR003",
    qrname: "Economy Grade",
    prodcatcode: "TEXT",
    refvalueqty: 70,
    description: "Basic quality rating for textile products, meeting minimum quality standards",
    issuspend: true
  }
];

const QualityRefference = () => {
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
      title: "qrid",
      dataIndex: "qrid",
      key: "qrid",
    },
    {
      title: "qrname",
      dataIndex: "qrname",
      key: "qrname",
    },
    {
      title: "prodcatcode",
      dataIndex: "prodcatcode",
      key: "prodcatcode",
    },
    {
      title: "refvalueqty",
      dataIndex: "refvalueqty",
      key: "refvalueqty",
    },
    {
      title: "description",
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
        <HeaderTitle title="QualityRefference" subtitle="All data QualityRefference" />
        <div>
          <Link to="/master/quality_refference/form">
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

export default QualityRefference;
