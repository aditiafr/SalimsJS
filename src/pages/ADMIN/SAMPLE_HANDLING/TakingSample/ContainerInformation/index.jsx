import { Table } from 'antd'
import React from 'react'

const TakingSampleCI = ({ dataSource }) => {
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

export default TakingSampleCI


const columns = [
    {
        title: "No",
        dataIndex: "detailno",
        key: "detailno",
    },
    {
        title: "Equipment Name",
        dataIndex: "equipmentname",
        key: "equipmentname",
    },
    {
        title: "Equipment Code",
        dataIndex: "equipmentcode",
        key: "equipmentcode",
    },
    {
        title: "Con Quantity",
        dataIndex: "conqty",
        key: "conqty",
    },
    {
        title: "Con UOM",
        dataIndex: "conuom",
        key: "conuom",
    },
    {
        title: "Volume Quantity",
        dataIndex: "volqty",
        key: "volqty",
    },
    {
        title: "Volumne UOM",
        dataIndex: "voluom",
        key: "voluom",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
]