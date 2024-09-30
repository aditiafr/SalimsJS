import React, { useEffect, useState } from 'react';
import { Form, Input, Popconfirm, Table, Typography, DatePicker, Button, message } from 'antd';

import { CloseOutlined, DeleteOutlined, EditFilled, SaveFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import InputModal from '../../../../../components/Dashboard/Global/InputModal';
import { getProduct } from '../../../../../Api/Master/getData';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    onDataProduct,
    ...restProps
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const [dataProduct, setDataProduct] = useState([]);
    const [selectProduct, setSelectProduct] = useState("");
    const [openProduct, setOpenProduct] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const response = await getProduct();
                setDataProduct(response);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        if (openProduct) {
            fetchProduct();
            setOpenProduct(false);
        }
    }, [openProduct]);

    useEffect(() => {
        if (selectProduct) {
            onDataProduct(selectProduct);
        }
    }, [onDataProduct, selectProduct]);

    return (
        <td {...restProps}>
            {editing ? (
                <div>

                    {dataIndex === "prodcode" && (
                        <InputModal
                            title="Product"
                            label="Product"
                            name={dataIndex}
                            dataSource={dataProduct}
                            loading={isLoading}
                            columns={columnProduct}
                            onData={(values) => setSelectProduct(values)}
                            onOpenModal={(values) => setOpenProduct(values)}
                            onDetail={true}
                        />
                    )}

                    {dataIndex === "defprice" && (
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
                            <Input type='number' min={0} />
                        </Form.Item>
                    )}

                    {dataIndex === "discp" && (
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
                            <Input type='number' min={0} />
                        </Form.Item>
                    )}

                    {dataIndex === "discm" && (
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
                            <Input type='number' min={0} />
                        </Form.Item>
                    )}

                    {dataIndex === "pricelist" && (
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
                            <Input type='number' min={0} />
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


const FormPriceListDetail = ({ onSaveData, onEdit, onApproval }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const [editingKey, setEditingKey] = useState('');

    const [dataProduct, setDataProduct] = useState([]);
    
    useEffect(() => {   
        if (form && dataProduct) {
            form.setFieldsValue({ prodcode: dataProduct.prodcode });
        }
    }, [dataProduct, form]);

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
            const duplicateProduct = newData.find((item) => item.prodcode === record.prodcode);

            if (false) {
                message.error("Duplicate Product!");
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
            prodcode: '',
            defprice: 0,
            discp: 0,
            discm: 0,
            pricelist: 0,
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
            dataIndex: 'prodcode',
            editable: true,
        },
        {
            title: 'Default Price',
            dataIndex: 'defprice',
            editable: true,
        },
        {
            title: 'Discount P',
            dataIndex: 'discp',
            editable: true,
        },
        {
            title: 'Discount M',
            dataIndex: 'discm',
            editable: true,
        },
        {
            title: 'Price List',
            dataIndex: 'pricelist',
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
                onDataProduct: (values) => setDataProduct(values),
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
export default FormPriceListDetail;

const columnProduct = [
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
        dataIndex: "prodcode",
        key: "prodcode",
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
      },
]