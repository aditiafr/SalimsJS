import { Button, Input, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditTempCondition from "./edit";
import DeleteTempCondition from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";

const data = [
  {
    tempcode: "ROOM",
    tempname: "Room Temperature",
    description: "Standard room temperature, suitable for most products",
    issuspend: false
  },
  {
    tempcode: "COOL",
    tempname: "Cool Storage",
    description: "Slightly cooled environment for temperature-sensitive items",
    issuspend: false
  },
  {
    tempcode: "COLD",
    tempname: "Cold Storage",
    description: "Refrigerated storage for perishable goods",
    issuspend: false
  },
  {
    tempcode: "FROZ",
    tempname: "Frozen Storage",
    description: "Deep freeze storage for long-term preservation",
    issuspend: false
  },
  {
    tempcode: "WARM",
    tempname: "Warm Storage",
    description: "Heated storage for specific chemical or industrial products",
    issuspend: true
  }
]

const TempCondition = () => {
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
      title: "tempcode",
      dataIndex: "tempcode",
      key: "tempcode",
    },
    {
      title: "tempname",
      dataIndex: "tempname",
      key: "tempname",
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
    // {
    //   title: "Action",
    //   fixed: "right",
    //   width: 100,
    //   render: (_, record) => (
    //     <Space>
    //       <EditTempCondition dataSource={record} />
    //       {record.issuspend === false && (
    //         <DeleteTempCondition dataSource={record} />
    //       )}
    //     </Space>
    //   ),
    // },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TempCondition" subtitle="All data TempCondition" />
        <div>
          <Link to="/master/temp_condition/form">
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

export default TempCondition;
