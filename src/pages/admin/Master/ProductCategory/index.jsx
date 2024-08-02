import { Button, Input, Space, Table, Tag } from "antd";
import React from "react";
import EditProductCategory from "./edit";
import DeleteProductCategory from "./delete";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Link } from "react-router-dom";
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
        <EditProductCategory />
        <DeleteProductCategory name={record.Name} />
      </Space>
    ),
  },
];
const data = [
  {
    key: 1,
    Code: "C02",
    Name: "Liquid",
    Description: "A product that is in liquid form",
    Suspended: false,
  },
  {
    key: 2,
    Code: "C03",
    Name: "Solid",
    Description: "A product that is in solid form",
    Suspended: true,
  },
  {
    key: 3,
    Code: "C04",
    Name: "Gas",
    Description: null,
    Suspended: false,
  },
];

const ProductCategory = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Product Category"
          subtitle="All data product category"
        />
        <div>
          <Link to="/master/product-category/form">
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

export default ProductCategory;
