import React, { useEffect, useState } from 'react';
import { Form, Input, Popconfirm, Table, Typography, Button, message } from 'antd';

import { CloseOutlined, DeleteOutlined, EditFilled, SaveFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getFormula } from '../../../../../../Api/Master/getData';
import InputModal from '../../../../../../components/Dashboard/Global/InputModal';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    onDataFormula,
    ...restProps
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const [dataFormula, setDataFormula] = useState([]);
    const [selectFormula, setSelectFormula] = useState("");
    const [openFormula, setOpenFormula] = useState(null);

    // FORMULA
    useEffect(() => {
        const fetchFormula = async () => {
            try {
                setIsLoading(true);
                const res = await getFormula();
                setDataFormula(res);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }
        if (openFormula) {
            fetchFormula();
            setOpenFormula(false);
        }
    }, [openFormula]);

    useEffect(() => {
        if (selectFormula) {
            onDataFormula(selectFormula);
        }
    }, [onDataFormula, selectFormula]);


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
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: `Please Input ${title}!`,
                            //     },
                            // ]}
                        >
                            <Input.TextArea rows={4} placeholder={title} />
                        </Form.Item>

                    ) : dataIndex === "formulacode" && (
                        <InputModal
                            title="FORMULA"
                            label="Formula Name"
                            name={dataIndex}
                            dataSource={dataFormula}
                            loading={isLoading}
                            columns={columnsFormula}
                            onData={(values) => setSelectFormula(values)}
                            onOpenModal={(values) => setOpenFormula(values)}
                            onDetail={true}
                        />
                    )}

                </div>
            ) : (
                children
            )
            }
        </td >
    );
};


const FormSampleProduct = ({ onSaveData, onParamCode, onEdit, onApproval }) => {

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const [editingKey, setEditingKey] = useState('');

    const [dataFormula, setDataFormula] = useState(null);

    useEffect(() => {
        if (form && dataFormula) {
            form.setFieldsValue({ Formulacode: dataFormula.Formulaname });
        }
    }, [dataFormula, form])

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
                const FormulaCode = dataFormula.formulacode
                const FormulaVersion = dataFormula.version
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                    formulacode: FormulaCode,
                    formulaversion: FormulaVersion
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
            detailno: num,
            parcode: onParamCode,
            req_prod_code: '',
            prod_qty: '',
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
            title: 'Product',
            dataIndex: 'req_prod_code',
            editable: true,
        },
        {
            title: 'Product Quantity',
            dataIndex: 'prod_qty',
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
                onDataFormula: (values) => setDataFormula(values)
            }),
            ...col,
        };
    });

    return (
        <Form form={form} component={false}>
            <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold">
                    PRODUCT
                </p>
                {!onApproval && (
                    <Button
                        onClick={handleAdd}
                        color="primary"
                        variant="contained"
                        disabled={!!editingKey || !onParamCode}
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
        </Form>
    );
};
export default FormSampleProduct;

const columnsFormula = [
    {
        title: "Formula Code",
        dataIndex: "formulacode",
        key: "formulacode",
    },
    {
        title: "Formula Name",
        dataIndex: "formulaname",
        key: "formulaname",
    },
    {
        title: "Formula",
        dataIndex: "formula",
        key: "formula",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
];
