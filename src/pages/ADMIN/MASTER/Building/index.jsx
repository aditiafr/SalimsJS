import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditBuilding from "./edit";
import DeleteBuilding from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { getBuilding } from "../../../../Api/Master/getData";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";

const Building = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getBuilding();
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
      title: "No",
      dataIndex: "key",
      key: "key",
      width: 60,
      fixed: "left",
    },
    {
      title: "Building Code",
      dataIndex: "buildingcode",
      key: "buildingcode",
      fixed: "left",
    },
    {
      title: "Building Name",
      dataIndex: "buildingname",
      key: "buildingname",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 350,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Fax",
      dataIndex: "fax",
      key: "fax",
    },
    {
      title: "Contact Name",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Zip Code",
      dataIndex: "zipcode",
      key: "zipcode",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
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
          <EditBuilding dataSource={record} onEdit={fetchData} />
          {record.issuspend === false && (
            <DeleteBuilding dataSource={record} onDelete={fetchData} />
          )}
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
            x: 2500,
          }}
        />
      </div>
    </>
  );
};

export default Building;
