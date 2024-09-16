import { Button, Form, Input, Modal, Table } from 'antd';
import React, { useState } from 'react';
import HeaderTitle from '../../../../components/Dashboard/Global/HeaderTitle';
import SearchInput from '../../../../components/Dashboard/Global/Table/SearchInput';

const InputModal = ({ label, name, dataSource, loading, columns, onData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = dataSource.filter((item) =>
        Object.values(item).some((val) =>
            val && val.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const handleSelectData = () => {
        onData(selectedRows[0]);
        setIsModalOpen(false);
    };

    const rowSelection = {
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRows(selectedRows);
        },
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
                <Input onClick={showModal} />
            </Form.Item>

            <Modal
                centered
                title={<HeaderTitle title="WAREHOUSE" subtitle="" />}
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
                        <Button onClick={handleSelectData}>Submit</Button>
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
                    pagination={{
                        showSizeChanger: true,
                        defaultPageSize: 10,
                    }}
                    scroll={{
                        x: 2000,
                    }}
                />
            </Modal>
        </div>
    );
};

export default InputModal;
