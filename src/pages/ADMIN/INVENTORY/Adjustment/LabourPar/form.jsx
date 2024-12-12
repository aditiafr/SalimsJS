import React, { useEffect, useState } from 'react';
import { Form, Input, Popconfirm, Table, Typography, DatePicker, Button, message, Tag } from 'antd';

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
    const [isLoading, setIsLoading] = useState(false);

    const [dataParameter, setDataParameter] = useState([]);
    const [selectParameter, setSelectParameter] = useState("");
    const [openParameter, setOpenParameter] = useState(false);

    useEffect(() => {
        const fetchParameter = async () => {
            try {
                setIsLoading(true);
                const response = await getParameter();
                setDataParameter(response);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        if (openParameter) {
            fetchParameter();
            setOpenParameter(false);
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
                    {dataIndex === "parcode" && (
                        <InputModal
                            title="Parameter"
                            label="Parameter"
                            name={dataIndex}
                            dataSource={dataParameter}
                            loading={isLoading}
                            columns={columnParameter}
                            onData={(values) => setSelectParameter(values)}
                            onOpenModal={(values) => setOpenParameter(values)}
                            onDetail={true}
                        />
                    )}

                    {dataIndex === "description" && (
                        <Form.Item
                            name={dataIndex}
                            style={{ margin: 0 }}
                            rules={[
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ]}
                        >
                            <Input.TextArea rows={3} />
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


const FormLabourPar = ({ onSaveData, onEdit, onApproval }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const [editingKey, setEditingKey] = useState('');

    const [dataParameter, setDataParameter] = useState([]);
    
    useEffect(() => {   
        if (form && dataParameter) {
            form.setFieldsValue({ parcode: dataParameter.parcode });
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
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.key);
    };

    const handleDelete = (key) => {
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
    };


    const handleCancel = (record) => {
        if (!record.username) {
            const newData = data.filter((item) => item.key !== record.key);
            setData(newData);
        } else {
            setEditingKey('');
        }
        setEditingKey('');
    };


    const handleSave = async (record) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => record.key === item.key);
            const duplicateParameter = newData.find((item) => item.parcode === record.parcode);

            if (false) {
                message.error("Duplicate Parameter!");
            } else {
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, {
                        ...item,
                        ...row,
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
        const code = (count + 1).toString().padStart(3, '0');

        if (editingKey) {
            message.warning("Complete the input form !");
            return; // Stop saving if duplicate found
        }

        const newData = {
            key: num,
            parcode: '',
            description: '',
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
        {
            title: 'Parameter',
            dataIndex: 'parcode',
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
                onDataParameter: (values) => setDataParameter(values),
            }),
            ...col,
        };
    });

    return (
        <Form form={form} component={false}>
            <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold">
                    DETAIL
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
export default FormLabourPar;

const columnParameter = [
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
        title: "Parameter Category Code",
        dataIndex: "parcatcode",
        key: "parcatcode",
      },
      {
        title: "Parameter Category Name",
        dataIndex: "parcatname",
        key: "parcatname",
      },
      {
        title: "Result Unit Code",
        dataIndex: "resultunitcode",
        key: "resultunitcode",
      },
      {
        title: "Result Unit Name",
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
        render: (akreditasi) => (
          <Tag color={akreditasi ? 'green' : 'red'}> {akreditasi ? 'Yes' : 'No'} </Tag>
        ),
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