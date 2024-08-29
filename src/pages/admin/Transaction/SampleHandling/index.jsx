import React from 'react'
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle'
import { Link } from 'react-router-dom'
import { Button, Input, Table } from "antd";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: 'SS Number',
    dataIndex: 'SSNumber',
    key: 'SSNumber',
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
    dataIndex: 'SSDate',
    key: 'SSDate',
    width: 100,
  },
  {
    title: 'SR Number',
    dataIndex: 'SRNumber',
    key: 'SRNumber',
    width: 100,
  },
  {
    title: 'Description',
    dataIndex: 'Description',
    key: 'Description',
    width: 100,
  },
]

const data = [
  {
    key: '1',
    SSNumber: 'SS001',
    Periode: '2021-01',
    SSDate: '2021-01-01',
    SRNumber: 'SR001',
    Description: 'Sample Handling 001',
  },
  {
    key: '2',
    SSNumber: 'SS002',
    Periode: '2021-02',
    SSDate: '2021-02-01',
    SRNumber: 'SR002',
    Description: 'Sample Handling 002',
  },
  {
    key: '3',
    SSNumber: 'SS003',
    Periode: '2021-03',
    SSDate: '2021-03-01',
    SRNumber: 'SR003',
    Description: 'Sample Handling 003',
  },
]

const SampleHandling = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="SAMPLE HANDLING" subtitle="All data sample handling" />
        <div>
          <Link to="/transaction/sample-handling/form">
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

export default SampleHandling