import { Table } from 'antd';
import React from 'react'

const FormulaDetail = ({ dataSource }) => {
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

export default FormulaDetail

const columns = [
    {
        title: "Parameter",
        dataIndex: "parameter",
        key: "parameter",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Sim Value",
        dataIndex: "simvalue",
        key: "simvalue",
    }
]