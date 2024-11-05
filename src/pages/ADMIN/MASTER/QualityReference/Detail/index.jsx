import { Table } from 'antd';
import React from 'react'

const DetailQualityReference = ({dataSource}) => {

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

export default DetailQualityReference


const columns = [
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
        title: "Reference Value 1",
        dataIndex: "refvalue1",
        key: "refvalue1",
    },
    {
        title: "Reference Value 2",
        dataIndex: "refvalue2",
        key: "refvalue2",
    },
    {
        title: "Reference Value 3",
        dataIndex: "refvalue3",
        key: "refvalue3",
    },
    {
        title: "Reference Value 4",
        dataIndex: "refvalue4",
        key: "refvalue4",
    },
    {
        title: "Reference Value 5",
        dataIndex: "refvalue5",
        key: "refvalue5",
    },
]
