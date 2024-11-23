import { Table } from 'antd'
import React from 'react'
import { toRupiah } from '../../../../../../components/Dashboard/Global/General'

const TestingOrderParameter = ({dataSource}) => {
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

export default TestingOrderParameter

const columns = [
    // {
    //     title: "Parameter Code",
    //     dataIndex: "parcode",
    //     key: "parcode",
    // },
    // {
    //     title: "Method Id",
    //     dataIndex: "methodid",
    //     key: "methodid",
    // },
    {
        title: "preservation",
        dataIndex: "preservation",
        key: "preservation",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (value) => <p>{toRupiah(value)}</p>
    },
]