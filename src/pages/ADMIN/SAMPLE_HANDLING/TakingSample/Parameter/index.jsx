import { Table } from 'antd'
import React from 'react'

const TakingSampleParameter = ({ dataSource }) => {
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

export default TakingSampleParameter


const columns = [
    {
        title: "No",
        dataIndex: "detailno",
        key: "detailno",
    },
    {
        title: "Parameter Code",
        dataIndex: "parcode",
        key: "parcode",
    },
    {
        title: "Is Calibration",
        dataIndex: "iscalibration",
        key: "iscalibration",
    },
    {
        title: "Insitu Result",
        dataIndex: "insituresult",
        key: "insituresult",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
]