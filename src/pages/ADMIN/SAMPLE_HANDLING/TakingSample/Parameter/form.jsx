import React, { useEffect, useState } from 'react';
import { Form, Input, Popconfirm, Table, Button, message } from 'antd';

import { CloseOutlined, DeleteOutlined, EditFilled, SaveFilled } from '@ant-design/icons';
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
    onData,
    onDataParameter,
    onEdit,
    ...restProps
}) => {

    useEffect(() => {
        if (onEdit) {
            setOpenParameter(true);
        }
    }, [onEdit]);


    const [isLoading, setIsLoading] = useState(true);

    const [dataParameter, setDataParameter] = useState([]);
    const [selectParameter, setSelectParameter] = useState("");
    const [openParameter, setOpenParameter] = useState(null);

    // PARAMETER
    useEffect(() => {
        const fetchParameter = async () => {
            try {
                const parameterCode = onData.map(item => item.parcode);

                const res = await getParameter();
                const filter = res.filter(item => !parameterCode.includes(item.parcode));
                setDataParameter(filter);

                if (onEdit) {
                    const selected = res.filter(item => item.parcode === record.parcode);
                    setSelectParameter(selected[0]);
                }

            } catch (error) {
                console.log(error);
            }
        }
        if (openParameter) {
            fetchParameter();
            setOpenParameter(false);
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openParameter]);

    useEffect(() => {
        if (selectParameter) {
            onDataParameter(selectParameter);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectParameter]);


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
                            <Input.TextArea placeholder={title} />
                        </Form.Item>

                    ) : dataIndex === 'parname' ? (
                        <InputModal
                            title="PARAMETER"
                            label={title}
                            name={dataIndex}
                            dataSource={dataParameter}
                            loading={isLoading}
                            columns={columnsParameter}
                            onData={(values) => setSelectParameter(values)}
                            onOpenModal={(values) => setOpenParameter(values)}
                            onDetail={true}
                        />
                    ) : (

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
                            <Input placeholder={title} maxLength={50} />
                        </Form.Item>
                    )}

                </div>
            ) : (
                children
            )
            }
        </td >
    );
};


const FormTakingSampleParameter = ({ onSaveData, onEdit, onApproval }) => {

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const [editingKey, setEditingKey] = useState('');

    const [dataParameter, setDataParameter] = useState(null);


    useEffect(() => {
        if (form && dataParameter) {
            form.setFieldsValue({
                parname: dataParameter.parname
            });

            setData(data.map((item) => ({
                ...item,
                price: dataParameter.price
            })))

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataParameter, form])

    useEffect(() => {
        if (onEdit) {
            const dataEdit = onEdit.taking_sample_parameters.map((row, index) => ({ ...row, key: index + 1 })).reverse()
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
        if (!record.parcode) {
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
            const parCode = dataParameter.parcode;
            const methodId = dataParameter.methodid;
            const Price = dataParameter.price;

            if (index > -1) {
                const item = newData[index];
                // const docExpDate = row.DocExpDate.format('YYYY-MM-DD');
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                    parcode: parCode,
                    methodid: methodId,
                    price: Price,
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
            return;
        }

        const newData = {
            key: num,
            detailno: num,
            parcode: '',
            parname: '',
            iscalibration: false,
            insituresult: '',
            description: '',
        };
        setData([newData, ...data]);
        handleEdit(newData);
    };


    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            sorter: (a, b) => a.key - b.key,
            width: 80,
        },
        {
            title: 'Parameter',
            dataIndex: 'parname',
            editable: true,
        },
        // {
        //     title: 'iscalibration',
        //     dataIndex: 'iscalibration',
        //     editable: true,
        // },
        {
            title: 'Insitu Result',
            dataIndex: 'insituresult',
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
                        <Button
                            color="primary"
                            variant="text"
                            icon={<SaveFilled />}
                            onClick={() => handleSave(record)}
                        />
                        <Button
                            color="primary"
                            variant="text"
                            icon={<CloseOutlined />}
                            onClick={() => handleCancel(record)}
                        />
                    </span>
                ) : (
                    <span className="flex items-center justify-around">
                        <Button
                            color="primary"
                            variant="text"
                            icon={<EditFilled />}
                            onClick={() => handleEdit(record)}
                        />
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <Button
                                color="primary"
                                variant="text"
                                icon={<DeleteOutlined />}
                            />
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
                onData: data,
                onDataParameter: (values) => setDataParameter(values),
                onEdit: onEdit
            }),
            ...col,
        };
    });

    return (
        <Form form={form} component={false}>
            <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold">
                    PARAMETER
                </p>
                {!onApproval && (
                    <Button
                        type="primary"
                        onClick={handleAdd}
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
export default FormTakingSampleParameter;


const columnsParameter = [
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
    },
]