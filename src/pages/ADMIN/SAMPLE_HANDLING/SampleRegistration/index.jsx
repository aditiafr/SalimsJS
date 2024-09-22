import React from 'react'
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle'
import { Link } from 'react-router-dom'
import { Button, Table, Input } from 'antd'
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: 'SR Number',
    dataIndex: 'SRNumber',
    key: 'SRNumber',
    width: 100,
  },
  {
    title: 'Periode',
    dataIndex: 'Periode',
    key: 'Periode',
    width: 100,
  },
  {
    title: 'Date',
    dataIndex: 'SRDate',
    key: 'SRDate',
    width: 100,
  },
  {
    title: 'Customer',
    dataIndex: 'Customer',
    key: 'Customer',
    width: 100,
  },
  {
    title: 'Sample Sender',
    dataIndex: 'SampleSender',
    key: 'SampleSender',
    width: 100,
  },
  {
    title: 'Building Code',
    dataIndex: 'BuildingCode',
    key: 'BuildingCode',
    width: 100,
  },
  {
    title: 'Location Code',
    dataIndex: 'LocationCode',
    key: 'LocationCode',
    width: 100,
  }
] 

const data = [
  {
    key: '1',
    SRNumber: 'SR001',
    Periode: '2021-01',
    SRDate: '2021-01-01',
    Customer: 'PT. ABC',
    SampleSender: 'John Doe',
    BuildingCode: 'BC001',
    LocationCode: 'LC001'
  },
  {
    key: '2',
    SRNumber: 'SR002',
    Periode: '2021-02',
    SRDate: '2021-02-01',
    Customer: 'PT. XYZ',
    SampleSender: 'Jane Doe',
    BuildingCode: 'BC002',
    LocationCode: 'LC002'
  }
]

const SampleRegistration = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="SAMPLE REGISTRATION" subtitle="All data sample registration" />
        <div>
          <Link to="/transaction/sample-registration/form">
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

export default SampleRegistration