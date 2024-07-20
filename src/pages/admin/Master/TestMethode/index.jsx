import { Button, Input, Space, Table, Tag } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
import EditTestMethode from "./edit";
import DeleteTestMethode from "./delete";

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
    title: "MethodeId",
    dataIndex: "MethodeId",
    key: "MethodeId",
    width: 150,
  },
  {
    title: "Preservation",
    dataIndex: "Preservation",
    key: "Preservation",
    width: 150,
  },
  {
    title: "StorageTimeLimit",
    dataIndex: "StorageTimeLimit",
    key: "StorageTimeLimit",
    width: 150,
  },
  {
    title: "Desciption",
    dataIndex: "Desciption",
    key: "Desciption",
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
        <EditTestMethode />
        <DeleteTestMethode />
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    MethodeId: "WH01",
    Preservation: "001",
    StorageTimeLimit: "123",
    Desciption: "Test Data",
    Suspend: false,
  },
];

const TestMethode = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TEST METHODE" subtitle="All data test methode" />
        <div>
          <Link to="/master/test-methode/form">
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

export default TestMethode;
