import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { PrefixGlobal } from '../../../../components/Dashboard/Global/Helper';
import InputModal from '../../../../components/Dashboard/Global/InputModal';
import { getBuilding, getManufacture, getProductCat, getUnit } from '../../../../Api/Master/getData';
import FormSampleParams from './Params/form';
import SampleParams from './Params';

const FormSample = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const prefix = PrefixGlobal();
    
    const dataParm = JSON.parse(localStorage.getItem('DataSampleParm')) || [];

    const [isLoading, setIsLoading] = useState(true);

    const [dataProdCat, setDataProdCat] = useState([]);
    const [selectProdCat, setSelectProdCat] = useState("");
    const [openProdCat, setOpenProdCat] = useState(null);
    const ProdCatName = selectProdCat ? selectProdCat.productcategoryname : '';
    const ProdCatCode = selectProdCat ? selectProdCat.productcategorycode : '';

    const [dataUnit, setDataUnit] = useState([]);
    const [selectUnit, setSelectUnit] = useState("");
    const [openUnit, setOpenUnit] = useState(null);
    const UnitName = selectUnit ? selectUnit.unitname : '';
    const UnitCode = selectUnit ? selectUnit.unitcode : '';

    const [dataBuilding, setDataBuilding] = useState([]);
    const [selectBuilding, setSelectBuilding] = useState("");
    const [openBuilding, setOpenBuilding] = useState(null);
    const BuildingName = selectBuilding ? selectBuilding.buildingname : '';
    const BuildingCode = selectBuilding ? selectBuilding.buildingcode : '';

    const [dataManufacture, setDataManufacture] = useState([]);
    const [selectManufacture, setSelectManufacture] = useState("");
    const [openManufacture, setOpenManufacture] = useState(null);
    const ManufactureName = selectManufacture ? selectManufacture.manufacturename : '';
    const ManufactureCode = selectManufacture ? selectManufacture.manufacturecode : '';


    // PRODUCT CATEGORY
    useEffect(() => {
        const fetchProdCat = async () => {
            try {
                const res = await getProductCat(false);
                const filter = res.map((item, row) => ({ ...item, key: row + 1 }));
                setDataProdCat(filter);
            } catch (error) {
                console.log(error);
            }
        }
        if (openProdCat) {
            fetchProdCat();
            setOpenProdCat(false);
            setIsLoading(false);
        }
    }, [openProdCat]);

    useEffect(() => {
        form.setFieldsValue(
            {
                productcatname: ProdCatName,
                unitname: UnitName,
                buildingname: BuildingName,
                manufacturename: ManufactureName
            }
        )
    }, [BuildingName, ManufactureName, ProdCatName, UnitName, form]);

    // UNIT
    useEffect(() => {
        const fetchUnit = async () => {
            try {
                const res = await getUnit();
                setDataUnit(res);
            } catch (error) {
                console.log(error);
            }
        }
        if (openUnit) {
            fetchUnit()
            setOpenUnit(false);
            setIsLoading(false);
        }
    }, [openUnit]);

    // BUILDING
    useEffect(() => {
        const fetchBuilding = async () => {
            try {
                const res = await getBuilding(false);
                const filter = res.map((item, row) => ({ ...item, key: row + 1 }));
                setDataBuilding(filter);
            } catch (error) {
                console.log(error);
            }
        }
        if (openBuilding) {
            fetchBuilding();
            setOpenBuilding(false);
            setIsLoading(false);
        }
    }, [openBuilding]);

    // MANUFACTURE
    useEffect(() => {
        const fetchManufacture = async () => {
            try {
                const res = await getManufacture(false);
                const filter = res.map((item, row) => ({ ...item, key: row + 1 }));
                setDataManufacture(filter);
            } catch (error) {
                console.log(error);
            }
        }
        if (openManufacture) {
            fetchManufacture();
            setOpenManufacture(false);
            setIsLoading(false);
        }
    }, [openManufacture]);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const payload = {
                ...values,
                prodcatcode: ProdCatCode,
                unitcode: UnitCode,
                buildingcode: BuildingCode,
                manufacturecode: ManufactureCode,
                tempcode: "MTC001",
            }
            console.log(payload);
        } catch (error) {
            message.error(error.response.data.message);
            console.log(error);
        }
        setLoading(false);
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <>
            <div className="flex justify-between items-center px-2 pb-4">
                <HeaderTitle title="SAMPLE" subtitle="form data a Sample" />
            </div>
            <div className="w-full bg-white rounded-lg">
                <Form
                    name="basic"
                    layout="vertical"
                    onFinish={handleSubmit}
                    autoComplete="off"
                    form={form}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 p-6">

                        <Form.Item
                            label="Sample Code"
                            name="samplecode"
                            rules={[
                                {
                                    validator: prefix,
                                },
                            ]}
                        >
                            <Input placeholder="Input Sample Code" maxLength={6} />
                        </Form.Item>

                        <Form.Item
                            label="Sample Name"
                            name="samplename"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Sample Name!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Sample Name" autoFocus />
                        </Form.Item>

                        <InputModal
                            title="PRODUCT CATEGORY"
                            label="Product Category"
                            name="productcatname"
                            dataSource={dataProdCat}
                            loading={isLoading}
                            columns={columnsProdCat}
                            onData={(values) => setSelectProdCat(values)}
                            onOpenModal={(values) => setOpenProdCat(values)}
                        />

                        <InputModal
                            title="UNIT"
                            label="Unit"
                            name="unitname"
                            dataSource={dataUnit}
                            loading={isLoading}
                            columns={columnsUnit}
                            onData={(values) => setSelectUnit(values)}
                            onOpenModal={(values) => setOpenUnit(values)}
                        />

                        <InputModal
                            title="BUILDING"
                            label="Building"
                            name="buildingname"
                            dataSource={dataBuilding}
                            loading={isLoading}
                            columns={columnsBuilding}
                            onData={(values) => setSelectBuilding(values)}
                            onOpenModal={(values) => setOpenBuilding(values)}
                        />

                        <InputModal
                            title="MANUFACTURE"
                            label="Manufacture"
                            name="manufacturename"
                            dataSource={dataManufacture}
                            loading={isLoading}
                            columns={columnsManufacture}
                            onData={(values) => setSelectManufacture(values)}
                            onOpenModal={(values) => setOpenManufacture(values)}
                        />

                        {/* <Form.Item
                            label="tempcode"
                            name="tempcode"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your tempcode!",
                                },
                            ]}
                        >
                            <Input placeholder="Input tempcode" />
                        </Form.Item> */}

                        <Form.Item
                            label="Formula QTY"
                            name="formulaqty"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Formula QTY!",
                                },
                            ]}
                        >
                            <InputNumber placeholder="Input Formula QTY" className="w-full" />
                        </Form.Item>

                        <Form.Item
                            label="Alias Name"
                            name="aliasname"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Alias Name!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Alias Name" />
                        </Form.Item>

                        <Form.Item
                            label="Shelf Life"
                            name="shelflife"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Shelf Life!",
                                },
                            ]}
                        >
                            <InputNumber placeholder="Input Shelf Life" className="w-full" />
                        </Form.Item>

                        {/* <Form.Item
                            label="Use Int Batch No"
                            name="useintbatchno"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Use Int Batch No!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Use Int Batch No" />
                        </Form.Item>

                        <Form.Item
                            label="Use Ext Batch No"
                            name="useextbatchno"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Use Ext Batch No!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Use Ext Batch No" />
                        </Form.Item> */}

                        <Form.Item
                            label="Unit Code Pack"
                            name="unitcodepack"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Unit Code Pack!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Unit Code Pack" />
                        </Form.Item>

                        <Form.Item
                            label="Formula QTY Pack"
                            name="formulaqtypack"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Formula QTY Pack!",
                                },
                            ]}
                        >
                            <InputNumber placeholder="Input Formula QTY Pack" className="w-full" />
                        </Form.Item>

                        <Form.Item label="Description" name="description">
                            <Input.TextArea placeholder="Input Description" />
                        </Form.Item>

                    </div>

                    <div className="m-4 p-4 border rounded-md">
                        <div className="flex justify-between">
                            <h1 className="text-2xl font-semibold my-2">Parameter</h1>
                            <Link to="parameter">
                                <Button type="primary">+ Add New</Button>
                            </Link>
                        </div>
                        <SampleParams dataSource={dataParm} />
                        {/* <FormSampleParams onSaveData={(values) => setSampleParams(values)} /> */}
                    </div>

                    <ButtonSubmit onReset={onReset} onLoading={loading} />

                </Form>
            </div>
        </>
    );
};

