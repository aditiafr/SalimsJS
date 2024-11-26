import React, { useEffect, useState } from 'react';
import { Form, Input, Popconfirm, Table, Typography, Button, message, InputNumber } from 'antd';

import { CloseOutlined, DeleteOutlined, EditFilled, SaveFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import InputModal from '../../../../../components/Dashboard/Global/InputModal';
import { getParameter } from '../../../../../Api/Master/getData';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    onDataParameter,
    ...restProps
}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [dataParameter, setDataParameter] = useState([]);
    const [selectParameter, setSelectParameter] = useState("");
    const [openParameter, setOpenParameter] = useState(null);

    useEffect(() => {
        const fetchParameter = async () => {
            try {
                const res = await getParameter();
                setDataParameter(res);
            } catch (error) {
                console.log(error);
            }
        }

        if (openParameter) {
            fetchParameter();
            setOpenParameter(false);
            setIsLoading(false);
        }

    }, [openParameter]);

    useEffect(() => {
        if (selectParameter) {
            onDataParameter(selectParameter);
        }
    }, [onDataParameter, selectParameter]);



    return (
        <td {...restProps}>
            {editing ? (
                <div>

                    {
                        dataIndex === 'refvalue1' ||
                            dataIndex === 'refvalue2' ||
                            dataIndex === 'refvalue3' ||
                            dataIndex === 'refvalue4' ||
                            dataIndex === 'refvalue5'
                            ? (
                                <Form.Item
                                    name={dataIndex}
                                    style={{
                                        margin: 0,
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        },
                                    ]}
                                >
                                    <InputNumber min={0} placeholder={title} className="w-full" />
                                </Form.Item>

                            ) :
                            dataIndex === 'parname' && editing && (

                                <InputModal
                                    title="PARAMETER"
                                    label="Parameter Name"
                                    name={dataIndex}
                                    dataSource={dataParameter}
                                    loading={isLoading}
                                    columns={columnsParameter}
                                    onData={(values) => setSelectParameter(values)}
                                    onOpenModal={(values) => setOpenParameter(values)}
                                    onDetail={true}
                                />

                            )
                    }

                </div>
            ) : (
                children
            )
            }
        </td >
    );
};



const FormDetailQualityReference = ({ onSaveData, onEdit, onApproval }) => {

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const [editingKey, setEditingKey] = useState('');
    // const [loading, setLoading] = useState(false);
    // const [isDisable, setIsDisable] = useState(true);

    const [dataParameter, setDataParameter] = useState(null);

    useEffect(() => {
        if (form && dataParameter) {
            form.setFieldsValue({
                parname: dataParameter.parname
            })
        }
    }, [dataParameter, form]);


    useEffect(() => {
        if (onEdit) {
            const dataEdit = onEdit.map((row, index) => ({ ...row, key: index + 1 })).reverse()
            setData(dataEdit);
            setCount(dataEdit.length === 0 ? 0 : dataEdit.map((item) => item.key)[0]);
            onSaveData(dataEdit);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onEdit]);

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

            if (index > -1) {
                const item = newData[index];
                const ParCode = dataParameter.parcode;
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                    parcode: ParCode
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
            // userid: "CUS" + code,
            parcode: '',
            parname: '',
            refvalue1: '',
            refvalue2: '',
            refvalue3: '',
            refvalue4: '',
            refvalue5: '',
        };
        setData([newData, ...data]);
        handleEdit(newData);

        // console.log("DataFormTran", data);
    };

    // const handleSaveAllData = async () => {
    //     setLoading(true);
    // setIsDisable(true);
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
        // {
        //     title: 'Parameter Code',
        //     dataIndex: 'parcode',
        //     editable: true,
        // },
        {
            title: 'Parameter Name',
            dataIndex: 'parname',
            editable: true,
        },
        {
            title: 'Reference Value 1',
            dataIndex: 'refvalue1',
            editable: true,
        },
        {
            title: 'Reference Value 2',
            dataIndex: 'refvalue2',
            editable: true,
        },
        {
            title: 'Reference Value 3',
            dataIndex: 'refvalue3',
            editable: true,
        },
        {
            title: 'Reference Value 4',
            dataIndex: 'refvalue4',
            editable: true,
        },
        {
            title: 'Reference Value 5',
            dataIndex: 'refvalue5',
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
                onDataParameter: (values) => setDataParameter(values),
            }),
            ...col,
        };
    });

    return (
        <Form form={form} component={false}>
            <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold">
                    DETAIL QUALITY REFERENCE
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
                    x: 1500
                }}
            />
        </Form>
    );
};
export default FormDetailQualityReference;



const columnsParameter = [
    {
        title: "No",
        dataIndex: "key",
        key: "key",
        width: 60,
        fixed: "left",
    },
    {
        title: "Parameter Code",
        dataIndex: "parcode",
        key: "parcode",
        fixed: "left",
    },
    {
        title: "Parameter Name",
        dataIndex: "parname",
        key: "parname",
    },
    {
        title: "Method Id",
        dataIndex: "methodid",
        key: "methodid",
    },
    {
        title: "Preservation",
        dataIndex: "preservation",
        key: "preservation",
    },
    {
        title: "Storage Time Limit",
        dataIndex: "storagetimelimit",
        key: "storagetimelimit",
    },
    {
        title: "Product Category Code",
        dataIndex: "prodcatcode",
        key: "prodcatcode",
    },
    {
        title: "product Category Name",
        dataIndex: "prodcatname",
        key: "prodcatname",
    },
    {
        title: "Unit Code",
        dataIndex: "unitcode",
        key: "unitcode",
    },
    {
        title: "Unit Name",
        dataIndex: "unitname",
        key: "unitname",
    },
    {
        title: "Alias Name",
        dataIndex: "aliasname",
        key: "aliasname",
    },
    {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
    },
    {
        title: "Akreditasi",
        dataIndex: "akreditasi",
        key: "akreditasi",
    },
    {
        title: "Result Unit Code",
        dataIndex: "resultunitcode",
        key: "resultunitcode",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    }
];