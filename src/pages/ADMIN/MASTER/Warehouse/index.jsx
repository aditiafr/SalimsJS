import { Button, Space, Table, Tag } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import EditWarehouse from "./edit";
import { useEffect, useState } from "react";
import { getWarehouse } from "../../../../Api/Master/getData";
import DeleteWarehouse from "./delete";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";

const Warehouse = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getWarehouse();
      console.log("DATA", response);
      
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
      fixed: "left",
      width: 80,
    },
    {
      title: "warehousecode",
      dataIndex: "warehousecode",
      key: "warehousecode",
      fixed: "left",
    },
    {
      title: "Warehouse Name",
      dataIndex: "warehousename",
      key: "warehousename",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Fax",
      dataIndex: "fax",
      key: "fax",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Contact",
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
          <EditWarehouse dataSource={record} onEdit={fetchData} />
          {record.issuspend === false && (
            <DeleteWarehouse dataSource={record} onDelete={fetchData} />
          )}
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
            x: 2000,
          }}
        />
      </div>
    </>
  );
};

export default Warehouse;