export default FormSample;

export const columnsProdCat = [
    {
        title: "Product Category Code",
        dataIndex: "productcategorycode",
        key: "productcategorycode",
    },
    {
        title: "Product Category Name",
        dataIndex: "productcategoryname",
        key: "productcategoryname",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "Description",
        render: (text) => (text ?? "N/A"),
    }
];

export const columnsUnit = [
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
        title: "Description",
        dataIndex: "description",
        key: "description",
    }
];


export const columnsBuilding = [
    {
        title: "Building Code",
        dataIndex: "buildingcode",
        key: "buildingcode",
        fixed: "left",
    },
    {
        title: "Building Name",
        dataIndex: "buildingname",
        key: "buildingname",
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 350,
    },
    {
        title: "Phone Number",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "Fax",
        dataIndex: "fax",
        key: "fax",
    },
    {
        title: "Contact Name",
        dataIndex: "contact",
        key: "contact",
    },
    {
        title: "Zip Code",
        dataIndex: "zipcode",
        key: "zipcode",
    },
    {
        title: "City",
        dataIndex: "city",
        key: "city",
    },
    {
        title: "Country",
        dataIndex: "country",
        key: "country",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    }
];

export const columnsManufacture = [
    {
        title: "Manufacture Code",
        dataIndex: "manufacturecode",
        key: "manufacturecode",
    },
    {
        title: "Manufacture Name",
        dataIndex: "manufacturename",
        key: "manufacturename",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    }
];
