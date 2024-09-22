import { Button, Input, Space, Table, Tag } from "antd";
import EditZona from "./edit";
import DeleteZona from "./delete";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: "Zona Code",
    dataIndex: "ZonaCode",
    key: "ZonaCode",
    width: 80,
  },
  {
    title: "Zona Name",
    dataIndex: "ZonaName",
    key: "ZonaName",
    width: 100,
  },
  {
    title: "Address",
    dataIndex: "Address",
    key: "Address",
    width: 200,
    render: (text) => (text ?? "N/A"),
  },
  {
    title: "ZIP Code",
    dataIndex: "ZIPCode",
    key: "ZIPCode",
    width: 100,
  },
  {
    title: "City",
    dataIndex: "City",
    key: "City",
    width: 100,
  },
  {
    title: "LatLong",
    dataIndex: "LatLong",
    key: "LatLong",
    width: 100,
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
    width: 200,
    render: (text) => (text ?? "N/A"),
  },
  {
    title: "Suspended",
    dataIndex: "Suspended",
    key: "Suspended",
    width: 100,
    render: (suspended) => (
      <Tag color={suspended ? 'red' : 'green' }> {suspended ? 'Yes' : 'No'} </Tag>
    ),
  },
  {
    title: "Action",
    fixed: "right",
    width: 100,
    render: (_, record) => (
      <Space>
        <EditZona />
        <DeleteZona name={record.ZonaName} />
      </Space>
    ),
  },
];
const data = [
  {
    key: 1,
    ZonaCode : "01",
    ZonaName: "Zona 1",
    Address: "Jl. Raya Kuta No. 1",
    ZIPCode: "80361",
    City: "Badung",
    LatLong: "-8.7152, 115.1709",
    Suspended: false,
  },
  {
    key: 2,
    ZonaCode : "02",
    ZonaName: "Zona 2",
    Address: "Jl. Raya Kuta No. 2",
    ZIPCode: "80361",
    City: "Badung",
    LatLong: "-8.7152, 115.1709",
    Suspended: true,
  }
];

const Zona = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Zona"
          subtitle="All data zona"
        />
        <div>
          <Link to="/master/zona/form">
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

export default Zona;
