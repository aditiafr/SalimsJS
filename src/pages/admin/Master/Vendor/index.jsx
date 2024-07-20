import { Button, Input, Space, Table, Tag } from "antd";
import EditVendor from "./edit";
import DeleteVendor from "./delete";
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
    title: "Branch",
    dataIndex: "Branch",
    key: "Branch",
    width: 150,
  },
  {
    title: "VendorCode",
    dataIndex: "VendorCode",
    key: "VendorCode",
    width: 150,
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "Email",
    key: "Email",
    width: 150,
  },
  {
    title: "Address1",
    dataIndex: "Address1",
    key: "Address1",
    width: 150,
  },
  {
    title: "Address2",
    dataIndex: "Address2",
    key: "Address2",
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
    title: "Fax",
    dataIndex: "Fax",
    key: "Fax",
    width: 150,
  },
  {
    title: "ContactPerson",
    dataIndex: "ContactPerson",
    key: "ContactPerson",
    width: 150,
  },
  {
    title: "Hp",
    dataIndex: "Hp",
    key: "Hp",
    width: 150,
  },
  {
    title: "Phone",
    dataIndex: "Phone",
    key: "Phone",
    width: 150,
  },
  {
    title: "NPWP",
    dataIndex: "NPWP",
    key: "NPWP",
    width: 150,
  },
  {
    title: "Type",
    dataIndex: "Type",
    key: "Type",
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
        <EditVendor />
        <DeleteVendor />
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    Branch: "0001",
    VendorCode: "01",
    Name: "Ahmad",
    Email: "ahmad@mail.com",
    Address1: "Jakarta 1",
    Address2: "Jakarta 2",
    ZIPCode: "Zip",
    City: "Jakarta",
    Country: "Indonesia",
    Fax: "1234",
    ContactPerson: "Ahmad",
    Hp: "08123123312",
    Phone: "0812312984",
    NPWP: "123123123",
    Type: "Work",
    Suspended: false,
  },
  {
    key: "2",
    Branch: "0002",
    VendorCode: "02",
    Name: "Ahmad",
    Email: "ahmad@mail.com",
    Address1: "Jakarta 11",
    Address2: "Jakarta 22",
    ZIPCode: "Zip",
    City: "Jakartaa",
    Country: "Indonesiaa",
    Fax: "1234",
    ContactPerson: "Ahmad",
    Hp: "08123123312",
    Phone: "0812312984",
    NPWP: "123123123",
    Type: "Work",
    Suspended: true,
  },
];

const Vendor = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="VENDOR" subtitle="All data vendor" />
        <div>
          <Link to="/master/vendor/form">
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

export default Vendor;
