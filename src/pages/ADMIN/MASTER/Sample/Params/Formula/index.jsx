import { Table } from 'antd'
import React from 'react'

const SampleFormula = ({ dataSource }) => {
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

export default SampleFormula

const columns = [
  {
    title: "No",
    dataIndex: "detailno",
    key: "detailno",
  },
  {
    title: "formulaname",
    dataIndex: "Formula Name",
    key: "formulaname",
  },
  {
    title: "Formula Version",
    dataIndex: "formulaversion",
    key: "formulaversion",
  },
  {
    title: "Lower Specification",
    dataIndex: "lspec",
    key: "lspec",
  },
  {
    title: "Upper Specification",
    dataIndex: "uspec",
    key: "uspec",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
]
