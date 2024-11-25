import { Table } from 'antd';
import React from 'react'

const PriceListDetail = ({ dataSource }) => {
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

export default PriceListDetail

const columns = [
    {
        title: "Product Code",
        dataIndex: "prodcode",
        key: "prodcode",
    },
    {
        title: "Product Name",
        dataIndex: "prodname",
        key: "prodname",
    },
    {
        title: "Default Price",
        dataIndex: "defprice",
        key: "defprice",
    },
    {
        title: "DiscP",
        dataIndex: "discp",
        key: "discp",
    },
    {
        title: "DiscM",
        dataIndex: "discm",
        key: "discm",
    },
    {
        title: "Price List",
        dataIndex: "pricelist",
        key: "pricelist",
    },
]