import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { PrefixGlobal, selectedTranIdx } from '../../../../components/Dashboard/Global/Helper';
import InputModal from '../../../../components/Dashboard/Global/InputModal';
import { getBuilding, getManufacture, getProductCat, getTempCondition, getUnit } from '../../../../Api/Master/getData';
import FormSampleParameter from './Params/form';
import { postSample } from '../../../../Api/Master/postData';

const FormSample = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const prefix = PrefixGlobal();

    const [isLoading, setIsLoading] = useState(true);

    const [dataProdCat, setDataProdCat] = useState([]);
    const [selectProdCat, setSelectProdCat] = useState("");
    const [openProdCat, setOpenProdCat] = useState(null);
    const ProdCatCode = selectProdCat ? selectProdCat.productcategorycode : '';
    const ProdCatName = selectProdCat ? selectProdCat.productcategoryname : '';

    const [dataUnit, setDataUnit] = useState([]);
    const [selectUnit, setSelectUnit] = useState("");
    const [openUnit, setOpenUnit] = useState(null);
    const UnitCode = selectUnit ? selectUnit.unitcode : '';
    const UnitName = selectUnit ? selectUnit.unitname : '';

    const [dataBuilding, setDataBuilding] = useState([]);
    const [selectBuilding, setSelectBuilding] = useState("");
    const [openBuilding, setOpenBuilding] = useState(null);
    const BuildingCode = selectBuilding ? selectBuilding.buildingcode : '';
    const BuildingName = selectBuilding ? selectBuilding.buildingname : '';

    const [dataManufacture, setDataManufacture] = useState([]);
    const [selectManufacture, setSelectManufacture] = useState("");
    const [openManufacture, setOpenManufacture] = useState(null);
    const ManufactureCode = selectManufacture ? selectManufacture.manufacturecode : '';
    const ManufactureName = selectManufacture ? selectManufacture.manufacturename : '';

    const [dataUnitPack, setDataUnitPack] = useState([]);
    const [selectUnitPack, setSelectUnitPack] = useState("");
    const [openUnitPack, setOpenUnitPack] = useState(null);
    const UnitPackCode = selectUnitPack ? selectUnitPack.unitcode : '';
    const UnitPackName = selectUnitPack ? selectUnitPack.unitname : '';

    const [dataTemp, setDataTemp] = useState([]);
    const [selectTemp, setSelectTemp] = useState("");
    const [openTemp, setOpenTemp] = useState(null);
    const TempCode = selectTemp ? selectTemp.tempcode : '';
    const TempName = selectTemp ? selectTemp.tempname : '';

    const [dataSampleParameter, setDataSampleParameter] = useState([]);


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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openProdCat]);


    // UNIT
    useEffect(() => {
        const fetchUnit = async () => {
            try {
                const res = await getUnit(false);
                setDataUnit(res);
                setDataUnitPack(res);


            } catch (error) {
                console.log(error);
            }
        }
        if (openUnit || openUnitPack) {
            fetchUnit()
            setOpenUnit(false);
            setOpenUnitPack(false);
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openUnit, openUnitPack]);


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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openManufacture]);


    // TEMP CONDITION
    useEffect(() => {
        const fetchTemp = async () => {
            try {
                const res = await getTempCondition(false);
                setDataTemp(res);

            } catch (error) {
                console.log(error);
            }
        }

        if (openTemp) {
            fetchTemp();
            setOpenTemp(false);
            setIsLoading(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openTemp]);



    useEffect(() => {
        form.setFieldsValue(
            {
                productcatname: ProdCatName,
                unitname: UnitName,
                buildingname: BuildingName,
                manufacturename: ManufactureName,
                tempname: TempName,
                unitcodepack: UnitPackName,
            }
        )
    }, [BuildingName, ManufactureName, ProdCatName, TempName, UnitName, UnitPackName, form]);


    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const payload = {
                ...values,
                tranidx: selectedTranIdx,
                branchcode: "0001",
                user: "admin",
                prodcatcode: ProdCatCode,
                unitcode: UnitCode,
                buildingcode: BuildingCode,
                manufacturecode: ManufactureCode,
                tempcode: TempCode,
                unitcodepack: UnitPackCode,
                useextbatchno: false,
                useintbatchno: false,
                sample_pa: dataSampleParameter,
            }
            console.log(payload);
            const res = await postSample();
            console.log(res);
            
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

                        <InputModal
                            title="TEMP CONDITION"
                            label="Temp Condition"
                            name="tempname"
                            dataSource={dataTemp}
                            loading={isLoading}
                            columns={columnsTemp}
                            onData={(values) => setSelectTemp(values)}
                            onOpenModal={(values) => setOpenTemp(values)}
                        />

                        <Form.Item
                            label="Formula Quantity"
                            name="formulaqty"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Formula Quantity!",
                                },
                            ]}
                        >
                            <InputNumber placeholder="Input Formula Quantity" className="w-full" />
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

                        <InputModal
                            title="UNIT PACK"
                            label="Unit Pack"
                            name="unitcodepack"
                            dataSource={dataUnitPack}
                            loading={isLoading}
                            columns={columnsUnit}
                            onData={(values) => setSelectUnitPack(values)}
                            onOpenModal={(values) => setOpenUnitPack(values)}
                        />

                        <Form.Item
                            label="Formula Quantity Pack"
                            name="formulaqtypack"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Formula Quantity Pack!",
                                },
                            ]}
                        >
                            <InputNumber placeholder="Input Formula Quantity Pack" className="w-full" />
                        </Form.Item>

                        <Form.Item label="Description" name="description" className="lg:col-span-2">
                            <Input.TextArea placeholder="Input Description" />
                        </Form.Item>

                    </div>

                    <div className="m-4 p-4 border rounded-md">
                        <FormSampleParameter
                            onSaveData={(values) => setDataSampleParameter(values)}
                        />
                    </div>

                    <ButtonSubmit onReset={onReset} onLoading={loading} />

                </Form >
            </div >
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


const columnsTemp = [
    {
        title: "Temp Code",
        dataIndex: "tempcode",
        key: "tempcode",
    },
    {
        title: "Temp Name",
        dataIndex: "tempname",
        key: "tempname",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
]
