import { Button, Popconfirm, Table, Tabs } from 'antd'
import React from 'react'
import SampleFormula from './Formula'
import SampleProduct from './Product'
import { Link } from 'react-router-dom'
import { DeleteFilled, EditFilled } from '@ant-design/icons'

const SampleParams = ({ dataSource, onDelete }) => {

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
    {
      title: 'Actions',
      key: 'Actions',
      fixed: 'right',
      width: 100,
      render: (_, record) => {
        return (
          <div>
            <Link to={`parameter/${record.parcode}`}>
              <Button icon={<EditFilled />} type="text" />
            </Link>
            <Popconfirm
              title="Delete the data"
              description="Are you sure to delete this data?"
              onConfirm={() => onDelete(record.parcode)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                icon={<DeleteFilled />}
                type="text"
              />
            </Popconfirm>
          </div>
        )
      }
    },
  ];


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