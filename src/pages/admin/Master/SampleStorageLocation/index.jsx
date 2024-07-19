import { Button, Input, Space, Table } from "antd";
import EditSampleStorageLocation from "./edit";
import DeleteSampleStorageLocation from "./delete";
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
    title: "Building",
    dataIndex: "Building",
    key: "Building",
    width: 150,
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
    title: "Desciption",
    dataIndex: "Desciption",
    key: "Desciption",
    width: 150,
  },
  {
    title: "Action",
    fixed: "right",
    width: 100,
    render: (_, record) => (
      <Space>
        <EditSampleStorageLocation />
        <DeleteSampleStorageLocation />
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    Building: "BLD01",
    Code: "001",
    Name: "Sudirman",
    Desciption: "Test Data",
  },
];

const SampleStorageLocation = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="SAMPLE STORAGE LOCATION"
          subtitle="All data sample storage location"
        />
        <div>
          <Link to="/master/sample-storage-location/form">
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

export default SampleStorageLocation;
