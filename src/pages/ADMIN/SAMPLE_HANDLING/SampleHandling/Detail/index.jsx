import { Table } from 'antd'
import React from 'react'

const SampleHandlingDetail = ({ dataSource }) => {
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

export default SampleHandlingDetail


const columns = [
    {
        title: "Sample No",
        dataIndex: "sampleno",
        key: "sampleno",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Is Split",
        dataIndex: "issplit",
        key: "issplit",
    },
    {
        title: "Test Id",
        dataIndex: "testid",
        key: "testid",
    },
    {
        title: "Parameter Code",
        dataIndex: "parcode",
        key: "parcode",
    },
    {
        title: "Unit Code",
        dataIndex: "unitcode",
        key: "unitcode",
    },
    {
        title: "Quantity",
        dataIndex: "qty",
        key: "qty",
    },
]