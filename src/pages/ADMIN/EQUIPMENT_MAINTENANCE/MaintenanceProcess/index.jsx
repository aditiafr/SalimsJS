import React from 'react'
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle'
import { Link } from 'react-router-dom'
import { Button, Table, Input } from 'antd'
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: 'MP Number',
    dataIndex: 'MPNumber',
    key: 'MPNumber',
    width: 100,
  },
  {
    title: 'MP Date',
    dataIndex: 'MPDate',
    key: 'MPDate',
    width: 100,
  },
  {
    title: 'Equipment Code',
    dataIndex: 'EquipmentCode',
    key: 'EquipmentCode',
    width: 100,
  },
  {
    title: 'MR Number',
    dataIndex: 'MRNumber',
    key: 'MRNumber',
    width: 100,
  },
  {
    title: 'Status',
    dataIndex: 'Status',
    key: 'Status',
    width: 100,
  },
  {
    title: 'Description',
    dataIndex: 'Description',
    key: 'Description',
    width: 200,
    render: (text) => (text ?? 'N/A'),
  },
]

const data = [
  {
    key: '1',
    MPNumber: 'MP001',
    MPDate: '2021-01-01',
    EquipmentCode: 'EC001',
    MRNumber: 'MR001',
    Status: 'Active',
    Description: 'Maintenance Process 001',
  },
  {
    key: '2',
    MPNumber: 'MP002',
    MPDate: '2021-02-01',
    EquipmentCode: 'EC002',
    MRNumber: 'MR002',
    Status: 'Inactive',
    Description: 'Maintenance Process 002',
  },
]

const MaintenanceProcess = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="MAINTENANCE PROCESS" subtitle="All data maintenance process" />
        <div>
          <Link to="/transaction/maintenance-process/form">
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
  )
}

export default MaintenanceProcess