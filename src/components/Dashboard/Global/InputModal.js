import { Button, Form, Input, Modal, Table } from 'antd';
import React, { useState } from 'react';
import HeaderTitle from './HeaderTitle';
import SearchInput from './Table/SearchInput';

const InputModal = ({ title, label, name, dataSource, loading, columns, onData, onOpenModal }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const showModal = () => {
        setIsModalOpen(true);
        onOpenModal(true);
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = dataSource.filter((item) =>
        Object.values(item).some((val) =>
            val && val.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const rowSelection = {
        type: "radio",
        selectedRowKeys, // Bind selected row keys to rowSelection
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys); // Update selected row keys state
            onData(selectedRows[0]);
            setIsModalOpen(false);
        },
    };

    // Handle row click event
    const handleRowClick = (record, rowIndex) => {
        setSelectedRowKeys([record.key]); // Update selected row keys
        onData(record);
        setIsModalOpen(false);
    };

    return (
        <div>
            <Form.Item
                label={label}
                name={name}
                rules={[
                    {
                        required: true,
                        message: `Please input your ${label}!`,
                    },
                ]}
            >
                <Input onClick={showModal} readOnly />
            </Form.Item>

            <Modal
                centered
                title={<HeaderTitle title={title} subtitle="" />}
                open={isModalOpen}
                closable={false}
                width={1000}
                style={{
                    body: {
                        maxHeight: '70vh',
                        overflow: 'auto',
                    },
                }}
                footer={
                    <>
                        {/* <Button onClick={handleSelectData}>Submit</Button> */}
                        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                    </>
                }
            >
                <div className="flex justify-end mb-2">
                    <SearchInput value={searchText} onChange={handleSearch} />
                </div>
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={filteredData}
                    rowSelection={rowSelection}
                    onRow={(record, rowIndex) => ({
                        onClick: () => {
                            handleRowClick(record, rowIndex);
                        },
                    })}
                    scroll={{ x: 2000 }}
                />
            </Modal>
        </div>
    );
};

export default InputModal;
