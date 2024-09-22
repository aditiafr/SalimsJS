import { Button, Input, Space, Table } from "antd";
import EditCustomer from "./edit";
import DeleteCustomer from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCustomer } from "../../../../Api/Master/getData";

const Customer = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getCustomer();
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
      title: "Customer Code",
      dataIndex: "CustomerCode",
      key: "CustomerCode",
      width: 150,
    },
    {
      title: "Customer Name",
      dataIndex: "CustomerName",
      key: "CustomerName",
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
      title: "Email",
      dataIndex: "Email",
      key: "Email",
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
          <EditCustomer dataSource={record} onEdit={fetchData} />
          <DeleteCustomer />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="CUSTOMER"
          subtitle="All data customer"
        />
        <div>
          <Link to="/master/customer/form">
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

export default Customer;
