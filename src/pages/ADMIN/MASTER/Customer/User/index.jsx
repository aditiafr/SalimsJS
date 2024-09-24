import { Table } from 'antd';
import React from 'react'

const CustomerUser = ({ dataSource }) => {
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

export default CustomerUser

const columns = [
    {
        title: "Username",
        dataIndex: "username",
        key: "username",
    },
    {
        title: "Phone Number",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "Position",
        dataIndex: "position",
        key: "position",
    },
]