import { Button, Input, Space, Table, Tag } from "antd";
import EditPriceListM from "./edit";
import DeletePriceListM from "./delete";
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
  },
  {
    title: "Price Code",
    dataIndex: "PriceCode",
    key: "PriceCode",
    width: 100,
  },
  {
    title: "Price Name",
    dataIndex: "PriceName",
    key: "PriceName",
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
    render: (isSuspend) => (
      <Tag color={isSuspend ? 'red' : 'green' }> {isSuspend ? 'Yes' : 'No'} </Tag>
    ),
  },
  {
    title: "Action",
    fixed: "right",
    width: 100,
    render: (_, record) => (
      <Space>
        <EditPriceListM />
        <DeletePriceListM name={record.PriceName} />
      </Space>
    ),
  },
];
const data = [
  {
    key: 1,
    BranchCode: "B01",
    PriceCode: "P01",
    PriceName: "Price 1",
    Description: "Lorem ipsum dolor sit amet",
    IsSuspend: false,
  },
  {
    key: 2,
    BranchCode: "B02",
    PriceCode: "P02",
    PriceName: "Price 2",
    Description: "Lorem ipsum dolor sit amet",
    IsSuspend: true,
  }
];

const PriceListM = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Price List M"
          subtitle="All data price list m"
        />
        <div>
          <Link to="/master/price-list-m/form">
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

export default PriceListM;
