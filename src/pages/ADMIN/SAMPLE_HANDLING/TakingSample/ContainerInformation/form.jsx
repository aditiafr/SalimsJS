import React, { useEffect, useState } from 'react';
import { Form, Input, Popconfirm, Table, Button, message, InputNumber } from 'antd';

import { CloseOutlined, DeleteOutlined, EditFilled, SaveFilled } from '@ant-design/icons';
import InputModal from '../../../../../components/Dashboard/Global/InputModal';
import { getEquipment } from '../../../../../Api/Master/getData';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    onData,
    onDataEquipment,
    onEdit,
    ...restProps
}) => {

    useEffect(() => {
        if (onEdit) {
            setOpenEquipment(true);
        }
    }, [onEdit]);


    const [isLoading, setIsLoading] = useState(true);

    const [dataEquipment, setDataEquipment] = useState([]);
    const [selectEquipment, setSelectEquipment] = useState("");
    const [openEquipment, setOpenEquipment] = useState(null);

    // EQUIPMENT
    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const equipmentCode = onData.map(item => item.equipmentcode);

                const res = await getEquipment();
                const filter = res.filter(item => !equipmentCode.includes(item.equipmentcode));
                setDataEquipment(filter);

                if (onEdit) {
                    const selected = res.filter(item => item.equipmentcode === record.equipmentcode);
                    setSelectEquipment(selected[0]);
                }

            } catch (error) {
                console.log(error);
            }
        }
        if (openEquipment) {
            fetchEquipment();
            setOpenEquipment(false);
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openEquipment]);

    useEffect(() => {
        if (selectEquipment) {
            onDataEquipment(selectEquipment);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectEquipment]);

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

                    ) : dataIndex === 'equipmentname' ? (
                        <InputModal
                            title="EQUIPMENT"
                            label="Equipment"
                            name={dataIndex}
                            dataSource={dataEquipment}
                            loading={isLoading}
                            columns={columnsEquipment}
                            onData={(values) => setSelectEquipment(values)}
                            onOpenModal={(values) => setOpenEquipment(values)}
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
                            {
                                (dataIndex === 'conqty' ||
                                    dataIndex === 'volqty')
                                    && editing ? (

                                    <InputNumber placeholder={title} min={0} className="w-full" />

                                ) : (

                                    <Input placeholder={title} maxLength={50} />

                                )}
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


const FormTakingSampleCI = ({ onSaveData, onEdit, onApproval }) => {

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const [editingKey, setEditingKey] = useState('');

    const [dataEquipment, setDataEquipment] = useState(null);

    useEffect(() => {
        if (form && dataEquipment) {
            form.setFieldsValue({
                equipmentname: dataEquipment.equipmentname
            })
        }
    }, [dataEquipment, form]);


    useEffect(() => {
        if (onEdit) {
            const dataEdit = onEdit.taking_sample_ci.map((row, index) => ({ ...row, key: index + 1 })).reverse()
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
        if (!record.equipmentcode) {
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
            const equipmentCode = dataEquipment.equipmentcode

            if (index > -1) {
                const item = newData[index];
                // const docExpDate = row.DocExpDate.format('YYYY-MM-DD');
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                    equipmentcode: equipmentCode
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
            equipmentcode: '',
            equipmentname: '',
            conqty: '',
            conuom: '',
            volqty: '',
            voluom: '',
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
        // {
        //     title: 'detailno',
        //     dataIndex: 'detailno',
        //     editable: true,
        // },
        // {
        //     title: 'Equipment Code',
        //     dataIndex: 'equipmentcode',
        //     editable: true,
        // },
        {
            title: 'Equipment  Name',
            dataIndex: 'equipmentname',
            editable: true,
        },
        {
            title: 'Con Quantity',
            dataIndex: 'conqty',
            editable: true,
        },
        {
            title: 'Con UOM',
            dataIndex: 'conuom',
            editable: true,
        },
        {
            title: 'Volume Quantity',
            dataIndex: 'volqty',
            editable: true,
        },
        {
            title: 'Volume UOM',
            dataIndex: 'voluom',
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
                onDataEquipment: (values) => setDataEquipment(values),
                onEdit: onEdit
            }),
            ...col,
        };
    });

    return (
        <Form form={form} component={false}>
            <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold">
                    CONTAINER INFORMATION
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
                    x: 1500
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
export default FormTakingSampleCI;


const columnsEquipment = [
    {
        title: 'Equipment Name',
        dataIndex: 'equipmentname',
        key: 'equipmentname'
    },
    {
        title: 'Equipment Type Name',
        dataIndex: 'equipmenttypename',
        key: 'equipmenttypename'
    },
    {
        title: 'Vendor Name',
        dataIndex: 'vendorname',
        key: 'vendorname'
    },
    {
        title: 'Manufacture Name',
        dataIndex: 'manufacturename',
        key: 'manufacturename'
    },
    {
        title: 'Serial Number',
        dataIndex: 'serialnumber',
        key: 'serialnumber'
    },
    {
        title: 'Date Calibration',
        dataIndex: 'datecalibration',
        key: 'datecalibration'
    },
    {
        title: 'Due Date Calibration',
        dataIndex: 'duedatecalibration',
        key: 'duedatecalibration'
    },
    {
        title: 'Quantity',
        dataIndex: 'qty',
        key: 'qty'
    },
    {
        title: 'Temp Info',
        dataIndex: 'tempinfo',
        key: 'tempinfo'
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
    },
]