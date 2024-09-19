import { Button, Input, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import EditParameter from "./edit";
import DeleteParameter from "./delete";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: "Code",
    dataIndex: "Code",
    key: "Code",
    width: 60,
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    width: 100,
  },
  {
    title: "Category",
    dataIndex: "Category",
    key: "Category",
    width: 80,
  },
  {
    title: "Procedure No",
    dataIndex: "ProcedureNo",
    key: "ProcedureNo",
    width: 100,
  },
  {
    title: "Procedure Name",
    dataIndex: "ProcedureName",
    key: "ProcedureName",
    width: 100,
  },
  {
    title: "Std Lead Time",
    dataIndex: "StdLeadTime",
    key: "StdLeadTime",
    width: 70,
  },
  {
    title: "Price",
    dataIndex: "Price",
    key: "Price",
    width: 90,
    render: (text) => {
      const value = text ?? 0;

      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(value);
    },
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
    width: 100,
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
        <EditParameter />
        <DeleteParameter name={record.Name} />
      </Space>
    ),
  },
];
const data = [
  {
    key: 1,
    Code: "BBIA-01",
    Name: "Penetapan Kadar Gula",
    Category: "Solid",
    ProcedureNo: "SNI-01-2892-1992",
    ProcedureName: "KADAR GULA METODE LUFF SCHOORL",
    StdLeadTime: "08:00",
    Price: 10000000,
    Description: "Penetapan kadar gula dalam air",
    Suspended: false,
  },
  {
    key: 2,
    Code: "BBIA-02",
    Name: "Penetapan Kadar Lemak",
    Category: "Solid",
    ProcedureNo: "SNI-01-2892-1992",
    ProcedureName: "KADAR LEMAK METODE SOXHLET",
    StdLeadTime: "08:00",
    Price: 90000,
    Description: "Penetapan kadar lemak dalam air",
    Suspended: false,
  },
  {
    key: 3,
    Code: "BBIA-03",
    Name: "Penetapan Kadar Protein",
    Category: "Solid",
    ProcedureNo: "SNI-01-2892-1992",
    ProcedureName: "KADAR PROTEIN METODE KJELDAHL",
    StdLeadTime: "08:00",
    Price: 1000000,
    Description: "Penetapan kadar protein dalam air",
    Suspended: true,
  },
  {
    key: 4,
    Code: "BBIA-04",
    Name: "Penetapan Kadar Air",
    Category: "Solid",
    ProcedureNo: "SNI-01-2892-1992",
    ProcedureName: "KADAR AIR METODE KARL FISCHER",
    StdLeadTime: "08:00",
    Price: 1000000,
    Description: null,
    Suspended: false,
  },
  {
    key: 5,
    Code: "BBIA-05",
    Name: "Penetapan Kadar Abu",
    Category: "Solid",
    ProcedureNo: "SNI-01-2892-1992",
    ProcedureName: "KADAR ABU METODE TUNGGAKAN",
    StdLeadTime: "08:00",
    Price: 1000000,
    Description: "Penetapan kadar abu dalam air",
    Suspended: false,
  }
];

const Parameter = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Parameter"
          subtitle="All data parameter"
        />
        <div>
          <Link to="/master/parameter/form">
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

export default Parameter;
