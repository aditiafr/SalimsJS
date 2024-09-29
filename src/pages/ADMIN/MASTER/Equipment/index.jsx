"use client";

import { Button, Input, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import EditEquipment from "./edit";
import DeleteEquipment from "./delete";
import { CheckSquareTwoTone, CloseSquareTwoTone } from "@ant-design/icons";
import { getEquipment } from "../../../../Api/Master/getData";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Equipment = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getEquipment();
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Branch",
      dataIndex: "branchcode",
      key: "branchcode",
      width: 90,
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
      width: 100,
    },
    {
      title: "Code",
      dataIndex: "equipmentcode",
      key: "equipmentcode",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "equipmentname",
      key: "equipmentname",
      width: 100,
    },
    {
      title: "Equipment Type",
      dataIndex: "EquipmentType",
      key: "EquipmentType",
      width: 150,
      render: (_, record) => {
        return `(${record.equipmenttypecode}) ${record.equipmenttypename}`;
      }
    },
    {
      title: "Vendor",
      dataIndex: "Vendor",
      key: "Vendor",
      width: 150,
      render: (_, record) => {
        return `(${record.vendorcode}) ${record.vendorname}`;
      }
    },
    {
      title: "Manufacture",
      dataIndex: "Manufacture",
      key: "Manufacture",
      width: 150,
      render: (_, record) => {
        return `(${record.manufacturecode}) ${record.manufacturename}`;
      }
    },
    {
      title: "Serial Number",
      dataIndex: "serialnumber",
      key: "serialnumber",
      width: 140,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Calibration Date",
      dataIndex: "datecalibration",
      key: "datecalibration",
      width: 150,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Calibration Due Date",
      dataIndex: "duedatecalibration",
      key: "duedatecalibration",
      width: 150,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Date of Use",
      dataIndex: "dateofuse",
      key: "dateofuse",
      width: 150,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Date of Available",
      dataIndex: "dateofavailable",
      key: "dateofavailable",
      width: 150,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      width: 150,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Temp",
      dataIndex: "tempinfo",
      key: "tempinfo",
      width: 70,
      render: (text) => (text ? `${text}°C` : "N/A"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "QC Tool",
      dataIndex: "isqctools",
      key: "isqctools",
      width: 100,
      render: (isQCTool) => {
        return (isQCTool ? 
          <CheckSquareTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px' }}/> :
          <CloseSquareTwoTone twoToneColor="#f5222d" style={{ fontSize: '20px' }}/>);
      },
    },
    {
      title: "Suspended",
      dataIndex: "issuspend",
      key: "issuspend",
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
          {!record.islock && (
            <>
              <EditEquipment dataSource={record} onEdit={fetchData} />
              <DeleteEquipment name={record.equipmentname} equipmentCode={record.equipmentcode} onDelete={fetchData} />
            </>
          )}
        </Space>
      ),
    },
  ];

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
          loading={loading}
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
