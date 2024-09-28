import React, { useEffect, useState } from 'react';
import { Form, Input, Popconfirm, Table, Typography, DatePicker, Button, message } from 'antd';

import { CloseOutlined, DeleteOutlined, EditFilled, SaveFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import InputModal from '../../../../../components/Dashboard/Global/InputModal';
import { getSubZona, getWarehouse, getZona } from '../../../../../Api/Master/getData';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    onDataZona,
    onDataSubZona,
    ...restProps
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const [dataZona, setDataZona] = useState([]);
    const [selectZona, setSelectZona] = useState("");
    const [openZona, setOpenZona] = useState(null);

    const [dataSubZona, setDataSubZona] = useState([]);
    const [selectSubZona, setSelectSubZona] = useState("");
    const [openSubZona, setOpenSubZona] = useState(null);

    useEffect(() => {
        const fetchZona = async () => {
            try {
                setIsLoading(true);
                const res = await getZona();
                setDataZona(res);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }
        if (openZona) {
            fetchZona();
            setOpenZona(false);
        }
    }, [openZona]);

    useEffect(() => {
        if (selectZona) {
            onDataZona(selectZona);
        }
    }, [onDataZona, selectZona]);

    useEffect(() => {
        const fetchSubZona = async () => {
            try {
                const res = await getSubZona();
                setDataSubZona(res);
            } catch (error) {
                console.log(error);
            }
        }
        if (openSubZona) {
            fetchSubZona();
            setOpenSubZona(false);
        }
    }, [openSubZona])

    useEffect(() => {
        if (selectSubZona) {
            onDataSubZona(selectSubZona);
        }
    }, [onDataSubZona, selectSubZona]);

    return (
        <td {...restProps}>
            {editing ? (
                <div>

                    {dataIndex === 'description' ? (
                        <Form.Item
                            name={dataIndex}
                            style={{
                                margin: 0,
                            }}
                        >
                            <TextArea rows={4} placeholder={title} />
                        </Form.Item>

                    ) :

                        // <Form.Item
                        //     name={dataIndex}
                        //     style={{
                        //         margin: 0,
                        //     }}
                        //     rules={[
                        //         {
                        //             required: true,
                        //             message: `Please Input ${title}!`,
                        //         },
                        //     ]}
                        // >
                        dataIndex === "zonaname" && (
                            <InputModal
                                title="ZONA"
                                label="Zona Name"
                                name={dataIndex}
                                dataSource={dataZona}
                                loading={isLoading}
                                columns={columnsZona}
                                onData={(values) => setSelectZona(values)}
                                onOpenModal={(values) => setOpenZona(values)}
                                onDetail={true}
                            />
                        )}
                    {dataIndex === "subzonaname" && (
                        <InputModal
                            title="SUBZONA"
                            label="SubZona Name"
                            name="subzonaname"
                            dataSource={dataSubZona}
                            loading={isLoading}
                            columns={columnsSubZona}
                            onData={(values) => setSelectSubZona(values)}
                            onOpenModal={(values) => setOpenSubZona(values)}
                            onDetail={true}
                        />
                    )}
                    {/* <Input placeholder={title} maxLength={50} /> */}
                    {/* </Form.Item> */}


                </div>
            ) : (
                children
            )
            }
        </td >
    );
};


const FormCustomerZona = ({ onSaveData, onEdit, onApproval }) => {

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const [editingKey, setEditingKey] = useState('');
    // const [loading, setLoading] = useState(false);
    // const [isDisable, setIsDisable] = useState(true);

    const [dataZona, setDataZona] = useState(null);
    const [dataSubZona, setDataSubZona] = useState(null);

    useEffect(() => {
        if (form && dataZona) {
            form.setFieldsValue({ zonaname: dataZona.zonaname });
        }
    }, [dataZona, form])

    useEffect(() => {
        if (form && dataSubZona) {
            form.setFieldsValue({ subzonaname: dataSubZona.subzonaname });
        }
    }, [dataSubZona, form]);

    useEffect(() => {
        if (onEdit) {
            const dataEdit = onEdit.map((row, index) => ({ ...row, key: index + 1 })).reverse()
            setData(dataEdit);
            setCount(dataEdit.length === 0 ? 0 : dataEdit.map((item) => item.key)[0]);
            onSaveData(dataEdit);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onEdit]);


    // useEffect(() => {
    //     if (onEdit || onApproval) {
    //         const fetchData = async () => {
    //             try {
    //                 const response = await getWODocumentTrasaction();
    //                 const filter = response.filter((item) =>
    //                     item.FacilityCode === FacilityCode &&
    //                     item.WONumber === WONumber
    //                 ).map((row, index) => ({
    //                     ...row, key: index + 1
    //                 })).reverse()
    //                 setData(filter)
    //                 setCount(filter.length === 0 ? 0 : filter.map((item) => item.key)[0])
    // onSaveData(filter)
    //             } catch (error) {
    //                 setData([]);
    //                 setCount(0);
    // onSaveData([]);
    //                 console.log(error);
    //             }
    //         }

    //         fetchData();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [FacilityCode, WONumber, onEdit]);

    const isEditing = (record) => record.key === editingKey;

    const handleEdit = (record) => {
        // const docExpDate = record.DocExpDate ? dayjs(record.DocExpDate) : null;

        form.setFieldsValue({
            // Description: '',
            ...record,
            // DocExpDate: docExpDate,
        });
        setEditingKey(record.key);
    };

    const handleDelete = (key) => {
        // setIsDisable(false);
        const deletedRow = data.find((row) => row.key === key);
        const deletedNumber = deletedRow.key;
        const deletedkey = deletedRow.key;

        const newData = data.filter((row) => row.key !== key);

        const updatedData = newData.map((row) => {

            if (row.key > deletedNumber && row.key > deletedkey) {
                return { ...row, key: row.key - 1 };
            }
            return row;
        });

        setCount(updatedData.length > 0 ? updatedData[0].key : 0);

        setData(updatedData);
        onSaveData(updatedData);

        // console.log("DataFormTran", updatedData);
    };


    const handleCancel = (record) => {
        if (!record.username) {
            const newData = data.filter((item) => item.key !== record.key);
            setData(newData);
        } else {
            setEditingKey('');
        }
        setEditingKey('');

        // console.log("DataFormTran", data);
    };


    const handleSave = async (record) => {
        // setIsDisable(false);
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => record.key === item.key);
            const duplicateZona = newData.find((item) => record.zonaname === item.zonaname)
            const duplicateSubZona = newData.find((item) => record.subzonaname === item.subzonaname)
            if (duplicateZona) {
                message.error("Duplicate Zona!")
            } else if (duplicateSubZona) {
                message.error("Duplicate SubZona!")
            } else {

                if (index > -1) {
                    const item = newData[index];
                    const ZonaCode = dataZona.zonacode;
                    const SubZonaCode = dataSubZona.subzonacode;
                    newData.splice(index, 1, {
                        ...item,
                        ...row,
                        zonacode: ZonaCode,
                        subzonacode: SubZonaCode,
                    });
                    setData(newData);
                    setEditingKey('');
                    console.log("DataFormTran", newData);
                    onSaveData(newData)
                } else {
                    newData.push(row);
                    setData(newData);
                    setEditingKey('');
                    console.log("DataFormTran", newData);
                    onSaveData(newData)
                }

                const editedRow = data.find((row) => row.key === record.key);
                const lastNumber = editedRow.key;

                setCount(lastNumber);
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };


    const handleAdd = () => {

        const num = count + 1;
        // const code = (count + 1).toString().padStart(3, '0');

        if (editingKey) {
            message.warning("Complete the input form !");
            return; // Stop saving if duplicate found
        }

        const newData = {
            key: num,
            zonaname: '',
            subzonaname: '',
            description: '',
        };
        setData([newData, ...data]);
        handleEdit(newData);

        // console.log("DataFormTran", data);
    };

    // const handleSaveAllData = async () => {
    //     setLoading(true);
    //     setIsDisable(true);
    //     try {
    //         onSaveData(data);
    //         console.log("PostData", data);
    //         message.success("Success add form table data!!");
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     setLoading(false);
    // }

    // const handleCancelAllData = () => {
    //     setData([]);
    //     setCount(0);
    //     onSaveData([]);
    // }

    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            sorter: (a, b) => a.key - b.key,
            width: 80,
        },
        {
            title: 'Zona Name',
            dataIndex: 'zonaname',
            editable: true,
        },
        {
            title: 'SubZona Name',
            dataIndex: 'subzonaname',
            editable: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            editable: true,
        },
    ];

    if (!onApproval) {
        columns.push({
            title: 'Actions',
            dataIndex: 'actions',
            width: 100,
            fixed: "right",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span className="flex items-center justify-around">
                        <Typography.Link onClick={() => handleSave(record)} style={{ fontSize: '18px' }}>
                            <SaveFilled />
                        </Typography.Link>

                        <Typography.Link onClick={() => handleCancel(record)} style={{ fontSize: '18px' }}>
                            <CloseOutlined />
                        </Typography.Link>
                    </span>
                ) : (
                    <span className="flex items-center justify-around">
                        <Typography.Link onClick={() => handleEdit(record)} style={{ fontSize: '18px' }}>
                            <EditFilled />
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <Link>
                                <DeleteOutlined style={{ fontSize: '18px' }} />
                            </Link>
                        </Popconfirm>
                    </span>
                );
            },
        });
    }

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                onDataZona: (values) => setDataZona(values),
                onDataSubZona: (values) => setDataSubZona(values),
            }),
            ...col,
        };
    });

    return (
        <Form form={form} component={false}>
            <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold">
                    ZONA
                </p>
                {!onApproval && (
                    <Button
                        onClick={handleAdd}
                        color="primary"
                        variant="contained"
                        disabled={!!editingKey}
                    >
                        + Add Data
                    </Button>
                )}
            </div>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                // bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={false}
                scroll={{
                    x: 1000
                }}
            />
            {/* {!onApproval && (
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        type="primary"
                        onClick={handleCancelAllData}
                        disabled={!!editingKey || !!isDisable}
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        color="primary"
                        onClick={handleSaveAllData}
                        variant="contained"
                        disabled={!!editingKey || !!isDisable}
                    >
                        <span>Save</span>
                    </Button>

                </div>
            )} */}
        </Form>
    );
};
export default FormCustomerZona;

const columnsZona = [
    {
        title: 'No',
        dataIndex: 'key',
        sorter: (a, b) => a.key - b.key,
        width: 80,
    },
    {
        title: 'Zona Name',
        dataIndex: 'zonaname',
        key: 'zonaName'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: 'ZIP Code',
        dataIndex: 'zipCode',
        key: 'zipCode'
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city'
    },
    {
        title: 'Latitude Longitude',
        dataIndex: 'latLong',
        key: 'latLong'
    },
];

const columnsSubZona = [
    {
        title: 'No',
        dataIndex: 'key',
        sorter: (a, b) => a.key - b.key,
        width: 80,
    },
    {
        title: 'Zona Name',
        dataIndex: 'zonaname',
        key: 'zonaname'
    },
    {
        title: 'SubZona Name',
        dataIndex: 'subzonaname',
        key: 'subzonaname'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: 'ZIP Code',
        dataIndex: 'zipcode',
        key: 'zipcode'
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city'
    },
    {
        title: 'Latitude Longitude',
        dataIndex: 'latlong',
        key: 'latlong'
    },
]
