import { Table } from 'antd'
import React from 'react'

const TestingOrderQualityReference = ({ dataSource }) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{
          x: 1000
      }}
      />
    </>
  )
}

export default TestingOrderQualityReference

const columns = [
  {
    title: "Quality Reference Id",
    dataIndex: "qrid",
    key: "qrid",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
]