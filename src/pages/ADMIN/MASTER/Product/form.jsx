import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { PrefixGlobal, selectedTranIdx } from '../../../../components/Dashboard/Global/Helper';
import { postProduct } from '../../../../Api/Master/postData';
import InputModal from '../../../../components/Dashboard/Global/InputModal';
import { getBuilding, getManufacture, getProductCat, getproductType, getUnit, getWarehouse } from '../../../../Api/Master/getData';
import { columnsBuilding, columnsManufacture, columnsProdCat, columnsProdType, columnsUnit, columnsWarehouse } from './columns';

const FormProduct = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const prefix = PrefixGlobal();

    const [isLoading, setIsLoading] = useState(false);

    const [dataProdType, setDataProdType] = useState([]);
    const [selectProdType, setSelectProdType] = useState("");
    const [openProdType, setOpenProdType] = useState(null);
    const ProdTypeName = selectProdType ? selectProdType.producttypename : '';
    const ProdTypeCode = selectProdType ? selectProdType.producttypecode : '';

    const [dataUnit, setDataUnit] = useState([]);
    const [selectUnit, setSelectUnit] = useState("");
    const [openUnit, setOpenUnit] = useState(null);
    const UnitName = selectUnit ? selectUnit.unitname : '';
    const UnitCode = selectUnit ? selectUnit.unitcode : '';

    const [dataWarehouse, setDataWarehouse] = useState([]);
    const [selectWarehouse, setSelectWarehouse] = useState("");
    const [openWarehouse, setOpenWarehouse] = useState(null);
    const WarehouseName = selectWarehouse ? selectWarehouse.warehousename : '';
    const WarehouseCode = selectWarehouse ? selectWarehouse.warehousecode : '';

    const [dataProdCat, setDataProdCat] = useState([]);
    const [selectProdCat, setSelectProdCat] = useState("");
    const [openProdCat, setOpenProdCat] = useState(null);
    const ProdCatName = selectProdCat ? selectProdCat.productcategoryname : '';
    const ProdCatCode = selectProdCat ? selectProdCat.productcategorycode : '';

    const [dataManufacture, setDataManufacture] = useState([]);
    const [selectManufacture, setSelectManufacture] = useState("");
    const [openManufacture, setOpenManufacture] = useState(null);
    const ManufactureName = selectManufacture ? selectManufacture.manufacturename : '';
    const ManufactureCode = selectManufacture ? selectManufacture.manufacturecode : '';

    const [dataBuilding, setDataBuilding] = useState([]);
    const [selectBuilding, setSelectBuilding] = useState("");
    const [openBuilding, setOpenBuilding] = useState(null);
    const BuildingName = selectBuilding ? selectBuilding.buildingname : '';
    const BuildingCode = selectBuilding ? selectBuilding.buildingcode : '';

    // PRODUCT TYPE
    useEffect(() => {
        const fetchProdType = async () => {
            try {
                setIsLoading(true);
                const res = await getproductType(false);
                const filter = res.map((item, row) => ({ ...item, key: row + 1 }));
                setDataProdType(filter);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }

        if (openProdType) {
            fetchProdType();
            setOpenProdType(false);
        }

    }, [openProdType]);

    // UNIT
    useEffect(() => {
        const fetchUnit = async () => {
            try {
                setIsLoading(true);
                const res = await getUnit();
                setDataUnit(res);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }
        if (openUnit) {
            fetchUnit()
            setOpenUnit(false);
        }
    }, [openUnit]);


    // WAREHOUSE
    useEffect(() => {
        const fetchWarehouse = async () => {
            try {
                setIsLoading(true);
                const res = await getWarehouse(false);
                const filter = res.map((item, row) => ({ ...item, key: row + 1 }));
                setDataWarehouse(filter);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        if (openWarehouse) {
            fetchWarehouse();
            setOpenWarehouse(false);
        }
    }, [openWarehouse]);

    // PRODUCT CATEGORY
    useEffect(() => {
        const fetchProdCat = async () => {
            try {
                setIsLoading(true);
                const res = await getProductCat(false);
                const filter = res.map((item, row) => ({ ...item, key: row + 1 }));
                setDataProdCat(filter);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }
        if (openProdCat) {
            fetchProdCat();
            setOpenProdCat(false);
        }
    }, [openProdCat]);

    // MANUFACTURE
    useEffect(() => {
        const fetchManufacture = async () => {
            try {
                setIsLoading(true);
                const res = await getManufacture(false);
                const filter = res.map((item, row) => ({ ...item, key: row + 1 }));
                setDataManufacture(filter);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }
        if (openManufacture) {
            fetchManufacture();
            setOpenManufacture(false);
        }
    }, [openManufacture]);

    // BUILDING
    useEffect(() => {
        const fetchBuilding = async () => {
            try {
                setIsLoading(true);
                const res = await getBuilding(false);
                const filter = res.map((item, row) => ({ ...item, key: row + 1 }));
                setDataBuilding(filter);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }
        if (openBuilding) {
            fetchBuilding();
            setOpenBuilding(false);
        }
    }, [openBuilding]);


    useEffect(() => {
        form.setFieldsValue(
            {
                producttypename: ProdTypeName,
                unitname: UnitName,
                warehousename: WarehouseName,
                productcategoryname: ProdCatName,
                manufacturename: ManufactureName,
                buildingname: BuildingName
            }
        );
    }, [BuildingName, ManufactureName, ProdCatName, ProdTypeName, UnitName, WarehouseName, form]);


    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const payload = {
                ...values,
                tranidx: selectedTranIdx,
                branchcode: "0001",
                prodtypecode: ProdTypeCode,
                unitcode: UnitCode,
                tempcode: "MTC001",
                warehousecode: WarehouseCode,
                prodcatcode: ProdCatCode,
                manufacturecode: ManufactureCode,
                buildingcode: BuildingCode,
                unitcodepack: "",
            }
            // console.log(payload);
            const res = await postProduct(payload);
            message.success(res.data.message);
            navigate('/master/product');
        } catch (error) {
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
                <HeaderTitle title="PRODUCT" subtitle="form data a Product" />
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
                            label="Product Code"
                            name="prodcode"
                            rules={[
                                {
                                    validator: prefix,
                                },
                            ]}
                        >
                            <Input placeholder="Input Product Code" maxLength={6} />
                        </Form.Item>

                        <Form.Item
                            label="Product Name"
                            name="prodname"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Product Name!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Product Name" autoFocus />
                        </Form.Item>

                        <InputModal
                            title="PRODUCT TYPE"
                            label="Product Type"
                            name="producttypename"
                            dataSource={dataProdType}
                            loading={isLoading}
                            columns={columnsProdType}
                            onData={(values) => setSelectProdType(values)}
                            onOpenModal={(values) => setOpenProdType(values)}
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

                        <Form.Item
                            label="Formula QTY (Num)"
                            name="formulaqty"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Formula QTY!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Formula QTY" />
                        </Form.Item>

                        <InputModal
                            title="WAREHOUSE"
                            label="Warehouse"
                            name="warehousename"
                            dataSource={dataWarehouse}
                            loading={isLoading}
                            columns={columnsWarehouse}
                            onData={(values) => setSelectWarehouse(values)}
                            onOpenModal={(values) => setOpenWarehouse(values)}
                        />

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

                        <InputModal
                            title="PRODUCT CATEGORY"
                            label="Product Category"
                            name="productcategoryname"
                            dataSource={dataProdCat}
                            loading={isLoading}
                            columns={columnsProdCat}
                            onData={(values) => setSelectProdCat(values)}
                            onOpenModal={(values) => setOpenProdCat(values)}
                        />

                        <Form.Item
                            label="Shelf Life (Num)"
                            name="shelflife"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Shelf Life!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Shelf Life" />
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
                            title="BUILDING"
                            label="Building"
                            name="buildingname"
                            dataSource={dataBuilding}
                            loading={isLoading}
                            columns={columnsBuilding}
                            onData={(values) => setSelectBuilding(values)}
                            onOpenModal={(values) => setOpenBuilding(values)}
                        />

                        <Form.Item
                            label="Min Stock"
                            name="minstock"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Min Stock!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Min Stock" />
                        </Form.Item>

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
                            label="Formula QTY Pack (num)"
                            name="formulaqtypack"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Formula QTY Pack!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Formula QTY Pack" />
                        </Form.Item>

                        <Form.Item label="Description" name="description" className="lg:col-span-2">
                            <Input.TextArea placeholder="Input Description" />
                        </Form.Item>

                    </div>

                    <ButtonSubmit onReset={onReset} onLoading={loading} />

                </Form>
            </div>
        </>
    );
};

export default FormProduct;
