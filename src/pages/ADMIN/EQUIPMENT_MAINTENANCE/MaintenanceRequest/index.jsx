import React from 'react'
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle'
import { Link } from 'react-router-dom'
import { Button, Table, Input } from 'antd'
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: 'MR Number',
    dataIndex: 'MRNumber',
    key: 'MRNumber',
    width: 100,
  },
  {
    title: 'MR Date',
    dataIndex: 'MRDate',
    key: 'MRDate',
    width: 100,
  },
  {
    title: 'Equipment Code',
    dataIndex: 'EquipmentCode',
    key: 'EquipmentCode',
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
    MRNumber: 'MR001',
    MRDate: '2021-01-01',
    EquipmentCode: 'EC001',
    Status: 'Active',
    Description: 'Maintenance Request 001',
  },
  {
    key: '2',
    MRNumber: 'MR002',
    MRDate: '2021-02-01',
    EquipmentCode: 'EC002',
    Status: 'Inactive',
    Description: 'Maintenance Request 002',
  },
]

const MaintenanceRequest = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="MAINTENANCE REQUEST" subtitle="All data maintenance request" />
        <div>
          <Link to="/transaction/maintenance-request/form">
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

export default MaintenanceRequest