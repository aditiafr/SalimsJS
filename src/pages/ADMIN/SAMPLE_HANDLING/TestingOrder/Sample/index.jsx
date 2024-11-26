import { Table, Tabs } from 'antd'
import React from 'react'
import TestingOrderContainerInformation from './ContainerInformation'
import TestingOrderQualityReference from './QualityReference'
import TestingOrderParameter from './Parameter'
import { toRupiah } from '../../../../../components/Dashboard/Global/General'

const TestingOrderSample = ({ dataSource }) => {

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                expandable={{
                    expandedRowRender
                }}
                scroll={{
                    x: 2000
                }}
            />
        </>
    )
}

export default TestingOrderSample


const expandedRowRender = (record) => {

    const items = [
        {
            key: '1',
            label: 'Container Information',
            children: <TestingOrderContainerInformation dataSource={record.testing_order_ci} />,
        },
        {
            key: '2',
            label: 'Quality Reference',
            children: <TestingOrderQualityReference dataSource={record.testing_order_qr} />,
        },
        {
            key: '3',
            label: 'Parameter',
            children: <TestingOrderParameter dataSource={record.testing_order_par} />,
        },
    ];

    return (
        <Tabs defaultActiveKey="1" items={items} />

    )
};


const columns = [
    // {
    //     title: "Sample No",
    //     dataIndex: "sampleno",
    //     key: "sampleno",
    // },
    {
        title: "Sample Name",
        dataIndex: "samplename",
        key: "samplename",
    },
    // {
    //     title: "Product Category Code",
    //     dataIndex: "prodcatcode",
    //     key: "prodcatcode",
    // },
    {
        title: "Product Name",
        dataIndex: "prodcatname",
        key: "prodcatname",
    },
    {
        title: "Service Type",
        dataIndex: "servicetype",
        key: "servicetype",
    },
    {
        title: "Sample Date",
        dataIndex: "sampledate",
        key: "sampledate",
    },
    // {
    //     title: "Subzone Code",
    //     dataIndex: "subzonacode",
    //     key: "subzonacode",
    // },
    {
        title: "Subzona Name",
        dataIndex: "subzonaname",
        key: "subzonaname",
    },
    {
        title: "EXT Sample No",
        dataIndex: "extsampleno",
        key: "extsampleno",
    },
    // {
    //     title: "Is Acceleration",
    //     dataIndex: "isacceleration",
    //     key: "isacceleration",
    // },
    {
        title: "Subtotal Price",
        dataIndex: "subtotalprice",
        key: "subtotalprice",
        render: (value) => <p>{toRupiah(value)}</p>
    },
    // {
    //     title: "Quality Reference Status",
    //     dataIndex: "qrstatus",
    //     key: "qrstatus",
    // },
    // {
    //     title: "Parameter Status",
    //     dataIndex: "parstatus",
    //     key: "parstatus",
    // },
    // {
    //     title: "Con Status",
    //     dataIndex: "constatus",
    //     key: "constatus",
    // },
]