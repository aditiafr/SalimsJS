import { Button, Input, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditBuilding from "./edit";
import DeleteBuilding from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { getBuilding } from "../../../../Api/Master/getData";

const Building = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getBuilding();
      setData(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
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
      title: "No",
      dataIndex: "key",
      key: "key",
      width: 60,
      fixed: "left",
    },
    {
      title: "BuildingCode",
      dataIndex: "BuildingCode",
      key: "BuildingCode",
      width: 150,
    },
    {
      title: "BuildingName",
      dataIndex: "BuildingName",
      key: "BuildingName",
      width: 150,
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
      width: 150,
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      width: 150,
    },
    {
      title: "Fax",
      dataIndex: "Fax",
      key: "Fax",
      width: 150,
    },
    {
      title: "Contact",
      dataIndex: "Contact",
      key: "Contact",
      width: 150,
    },
    {
      title: "ZIPCode",
      dataIndex: "ZIPCode",
      key: "ZIPCode",
      width: 150,
    },
    {
      title: "City",
      dataIndex: "City",
      key: "City",
      width: 150,
    },
    {
      title: "Country",
      dataIndex: "Country",
      key: "Country",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 150,
    },
    {
      title: "Action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <EditBuilding dataSource={record} onEdit={fetchData} />
          <DeleteBuilding />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="BUILDING" subtitle="All data building" />
        <div>
          <Link to="/master/building/form">
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
          loading={loading}
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

export default Building;
