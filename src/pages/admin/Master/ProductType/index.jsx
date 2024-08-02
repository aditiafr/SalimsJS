import { Button, Input, Space, Table, Tag } from "antd";
import EditProductType from "./edit";
import DeleteProductType from "./delete";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: "Code",
    dataIndex: "Code",
    key: "Code",
    width: 80,
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
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
        <EditProductType />
        <DeleteProductType name={record.Name} />
      </Space>
    ),
  },
];
const data = [
  {
    key: 1,
    Code : "02",
    Name: "Reagent",
    Description: null,
    Suspended: false,
  },
  {
    key: 2,
    Code : "03",
    Name: "Consumable",
    Description: "Product that can be used only once",
    Suspended: false,
  },
  {
    key: 3,
    Code : "04",
    Name: "Equipment",
    Description: "Product that can be used multiple times",
    Suspended: true,
  },
];

const ProductType = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Product Type"
          subtitle="All data product type"
        />
        <div>
          <Link to="/master/product-type/form">
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

export default ProductType;
