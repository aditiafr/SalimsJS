
import { Button, Input, Space, Table, Tag } from "antd";
import EditTimePoint from "./edit";
import DeleteTimePoint from "./delete";
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
    title: "Interval",
    dataIndex: "Interval",
    key: "Interval",
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
        <EditTimePoint />
        <DeleteTimePoint />
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    Code: "001",
    Name: "Sudirman",
    Interval: "03/14/02:00",
    Description: "Test Data",
    Suspense: false,
  },
];

const TimePoint = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="TIME POINT"
          subtitle="All data time point"
        />
        <div>
          <Link to="/master/time-point/form">
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

export default TimePoint;
