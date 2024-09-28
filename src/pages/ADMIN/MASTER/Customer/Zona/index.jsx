import { Table } from 'antd';
import React from 'react'

const CustomerZona = ({ dataSource }) => {
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

export default CustomerZona

const columns = [
    {
        title: "zonaname",
        dataIndex: "zonaname",
        key: "zonaname",
    },
    {
        title: "SubZonaName",
        dataIndex: "subzonaname",
        key: "subzonaname",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
]