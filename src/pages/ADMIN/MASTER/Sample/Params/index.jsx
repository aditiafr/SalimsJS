import { Table, Tabs } from 'antd'
import React from 'react'
import SampleFormula from './Formula'
import SampleProduct from './Product'

const SampleParams = ({ dataSource }) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        expandable={{
          expandedRowRender
        }}
        scroll={{
          x: 2000
        }}
      />
    </>
  )
}

export default SampleParams

const columns = [
  {
    title: "Parameter Code",
    dataIndex: "parcode",
    key: "parcode",
    fixed: "left",
  },
  {
    title: "Parameter Name",
    dataIndex: "parname",
    key: "parname",
  },
  {
    title: "Formula Name",
    dataIndex: "formulaname",
    key: "formulaname",
  },
  {
    title: "Request QTY",
    dataIndex: "req_qty",
    key: "req_qty",
  },
  {
    title: "Lower Limit",
    dataIndex: "l_limit",
    key: "l_limit",
  },
  {
    title: "Upper Limit",
    dataIndex: "u_limit",
    key: "u_limit",
  },
  {
    title: "Lower Specification",
    dataIndex: "l_spec",
    key: "l_spec",
  },
  {
    title: "Upper Specification",
    dataIndex: "u_spec",
    key: "u_spec",
  },
  {
    title: "Frequency",
    dataIndex: "frequency",
    key: "frequency",
  },
  {
    title: "Specification",
    dataIndex: "specification",
    key: "specification",
  },
  // {
  //   title: "islock",
  //   dataIndex: "islock",
  //   key: "islock",
  // },
];


const expandedRowRender = (record) => {

  const items = [
    {
      key: '1',
      label: 'Formula',
      children: <SampleFormula dataSource={record.sample_fo} />,
    },
    {
      key: '2',
      label: 'Product',
      children: <SampleProduct dataSource={record.sample_pr} />,
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} />

  )
};