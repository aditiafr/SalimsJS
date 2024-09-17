import { Button, Space, Table } from "antd";
import EditStorageLocation from "./edit";
import DeleteStorageLocation from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStorageLocation } from "../../../../Api/Master/getData";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";

const StorageLocation = () => {

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getStorageLocation();
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
      title: "key",
      dataIndex: "key",
      key: "key",
      fixed: "left",
      width: 80,
    },
    {
      title: "LocationCode",
      dataIndex: "locationcode",
      key: "LocationCode",
      fixed: "left",
    },
    {
      title: "LocationName",
      dataIndex: "locationname",
      key: "LocationName",
    },
    {
      title: "WarehouseName",
      dataIndex: "warehousename",
      key: "WarehouseName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "Description",
    },
    // {
    //   title: "Suspended",
    //   dataIndex: "Suspended",
    //   key: "Suspended",
    //   width: 120,
    //   render: (suspended) => (
    //     <Tag color={suspended ? "red" : "green"}>{suspended ? "Yes" : "No"}</Tag>
    //   ),
    // },
    {
      title: "Action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <EditStorageLocation dataSource={record} onEdit={fetchData} />
          <DeleteStorageLocation />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="STORAGE LOCATION"
          subtitle="All data storage location"
        />
        <div>
          <Link to="/master/storage-location/form">
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

export default StorageLocation;
