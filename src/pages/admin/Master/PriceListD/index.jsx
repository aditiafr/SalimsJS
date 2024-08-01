import { Button, Input, Space, Table } from "antd";
import EditZona from "./edit";
import DeletePriceListD from "./delete";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: "Branch Code",
    dataIndex: "BranchCode",
    key: "BranchCode",
    width: 100,
    render: (text) => (text ?? "REQ"),
  },
  {
    title: "Price Code",
    dataIndex: "PriceCode",
    key: "PriceCode",
    width: 100,
    render: (text) => (text ?? "REQ"),
  },
  {
    title: "Prod Code",
    dataIndex: "ProdCode",
    key: "ProdCode",
    width: 100,
    render: (text) => (text ?? "REQ"),
  },
  {
    title: "Def Price",
    dataIndex: "DefPrice",
    key: "DefPrice",
    width: 100,
  },
  {
    title: "Disc P",
    dataIndex: "DiscP",
    key: "DiscP",
    width: 100,
  },
  {
    title: "Disc M",
    dataIndex: "DiscM",
    key: "DiscM",
    width: 100,
  },
  {
    title: "Price List",
    dataIndex: "PriceList",
    key: "PriceList",
    width: 100,
  },
  {
    title: "Action",
    fixed: "right",
    width: 100,
    render: (_, record) => (
      <Space>
        <EditZona />
        <DeletePriceListD code={record.PriceCode} />
      </Space>
    ),
  },
];
const data = [
  {
    key: 1,
    BranchCode: "B001",
    PriceCode: "P001",
    ProdCode: "PR001",
    DefPrice: "10000",
    DiscP: "10",
    DiscM: "1000",
    PriceList: "10000",
  },
  {
    key: 2,
    BranchCode: "B002",
    PriceCode: "P002",
    ProdCode: "PR002",
    DefPrice: "20000",
    DiscP: "20",
    DiscM: "2000",
    PriceList: "20000",
  },
];

const PriceListD = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Price List D"
          subtitle="All data price list D"
        />
        <div>
          <Link to="/master/price-list-d/form">
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

export default PriceListD;
