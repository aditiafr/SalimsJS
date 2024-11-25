import { Table } from 'antd';
import React from 'react'

const LabourPar = ({ dataSource }) => {
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

export default LabourPar

const columns = [
    {
        title: "Branch Code",
        dataIndex: "branchcode",
        key: "branchcode",
    },
    {
        title: "Labour Code",
        dataIndex: "labourcode",
        key: "labourcode",
    },
    {
        title: "Parameter Code",
        dataIndex: "parcode",
        key: "parcode",
    },
    {
        title: "Parameter Name",
        dataIndex: "parname",
        key: "parname",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
]