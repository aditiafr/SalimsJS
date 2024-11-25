import React, { useEffect, useState } from 'react'
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle'
import { Link } from 'react-router-dom'
import { Button, Table, Space, Tag } from 'antd'
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";
import EditMaintenanceProcess from "./edit";
import DeleteMaintenanceProcess from "./delete";
import { getMaintenanceProcess } from "../../../../Api/Maintenance/getData";
import DetailFormula from "./detail";

const MaintenanceProcess = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getMaintenanceProcess();
      setData(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
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
      title: 'Branch Code',
      dataIndex: 'branchcode',
      key: 'branchcode',
      width: 100,
    },
    {
      title: 'MP Number',
      dataIndex: 'mpnumber',
      key: 'mpnumber',
      width: 100,
    },
    {
      title: 'MP Date',
      dataIndex: 'mpdate',
      key: 'mpdate',
      width: 100,
    },
    {
      title: 'MR Number',
      dataIndex: 'mrnumber',
      key: 'mrnumber',
      width: 100,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      render: (text) => (text ?? 'N/A'),
    },
    {
      title: "Action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <EditMaintenanceProcess dataSource={record} onEdit={fetchData} />
        </Space>
      ),
    },
  ]

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="MAINTENANCE PROCESS" subtitle="All data maintenance process" />
        <div>
          <Link to="/equipment_maintenance/maintenance_process/form">
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
            x: 1000,
          }}
        />
      </div>
    </>
  )
}

export default MaintenanceProcess