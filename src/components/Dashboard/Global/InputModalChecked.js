import { Button, Form, Input, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import HeaderTitle from './HeaderTitle';
import SearchInput from './Table/SearchInput';

const InputModalChecked = ({ title, label, name, dataSource, loading, columns, onData, onOpenModal, onDetail, onEdit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRowsData, setSelectedRowsData] = useState([]);

    useEffect(() => {
        if (onEdit) {
            setSelectedRowKeys([onEdit.key]);
        }
    }, [onEdit]);


    const showModal = () => {
        setIsModalOpen(true);
        if (!onEdit) {
            onOpenModal(true);
        }
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
        type: "checked",
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRowsData(selectedRows);
        },
    };

    const handleSelectData = () => {
        console.log("Select Data", selectedRowsData);
        onData(selectedRowsData);
        setIsModalOpen(false);
    }

    return (
        <div>
            <Form.Item
                label={!onDetail ? label : ''}
                name={name}
                style={
                    onDetail && { margin: 0, }
                }
                rules={[
                    {
                        required: true,
                        message: `Please input your ${label}!`,
                    },
                ]}
            >
                <Input onClick={showModal} readOnly placeholder={`${label}`} />
            </Form.Item>

            <Modal
                centered
                title={<HeaderTitle title={title} subtitle="" />}
                open={isModalOpen}
                closable={false}
                width={`80%`}
                style={{
                    body: {
                        maxHeight: '70vh',
                        overflow: 'auto',
                    },
                }}
                footer={
                    <>
                        <Button type="primary" onClick={handleSelectData}>Submit</Button>
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
                    scroll={
                        columns.length >= 10 && { x: 3000 }
                    }
                />
            </Modal>
        </div>
    );
};

export default InputModalChecked;
