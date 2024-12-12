import React, { useEffect, useState } from 'react';
import { Form, Input, Popconfirm, Table, Button, message, InputNumber, DatePicker } from 'antd';

import { CloseOutlined, DeleteOutlined, EditFilled, SaveFilled } from '@ant-design/icons';
import FormTestingOrderContainerInformation from '../Sample/ContainerInformation/form';
import FormTestingOrderParameter from './Parameter/form';
import FormTestingQualityReference from './QualityReference/form';
import InputModal from '../../../../../components/Dashboard/Global/InputModal';
import { getSample, getSubZona } from '../../../../../Api/Master/getData';
import { toRupiah } from '../../../../../components/Dashboard/Global/General';
import dayjs from 'dayjs';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    onData,
    onDataSample,
    onDataSubzona,
    onEdit,
    ...restProps
}) => {

    useEffect(() => {
        if (onEdit) {
            setOpenSample(true);
            setOpenSubzona(true);
        }
    }, [onEdit]);


    const [isLoading, setIsLoading] = useState(false);

    const [dataSample, setDataSample] = useState([]);
    const [selectSample, setSelectSample] = useState("");
    const [openSample, setOpenSample] = useState(null);

    const [dataSubzona, setDataSubzona] = useState([]);
    const [selectSubzona, setSelectSubzona] = useState("");
    const [openSubzona, setOpenSubzona] = useState(null);

    // SAMPLE
    useEffect(() => {
        const fetchSample = async () => {
            try {
                setIsLoading(true);
                const sampleCode = onData.map(item => item.sampleno);

                const res = await getSample();
                const filter = res.filter(item => !sampleCode.includes(item.samplecode));
                setDataSample(filter);

                if (onEdit) {
                    const selected = res.filter(item => item.samplecode === record.sampleno);
                    setSelectSample(selected[0]);
                }

            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }
        if (openSample) {
            fetchSample();
            setOpenSample(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openSample]);

    useEffect(() => {
        if (selectSample) {
            onDataSample(selectSample);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectSample]);


    // SUBZONA
    useEffect(() => {
        const fetchSubzona = async () => {
            try {
                setIsLoading(true);
                const subzonaCode = onData.map(item => item.subzonacode);

                const res = await getSubZona();
                const filter = res.filter(item => !subzonaCode.includes(item.subzonacode));
                setDataSubzona(filter);

                if (onEdit) {
                    const selected = res.filter(item => item.subzonacode === record.subzonacode);
                    setSelectSubzona(selected[0]);
                }

            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }
        if (openSubzona) {
            fetchSubzona();
            setOpenSubzona(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openSubzona]);

    useEffect(() => {
        if (selectSubzona) {
            onDataSubzona(selectSubzona);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectSubzona]);

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

                    ) : dataIndex === 'samplename' ? (
                        <InputModal
                            title="SAMPLE"
                            label="Sample"
                            name={dataIndex}
                            dataSource={dataSample}
                            loading={isLoading}
                            columns={columnsSample}
                            onData={(values) => setSelectSample(values)}
                            onOpenModal={(values) => setOpenSample(values)}
                            onDetail={true}
                        />
                    ) : dataIndex === 'subzonaname' ? (
                        <InputModal
                            title="SUBZONA"
                            label="Subzona"
                            name={dataIndex}
                            dataSource={dataSubzona}
                            loading={isLoading}
                            columns={columnsSubzona}
                            onData={(values) => setSelectSubzona(values)}
                            onOpenModal={(values) => setOpenSubzona(values)}
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
                            {dataIndex === 'subtotalprice' && editing ? (

                                <InputNumber
                                    className="w-full"
                                    placeholder={title}
                                    min={0}
                                    formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value?.replace(/Rp\s?|(,*)/g, '')}
                                    readOnly
                                />

                            ) : dataIndex === 'sampledate' ? (

                                <DatePicker placeholder={title} className="w-full" />

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


const FormTestingOrderSample = ({ onSaveData, onEdit, onApproval }) => {

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const [editingKey, setEditingKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(true);

    const [containerInformation, setContainerInformation] = useState([]);
    const [qualityReference, setQualityReference] = useState([]);
    const [parameter, setParameter] = useState([]);

    const [dataSample, setDataSample] = useState(null);
    const [dataSubzona, setDataSubzona] = useState(null);

    useEffect(() => {
        if (form && dataSample) {
            form.setFieldsValue({ samplename: dataSample.samplename });
        }
    }, [dataSample, form])

    useEffect(() => {
        if (form && dataSubzona) {
            form.setFieldsValue({ subzonaname: dataSubzona.subzonaname });
        }
    }, [dataSubzona, form])

    useEffect(() => {
        if (parameter) {
            setData(data.map((item) => ({
                ...item,
                subtotalprice: parameter[item.key] ? parameter[item.key].reduce((sum, paramItem) => sum + parseFloat(paramItem.price) || 0, 0) : 0
            }))
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parameter])


    useEffect(() => {
        if (onEdit) {
            const dataEdit = onEdit.testing_order_sample.map((row, index) => ({ ...row, key: index + 1 })).reverse()
            setData(dataEdit);
            setCount(dataEdit.length === 0 ? 0 : dataEdit.map((item) => item.key)[0]);
            onSaveData(dataEdit);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onEdit]);

    const isEditing = (record) => record.key === editingKey;

    const handleEdit = (record) => {
        const sampleDate = record.sampledate ? dayjs(record.sampledate) : null;

        form.setFieldsValue({
            // Description: '',
            ...record,
            sampledate: sampleDate,
        });
        setEditingKey(record.key);


        setExpandedKeys([record.key]);
    };

    const handleDelete = (key) => {
        setIsDisable(false);
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
        if (!record.sampleno) {
            const newData = data.filter((item) => item.key !== record.key);
            setData(newData);
        } else {
            setEditingKey('');
        }
        setEditingKey('');

        // console.log("DataFormTran", data);
    };


    const handleSave = async (record) => {
        setIsDisable(false);
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => record.key === item.key);
            const sampleNo = dataSample.samplecode;
            const prodcatCode = dataSample.prodcatcode;
            const subzonaCode = dataSubzona.subzonacode;
            const sampleDate = row.sampledate.format('YYYY-MM-DD');

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                    sampleno: sampleNo,
                    sampledate: sampleDate,
                    prodcatcode: prodcatCode,
                    subzonacode: subzonaCode,
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

    const [expandedKeys, setExpandedKeys] = useState([]);


    const handleAdd = () => {
        const num = count + 1;
        // const code = (count + 1).toString().padStart(3, '0');

        if (editingKey) {
            message.warning("Complete the input form !");
            return;
        }

        const newData = {
            key: num,
            sampleno: '',
            samplename: '',
            prodcatcode: '',
            prodcatname: '',
            servicetype: '',
            sampledate: '',
            subzonacode: '',
            subzonaname: '',
            extsampleno: '',
            isacceleration: true,
            subtotalprice: '',
            qrstatus: true,
            parstatus: false,
            constatus: true,
        };
        setData([newData, ...data]);
        handleEdit(newData);

        // Auto-expand the newly added row
        setExpandedKeys([num]);
    };


    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            sorter: (a, b) => a.key - b.key,
            width: 80,
        },
        {
            title: 'Sample Name',
            dataIndex: 'samplename',
            editable: true,
        },
        // {
        //     title: 'Product Category Name',
        //     dataIndex: 'prodcatname',
        //     editable: true,
        // },
        {
            title: 'Service Type',
            dataIndex: 'servicetype',
            editable: true,
        },
        {
            title: 'Sample Date',
            dataIndex: 'sampledate',
            editable: true,
        },
        {
            title: 'Subzona Name',
            dataIndex: 'subzonaname',
            editable: true,
        },
        {
            title: 'EXT Sample No',
            dataIndex: 'extsampleno',
            editable: true,
        },
        {
            title: 'Subtotal Price',
            dataIndex: 'subtotalprice',
            // editable: true,
            render: (value) => <p>{toRupiah(value)}</p>
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
                onDataSample: (values) => setDataSample(values),
                onDataSubzona: (values) => setDataSubzona(values),
                onEdit: onEdit,
            }),
            ...col,
        };
    });

    const handleSaveAllData = async () => {
        setLoading(true);
        setIsDisable(true);
        try {
            const newData = data.map(item => {
                return {
                    ...item,
                    testing_order_ci: containerInformation[item.key] || [],
                    testing_order_par: parameter[item.key] || [],
                    testing_order_qr: qualityReference[item.key] || [],
                };
            });

            onSaveData(newData);
            console.log("PostData", newData);
            message.success("Success add form table data!");
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const handleCancelAllData = () => {
        setData([]);
        setCount(0);
        onSaveData([]);
    }

    const handleSaveContainerInformation = (key, values) => {
        setContainerInformation((prev) => ({
            ...prev,
            [key]: values, // Simpan data berdasarkan key dari row
        }));
    };

    const handleSaveQualityReference = (key, values) => {
        setQualityReference((prev) => ({
            ...prev,
            [key]: values, // Simpan data berdasarkan key dari row
        }));
    };

    const handleSaveParameter = (key, values) => {
        setParameter((prev) => ({
            ...prev,
            [key]: values, // Simpan data berdasarkan key dari row
        }));
    };


    return (
        <Form form={form} component={false}>
            <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold">
                    SAMPLE
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
                    x: 1200
                }}
                expandable={{
                    expandedRowRender: (record) =>
                        expandedRowRender(
                            record,
                            handleSaveContainerInformation,
                            handleSaveQualityReference,
                            handleSaveParameter
                        ),
                    expandedRowKeys: expandedKeys,
                    onExpandedRowsChange: (keys) => setExpandedKeys(keys),
                }}
            />
            {!onApproval && (
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        onClick={handleCancelAllData}
                        disabled={!!editingKey || !!isDisable}
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleSaveAllData}
                        disabled={!!editingKey || !!isDisable}
                        loading={loading}
                    >
                        <span>Save</span>
                    </Button>

                </div>
            )}
        </Form>
    );
};
export default FormTestingOrderSample;


const expandedRowRender = (record, onSaveContainerInformation, onSaveQualityReference, onSaveParameter) => {
    const handleSaveContainerInformation = (values) => {
        onSaveContainerInformation(record.key, values);
    };
    const handleSaveQualityReference = (values) => {
        onSaveQualityReference(record.key, values);
    };
    const handleSaveParameter = (values) => {
        onSaveParameter(record.key, values);
    };

    // console.log(record);
    

    return (
        <>
            <div className="m-4 p-4 border rounded-md shadow-md">
                <FormTestingOrderContainerInformation onSaveData={handleSaveContainerInformation} onEdit={record.testing_order_ci} />
            </div>
            <div className="m-4 p-4 border rounded-md shadow-md">
                <FormTestingQualityReference onSaveData={handleSaveQualityReference} onEdit={record.testing_order_qr} />
            </div>
            <div className="m-4 p-4 border rounded-md shadow-md">
                <FormTestingOrderParameter onSaveData={handleSaveParameter} onEdit={record.testing_order_par} />
            </div>
        </>
    );
};




const columnsSample = [
    {
        title: "Sample Code",
        dataIndex: "samplecode",
        key: "samplecode",
        fixed: "left",
    },
    {
        title: "Sample Name",
        dataIndex: "samplename",
        key: "samplename",
    },
    {
        title: "Version",
        dataIndex: "version",
        key: "version",
    },
    {
        title: "Formula QTY",
        dataIndex: "formulaqty",
        key: "formulaqty",
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
        title: "Use Int Batch No",
        dataIndex: "useintbatchno",
        key: "useintbatchno",
    },
    {
        title: "Use Ext Batch No",
        dataIndex: "useextbatchno",
        key: "useextbatchno",
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
        title: "Product Category Name",
        dataIndex: "prodcatname",
        key: "prodcatname",
    },
    {
        title: "Unit Name",
        dataIndex: "unitname",
        key: "unitname",
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
]

const columnsSubzona = [
    {
        title: 'Zona Name',
        dataIndex: 'zonaname',
        key: 'zonaname',
    },
    {
        title: 'Subzona Code',
        dataIndex: 'subzonacode',
        key: 'subzonacode',
    },
    {
        title: 'Subzona Name',
        dataIndex: 'subzonaname',
        key: 'subzonaname',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'ZIP Code',
        dataIndex: 'zipcode',
        key: 'zipcode',
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
    },
    {
        title: 'Latitude Longitude',
        dataIndex: 'latlong',
        key: 'latlong',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
]
