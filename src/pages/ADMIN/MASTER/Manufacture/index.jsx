import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditManufacture from "./edit";
import DeleteManufacture from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";
import { getManufacture } from "../../../../Api/Master/getData";

const Manufacture = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getManufacture();
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
      title: "Manufacture Code",
      dataIndex: "manufacturecode",
      key: "manufacturecode",
    },
    {
      title: "Manufacture Name",
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
          <EditManufacture dataSource={record} onEdit={fetchData} />
          {record.issuspend === false && (
            <DeleteManufacture dataSource={record} onDelete={fetchData} />
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="MANUFACTURE" subtitle="All data Manufacture" />
        <div>
          <Link to="/master/manufacture/form">
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
            x: 1000,
          }}
        />
      </div>
    </>
  );
};

export default Manufacture;
