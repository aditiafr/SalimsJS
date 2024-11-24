import { Table } from 'antd'
import React from 'react'
import { toRupiah } from '../../../../../components/Dashboard/Global/General';

const TestingOrderAcCost = ({ dataSource }) => {
  console.log(dataSource);

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

export default TestingOrderAcCost


const columns = [
  // {
  //   title: "Expense Code",
  //   dataIndex: "expensecode",
  //   key: "expensecode",
  // },
  {
    title: "Expense Name",
    dataIndex: "expensename",
    key: "expensename",
  },
  {
    title: "Expense Value",
    dataIndex: "expensevalue",
    key: "expensevalue",
    render: (value) => <p>{toRupiah(value)}</p>
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
]