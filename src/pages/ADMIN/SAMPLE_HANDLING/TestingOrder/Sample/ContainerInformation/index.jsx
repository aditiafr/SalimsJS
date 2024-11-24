import { Table } from 'antd'
import React from 'react'

const TestingOrderContainerInformation = ({dataSource}) => {
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

export default TestingOrderContainerInformation

const columns = [
    {
        title: "Detail No",
        dataIndex: "detailno",
        key: "detailno",
    },
    // {
    //     title: "Equipment Code",
    //     dataIndex: "equipmentcode",
    //     key: "equipmentcode",
    // },
    {
        title: "Equipment  Name",
        dataIndex: "equipmentname",
        key: "equipmentname",
    },
    {
        title: "Con QTY",
        dataIndex: "conqty",
        key: "conqty",
    },
    {
        title: "Con UOM",
        dataIndex: "conuom",
        key: "conuom",
    },
    {
        title: "Volume QTY",
        dataIndex: "volqty",
        key: "volqty",
    },
    {
        title: "Volume UOM",
        dataIndex: "voluom",
        key: "voluom",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
]