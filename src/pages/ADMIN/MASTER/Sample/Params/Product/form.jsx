import React, { useEffect, useState } from 'react';
import { Form, Popconfirm, Table, Typography, Button, message, InputNumber } from 'antd';

import { CloseOutlined, DeleteOutlined, EditFilled, SaveFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getProduct } from '../../../../../../Api/Master/getData';
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
    onDataProduct,
    onEdit,
    ...restProps
}) => {

    useEffect(() => {
        if (onEdit) {
            setOpenProduct(true);
        }
    }, [onEdit]);


    const [isLoading, setIsLoading] = useState(false);

    const [dataProduct, setDataProduct] = useState([]);
    const [selectProduct, setSelectProduct] = useState("");
    const [openProduct, setOpenProduct] = useState(null);

    // PRODUCT
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const productCode = onData.map(item => item.req_prod_code);

                const res = await getProduct();
                const filter = res.filter(item => !productCode.includes(item.prodcode));
                setDataProduct(filter);

                if (onEdit) {
                    const selected = res.filter(item => item.prodcode === record.req_prod_code);
                    setSelectProduct(selected[0]);
                }

            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }
        if (openProduct) {
            fetchProduct();
            setOpenProduct(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openProduct]);

    useEffect(() => {
        if (selectProduct) {
            onDataProduct(selectProduct);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectProduct]);


    return (
        <td {...restProps}>
            {editing ? (
                <div>

                    {dataIndex === 'prod_qty' ? (
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
                            <InputNumber placeholder={title} className="w-full" />
                        </Form.Item>

                    ) : dataIndex === "productname" && (
                        <InputModal
                            title="PRODUCT"
                            label="Product Name"
                            name={dataIndex}
                            dataSource={dataProduct}
                            loading={isLoading}
                            columns={columnsProduct}
                            onData={(values) => setSelectProduct(values)}
                            onOpenModal={(values) => setOpenProduct(values)}
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

    // console.log(onEdit);


    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const [editingKey, setEditingKey] = useState('');

    const [dataProduct, setDataProduct] = useState(null);

    useEffect(() => {
        if (form && dataProduct) {
            form.setFieldsValue({ productname: dataProduct.prodname });
        }
    }, [dataProduct, form])

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
                const prodCode = dataProduct.prodcode;
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                    req_prod_code: prodCode
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
            productname: '',
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
            title: 'Product Name',
            dataIndex: 'productname',
            editable: true,
        },
        {
            title: 'Product Quantity',
            dataIndex: 'prod_qty',
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
                onDataProduct: (values) => setDataProduct(values),
                onEdit: onEdit
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
export default FormSampleProduct;

const columnsProduct = [
    {
        title: "No",
        dataIndex: "key",
        key: "key",
        width: 60,
        fixed: "left",
    },
    {
        title: "Product Code",
        dataIndex: "prodcode",
        key: "prodcode",
        fixed: "left",
    },
    {
        title: "Product Name",
        dataIndex: "prodname",
        key: "prodname",
    },
    {
        title: "Product Type Name",
        dataIndex: "prodtypename",
        key: "prodtypename",
    },
    {
        title: "Product Category Name",
        dataIndex: "prodcatname",
        key: "prodcatname",
    },
    {
        title: "Unit name",
        dataIndex: "unitname",
        key: "unitname",
    },
    {
        title: "Formula QTY",
        dataIndex: "formulaqty",
        key: "formulaqty",
    },
    {
        title: "Warehouse Name",
        dataIndex: "warehousename",
        key: "warehousename",
    },
    {
        title: "Alias Name",
        dataIndex: "aliasname",
        key: "aliasname",
    },
    {
        title: "Shelf Life",
        dataIndex: "shelflife",
        key: "shelflife",
    },
    {
        title: "Use In Batch No",
        dataIndex: "useintbatchno",
        key: "useintbatchno",
    },
    {
        title: "Use Ext BatchNo",
        dataIndex: "useextbatchno",
        key: "useextbatchno",
    },
    {
        title: "Manufacture Name",
        dataIndex: "manufacturename",
        key: "manufacturename",
    },
    {
        title: "Building Name",
        dataIndex: "buildingname",
        key: "buildingname",
    },
    {
        title: "Min Stock",
        dataIndex: "minstock",
        key: "minstock",
    },
    {
        title: "Unit Code Pack",
        dataIndex: "unitcodepack",
        key: "unitcodepack",
    },
    {
        title: "Formula QTY Pack",
        dataIndex: "formulaqtypack",
        key: "formulaqtypack",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    }
];
