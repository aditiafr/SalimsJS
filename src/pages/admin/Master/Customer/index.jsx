import { Button, Input, Space, Table, Tag } from "antd";
import EditCustomer from "./edit";
import DeleteCustomer from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: "key",
    dataIndex: "key",
    key: "key",
    width: 80,
  },
  {
    title: "Code",
    dataIndex: "Code",
    key: "Code",
    width: 150,
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    width: 150,
  },
  {
    title: "Address",
    dataIndex: "Address",
    key: "Address",
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
    title: "Phone",
    dataIndex: "Phone",
    key: "Phone",
    width: 150,
  },
  {
    title: "Contact",
    dataIndex: "Contact",
    key: "Contact",
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "Email",
    key: "Email",
    width: 150,
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
    width: 150,
  },
  {
    title: "Suspended",
    dataIndex: "Suspended",
    key: "Suspended",
    width: 120,
    render: (suspended) => (
      <Tag color={suspended ? "red" : "green"}>{suspended ? "Yes" : "No"}</Tag>
    ),
  },
  {
    title: "Action",
    fixed: "right",
    width: 100,
    render: (_, record) => (
      <Space>
        <EditCustomer />
        <DeleteCustomer />
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    Code: "PK01",
    Name: "PT.Antam Priemere",
    Address: "Jl. Jendral Sudirman",
    ZIPCode: "ZIP001",
    City: "Jakarta Pusat",
    Country: "Indonesia",
    Phone: "0812398162",
    Contact: "Ahmad",
    Email: "ahmad@gmail.com",
    Description: "Data 1",
    Suspended: false,
  },
  {
    key: "2",
    Code: "PK02",
    Name: "PT.Antam Priemere",
    Address: "Jl. Jendral Sudirman",
    ZIPCode: "ZIP002",
    City: "Jakarta Pusat",
    Country: "Indonesia",
    Phone: "0822398262",
    Contact: "Ahmad",
    Email: "ahmad@gmail.com",
    Description: "Data 2",
    Suspended: true,
  },
];

const Customer = () => {
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
          <Search
            placeholder="Search..."
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </div>
        <Table
          // loading={true}
          rowSelection
          columns={columns}
          dataSource={data}
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
