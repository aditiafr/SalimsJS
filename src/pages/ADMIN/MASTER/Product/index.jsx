import { Button, Input, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import EditProduct from "./edit";
import DeleteProduct from "./delete";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: "branchcode",
    dataIndex: "branchcode",
    key: "branchcode",
  },
  {
    title: "prodcode",
    dataIndex: "prodcode",
    key: "prodcode",
  },
  {
    title: "prodname",
    dataIndex: "prodname",
    key: "prodname",
  },
  {
    title: "prodtypecode",
    dataIndex: "prodtypecode",
    key: "prodtypecode",
  },
  {
    title: "unitcode",
    dataIndex: "unitcode",
    key: "unitcode",
  },
  {
    title: "formulaqty",
    dataIndex: "formulaqty",
    key: "formulaqty",
  },
  {
    title: "tempcode",
    dataIndex: "tempcode",
    key: "tempcode",
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "warehousecode",
    dataIndex: "warehousecode",
    key: "warehousecode",
  },
  {
    title: "aliasname",
    dataIndex: "aliasname",
    key: "aliasname",
  },
  {
    title: "prodcatcode",
    dataIndex: "prodcatcode",
    key: "prodcatcode",
  },
  {
    title: "shelflife",
    dataIndex: "shelflife",
    key: "shelflife",
  },
  {
    title: "useintbatchno",
    dataIndex: "useintbatchno",
    key: "useintbatchno",
  },
  {
    title: "useextbatchno",
    dataIndex: "useextbatchno",
    key: "useextbatchno",
  },
  {
    title: "manufacturecode",
    dataIndex: "manufacturecode",
    key: "manufacturecode",
  },
  {
    title: "buildingcode",
    dataIndex: "buildingcode",
    key: "buildingcode",
  },
  {
    title: "minstock",
    dataIndex: "minstock",
    key: "minstock",
  },
  {
    title: "issuspend",
    dataIndex: "issuspend",
    key: "issuspend",
  },
  {
    title: "unitcodepack",
    dataIndex: "unitcodepack",
    key: "unitcodepack",
  },
  {
    title: "formulaqtypack",
    dataIndex: "formulaqtypack",
    key: "formulaqtypack",
  },
  {
    title: "Action",
    fixed: "right",
    width: 100,
    render: (_, record) => (
      <Space>
        <EditProduct />
        <DeleteProduct name={record.Name} />
      </Space>
    ),
  },
];
const data = [
  {
    branchcode: "BR001",
    prodcode: "P001",
    prodname: "Smartphone X",
    prodtypecode: "ELEC",
    unitcode: "PCS",
    formulaqty: 1,
    tempcode: "ROOM",
    description: "High-end smartphone with advanced features",
    warehousecode: "WH001",
    aliasname: "SmartX",
    prodcatcode: "PHONE",
    shelflife: 730,
    useintbatchno: true,
    useextbatchno: false,
    manufacturecode: "MAN001",
    buildingcode: "BLD001",
    minstock: 50,
    issuspend: false,
    unitcodepack: "BOX",
    formulaqtypack: 10
  },
  {
    branchcode: "BR002",
    prodcode: "P002",
    prodname: "Laptop Pro",
    prodtypecode: "ELEC",
    unitcode: "PCS",
    formulaqty: 1,
    tempcode: "COOL",
    description: "Professional-grade laptop for business use",
    warehousecode: "WH002",
    aliasname: "ProBook",
    prodcatcode: "COMP",
    shelflife: 1095,
    useintbatchno: true,
    useextbatchno: true,
    manufacturecode: "MAN002",
    buildingcode: "BLD002",
    minstock: 20,
    issuspend: false,
    unitcodepack: "PALLET",
    formulaqtypack: 50
  },
  {
    branchcode: "BR003",
    prodcode: "P003",
    prodname: "Wireless Earbuds",
    prodtypecode: "ACCS",
    unitcode: "PAIR",
    formulaqty: 2,
    tempcode: "ROOM",
    description: "Bluetooth wireless earbuds with noise cancellation",
    warehousecode: "WH001",
    aliasname: "AirPods",
    prodcatcode: "AUDIO",
    shelflife: 365,
    useintbatchno: false,
    useextbatchno: true,
    manufacturecode: "MAN003",
    buildingcode: "BLD001",
    minstock: 100,
    issuspend: false,
    unitcodepack: "BOX",
    formulaqtypack: 20
  }
];

const Product = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="PRODUCT"
          subtitle="All data Product"
        />
        <div>
          <Link to="/master/product/form">
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
            x: 3000,
          }}
        />
      </div>
    </>
  );
};

export default Product;
