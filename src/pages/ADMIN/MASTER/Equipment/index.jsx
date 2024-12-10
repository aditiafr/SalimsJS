import { Button, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import EditEquipment from "./edit";
import DeleteEquipment from "./delete";
import { CheckSquareTwoTone, CloseSquareTwoTone } from "@ant-design/icons";
import { getEquipment } from "../../../../Api/Master/getData";
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";


const Equipment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    try {
      const response = await getEquipment();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (val) => val && val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );


  const columns = [
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Equipment Code",
      dataIndex: "equipmentcode",
      key: "equipmentcode",
    },
    {
      title: "Equipment Name",
      dataIndex: "equipmentname",
      key: "equipmentname",
    },
    {
      title: "Equipment Type Code",
      dataIndex: "equipmenttypecode",
      key: "equipmenttypecode",
    },
    {
      title: "Equipment Type Name",
      dataIndex: "equipmenttypename",
      key: "equipmenttypename",
    },
    {
      title: "Vendor Code",
      dataIndex: "vendorcode",
      key: "vendorcode",
    },
    {
      title: "Vendor Name",
      dataIndex: "vendorname",
      key: "vendorname",
    },
    {
      title: "Manufacture Code",
      dataIndex: "manufacturecode",
      key: "manufacturecode",
    },
    {
      title: "Manufacture Name",
      dataIndex: "manufacturename",
      key: "manufacturename",
    },
    {
      title: "Serial Number",
      dataIndex: "serialnumber",
      key: "serialnumber",
    },
    {
      title: "Date Calibration",
      dataIndex: "datecalibration",
      key: "datecalibration",
    },
    {
      title: "Due Date Calibration",
      dataIndex: "duedatecalibration",
      key: "duedatecalibration",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
    },
    // {
    //   title: "tempinfo",
    //   dataIndex: "tempinfo",
    //   key: "tempinfo",
    // },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Suspend",
      dataIndex: "issuspend",
      key: "issuspend",
      render: (isQCTool) => {
        return (isQCTool ?
          <CheckSquareTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px' }} /> :
          <CloseSquareTwoTone twoToneColor="#f5222d" style={{ fontSize: '20px' }} />);
      },
    },
    {
      title: "QC Tools",
      dataIndex: "isqctools",
      key: "isqctools",
      render: (suspended) => (
        <Tag color={suspended ? 'red' : 'green'}> {suspended ? 'Yes' : 'No'} </Tag>
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

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="EQUIPMENT"
          subtitle="All data equipment"
        />
        <div>
          <Link to="form">
            <Button type="primary">+ Add New</Button>
          </Link>
        </div>
      </div>
      <div className="w-full bg-white p-4 rounded-lg">
        <div className="w-full flex justify-end pb-4">
          <SearchInput value={searchText} onChange={handleSearch} />
        </div>
        <Table
          loading={loading}
          rowSelection
          columns={columns}
          dataSource={filteredData}
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

export default Equipment;
