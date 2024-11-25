import React, { useEffect, useState } from 'react'
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle'
import { Link } from 'react-router-dom'
import { Button, Space, Table } from 'antd'
import SearchInput from "../../../../components/Dashboard/Global/Table/SearchInput";
import { getMaintenanceRequest } from "../../../../Api/Maintenance/getData";
import EditMaintenanceRequest from "./edit";
import DeleteMaintenanceRequest from "./delete";

const MaintenanceRequest = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getMaintenanceRequest();
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
      title: 'Branch',
      dataIndex: 'branchcode',
      key: 'branchcode',
      width: 100,
    },
    {
      title: 'MR Number',
      dataIndex: 'mrnumber',
      key: 'mrnumber',
      width: 100,
    },
    {
      title: 'MR Date',
      dataIndex: 'mrdate',
      key: 'mrdate',
      width: 100,
    },
    {
      title: 'Equipment Code',
      dataIndex: 'equipmentcode',
      key: 'equipmentcode',
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
          <EditMaintenanceRequest dataSource={record} onEdit={fetchData} />
        </Space>
      ),
    },
  ]

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="MAINTENANCE REQUEST" subtitle="All data maintenance request" />
        <div>
          <Link to="/equipment_maintenance/maintenance_request/form">
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

export default MaintenanceRequest