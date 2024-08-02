import { Input, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { getBuilding } from '../API/getData';

const columns = [
    {
        title: "No",
        dataIndex: "key",
        key: "key",
        width: 60,
        fixed: "left",
    },
    {
        title: "BuildingCode",
        dataIndex: "BuildingCode",
        key: "BuildingCode",
        width: 150,
    },
    {
        title: "BuildingName",
        dataIndex: "BuildingName",
        key: "BuildingName",
        width: 150,
    },
    {
        title: "Address",
        dataIndex: "Address",
        key: "Address",
        width: 150,
    },
    {
        title: "Phone",
        dataIndex: "Phone",
        key: "Phone",
        width: 150,
    },
    {
        title: "Fax",
        dataIndex: "Fax",
        key: "Fax",
        width: 150,
    },
    {
        title: "Contact",
        dataIndex: "Contact",
        key: "Contact",
        width: 150,
    },
    {
        title: "ZIPCode",
        dataIndex: "ZIPCode",
        key: "ZIPCode",
        width: 150,
    },
    {
        title: "City",
        dataIndex: "City",
        key: "City",
        width: 150,
    },
    {
        title: "Country",
        dataIndex: "Country",
        key: "Country",
        width: 150,
    },
    {
        title: "Description",
        dataIndex: "Description",
        key: "Description",
        width: 150,
    },
];

const InputModal = ({ setOpenModals, setValues, setIsModalOpen }) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        if (setOpenModals) {
            setOpen(setOpenModals);
        }
    }, [setOpenModals])


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getBuilding();
            setData(response);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = data.filter((item) =>
        Object.values(item).some(
            (val) => val && val.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const rowSelection = {
        type: 'radio',
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRow(selectedRows[0]);
        },
    };

    const handleSubmit = () => {
        setValues(selectedRow);
        setOpen(false);
        setIsModalOpen(true);
    };

    return (
        <>
            <Modal
                title="BUILDING"
                centered
                open={open}
                closable={false}
                onOk={handleSubmit}
                onCancel={() => setOpen(false)}
                width={1000}
                styles={{
                    body: {
                        maxHeight: "70vh",
                        overflow: "auto",
                    },
                }}
            >
                <div className="w-full bg-white p-4 rounded-lg">
                    <div className="w-full flex justify-end pb-4">
                        <Input
                            placeholder="search..."
                            allowClear
                            value={searchText}
                            onChange={handleSearch}
                            style={{ width: 200 }}
                        />
                    </div>
                    <Table
                        loading={loading}
                        rowSelection={{
                            type: 'radio',
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={filteredData}
                        pagination={{
                            showSizeChanger: true,
                            defaultPageSize: 10,
                        }}
                        scroll={{
                            x: 1000,
                        }}
                    />
                </div>
            </Modal>
        </>
    );
}

export default InputModal;
