import React, { useEffect, useState } from 'react';
import { Form, Input, Popconfirm, Table, Button, message, InputNumber } from 'antd';

import { CloseOutlined, DeleteOutlined, EditFilled, SaveFilled } from '@ant-design/icons';
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
    onData,
    onDataFormula,
    onEdit,
    ...restProps
}) => {

    useEffect(() => {
        if (onEdit) {
            setOpenFormula(true);
        }
    }, [onEdit]);


    const [isLoading, setIsLoading] = useState(true);
    const [dataFormula, setDataFormula] = useState([]);
    const [selectFormula, setSelectFormula] = useState("");
    const [openFormula, setOpenFormula] = useState(null);

    // FORMULA
    useEffect(() => {
        const fetchFormula = async () => {
            try {
                const formulaCode = onData.map(item => item.formulacode);

                const res = await getFormula();
                const filter = res.filter(item => !formulaCode.includes(item.formulacode));
                setDataFormula(filter);

                if (onEdit) {
                    const selected = res.filter(item => item.formulacode === record.formulacode);
                    setSelectFormula(selected[0]);
                }

            } catch (error) {
                console.log(error);
            }
        }
        if (openFormula) {
            fetchFormula();
            setOpenFormula(false);
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openFormula]);

    useEffect(() => {
        if (selectFormula) {
            onDataFormula(selectFormula);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectFormula]);

    return (
        <td {...restProps}>
            {editing ? (
                <div>
                    {dataIndex === 'description' ? (
                        <Form.Item
                            name={dataIndex}
                            style={{ margin: 0 }}
                        >
                            <Input.TextArea rows={4} placeholder={title} />
                        </Form.Item>
                    ) : dataIndex === "formulaname" ? (
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
                    ) : (dataIndex === "lspec" || dataIndex === "uspec") ? (
                        <Form.Item
                            name={dataIndex}
                            style={{ margin: 0 }}
                        >
                            <InputNumber placeholder={title} className="w-full" />
                        </Form.Item>
                    ) : null}
                </div>
            ) : (
                children
            )}
        </td>

    );
};


const FormSampleFormula = ({ onSaveData, onParamCode, onEdit, onApproval }) => {

    // console.log(onEdit);

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const [editingKey, setEditingKey] = useState('');

    const [dataFormula, setDataFormula] = useState(null);

    useEffect(() => {
        if (form && dataFormula) {
            form.setFieldsValue({ formulaname: dataFormula.formulaname });
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
            formulacode: '',
            formulaname: '',
            description: '',
            lspec: '',
            uspec: '',
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
            title: 'Formula',
            dataIndex: 'formulaname',
            editable: true,
        },
        {
            title: 'Lower Spec',
            dataIndex: 'lspec',
            editable: true,
        },
        {
            title: 'Upper Spec',
            dataIndex: 'uspec',
            editable: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            editable: true,
        },
    ];

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
                onDataFormula: (values) => setDataFormula(values),
                onEdit: onEdit,
            }),
            ...col,
        };
    });

    return (
        <Form form={form} component={false}>
            <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold">
                    FORMULA
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
        </Form>
    );
};
export default FormSampleFormula;

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
