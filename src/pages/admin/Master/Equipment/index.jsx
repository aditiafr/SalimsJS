"use client";

import { Button, Input, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import EditEquipment from "./edit";
import DeleteEquipment from "./delete";
import { CheckSquareTwoTone, CloseSquareTwoTone } from "@ant-design/icons";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: "Branch",
    dataIndex: "Branch",
    key: "Branch",
    width: 100,
  },
  {
    title: "Version",
    dataIndex: "Version",
    key: "Version",
    width: 100,
  },
  {
    title: "Equipment Type",
    dataIndex: "EquipmentType",
    key: "EquipmentType",
    width: 150,
  },
  {
    title: "Vendor",
    dataIndex: "Vendor",
    key: "Vendor",
    width: 80,
  },
  {
    title: "Manufacture",
    dataIndex: "Manufacture",
    key: "Manufacture",
    width: 120,
  },
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
    title: "Serial Number",
    dataIndex: "SerialNumber",
    key: "SerialNumber",
    width: 140,
    render: (text) => (text ?? "N/A"),
  },
  {
    title: "Calibration Date",
    dataIndex: "CalibrationDate",
    key: "CalibrationDate",
    width: 150,
    render: (text) => (text ?? "N/A"),
  },
  {
    title: "Calibration Due Date",
    dataIndex: "CalibrationDueDate",
    key: "CalibrationDueDate",
    width: 200,
    render: (text) => (text ?? "N/A"),
  },
  {
    title: "Temp",
    dataIndex: "Temp",
    key: "Temp",
    width: 70,
    render: (text) => (text ? `${text}°C` : "N/A"),
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
    width: 200,
    render: (text) => (text ?? "N/A"),
  },
  {
    title: "QC Tool",
    dataIndex: "IsQCTool",
    key: "IsQCTool",
    width: 100,
    render: (isQCTool) => {
      return (isQCTool ? 
        <CheckSquareTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px' }}/> :
        <CloseSquareTwoTone twoToneColor="#f5222d" style={{ fontSize: '20px' }}/>);
    },
  },
  {
    title: "Suspended",
    dataIndex: "Suspended",
    key: "Suspended",
    width: 110,
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
        <EditEquipment />
        <DeleteEquipment name={record.Name} />
      </Space>
    ),
  },
];
const data = [
  {
    key: 1,
    Branch: "0002",
    Version: "1",
    EquipmentType: "EQ-05",
    Vendor: "VR02",
    Manufacture: "MFG-01",
    Code: "EQ100",
    Name: "Alliance HPCL System",
    SerialNumber: "AA123WEX",
    CalibrationDate: "2021-09-01",
    CalibrationDueDate: "2022-09-01",
    Temp: "0",
    Description: "DAD Array UV Detector",
    IsQCTool: false,
    Suspended: false,
  },
  {
    key: 2,
    Branch: "0002",
    Version: "1",
    EquipmentType: "EQ-05",
    Vendor: "VR02",
    Manufacture: "MFG-01",
    Code: "EQ101",
    Name: "Alliance HPLC System",
    SerialNumber: "AA123WEX",
    CalibrationDate: "2021-09-01",
    CalibrationDueDate: "2022-09-01",
    Temp: "0",
    Description: null,
    IsQCTool: false,
    Suspended: false,
  },
  {
    key: 3,
    Branch: "0002",
    Version: "1",
    EquipmentType: "EQ-05",
    Vendor: "VR02",
    Manufacture: "MFG-01",
    Code: "EQ102",
    Name: "Alliance HPLC System",
    SerialNumber: "AA123WEX",
    CalibrationDate: "2021-09-01",
    CalibrationDueDate: "2022-09-01",
    Temp: "20",
    Description: "DAD Array UV Detector",
    IsQCTool: true,
    Suspended: true,
  },
  {
    key: 4,
    Branch: "0002",
    Version: "1",
    EquipmentType: "EQ-05",
    Vendor: "VR02",
    Manufacture: "MFG-01",
    Code: "EQ103",
    Name: "Alliance HPLC System",
    SerialNumber: "AA123WEX",
    CalibrationDate: "2021-09-01",
    CalibrationDueDate: "2022-09-01",
    Temp: "0",
    Description: "DAD Array UV Detector",
    IsQCTool: false,
    Suspended: false,
  }
]


const Equipment = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Equipment"
          subtitle="All data equipment"
        />
        <div>
          <Link to="/master/equipment/form">
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

export default Equipment;
