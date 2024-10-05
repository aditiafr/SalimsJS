import { Table } from 'antd'
import React from 'react'

const SampleProduct = ({ dataSource }) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </>
  )
}

export default SampleProduct

const columns = [
  {
    title: "Request Product",
    dataIndex: "req_prod_code",
    key: "req_prod_code",
  },
  {
    title: "Product QTY",
    dataIndex: "prod_qty",
    key: "prod_qty",
  },
  {
    title: "Version",
    dataIndex: "version",
    key: "version",
  },
]
