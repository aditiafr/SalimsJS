import { Button, Input, Space, Table } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import EditWarehouse from "./edit";
import DeleteBuilding from "../Building/delete";
import { useEffect, useState } from "react";
import { getWarehouse } from "../../../../Api/Master/getData";

const Page = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getWarehouse();
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
      width: 80,
    },
    {
      title: "Warehouse Code",
      dataIndex: "WarehouseCode",
      key: "WarehouseCode",
      width: 150,
    },
    {
      title: "Warehouse Name",
      dataIndex: "WarehouseName",
      key: "WarehouseName",
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
      title: "ZIP Code",
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
          <EditWarehouse dataSource={record} onEdit={fetchData} />
          <DeleteBuilding />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="WAREHOUSE" subtitle="All data warehouse" />
        <div>
          <Link to="/master/warehouse/form">
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

export default Page;
