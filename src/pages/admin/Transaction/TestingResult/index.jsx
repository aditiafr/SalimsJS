import React from 'react'
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle'
import { Link } from 'react-router-dom'
import { Button, Table, Input } from 'antd'
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: 'Result Number',
    dataIndex: 'ResultNumber',
    key: 'ResultNumber',
    width: 100,
  },
  {
    title: 'Result Date',
    dataIndex: 'ResultDate',
    key: 'ResultDate',
    width: 100,
  },
  {
    title: 'Req Number',
    dataIndex: 'ReqNumber',
    key: 'ReqNumber',
    width: 100,
  },
  {
    title: 'Authorized Code',
    dataIndex: 'AuthorizedCode',
    key: 'AuthorizedCode',
    width: 100,
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
    width: 200,
    render: (text) => (text ?? "N/A"),
  },
]

const data = [
  {
    key: '1',
    ResultNumber: 'R001',
    ResultDate: '2021-01-01',
    ReqNumber: 'REQ001',
    AuthorizedCode: 'AC001',
    Description: 'Testing Result 001',
  },
  {
    key: '2',
    ResultNumber: 'R002',
    ResultDate: '2021-02-01',
    ReqNumber: 'REQ002',  
    AuthorizedCode: 'AC002',
    Description: 'Testing Result 002',
  },
]

const TestingResult = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TESTING RESULT" subtitle="All data testing result" />
        <div>
          <Link to="/transaction/testing-result/form">
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

export default TestingResult