import { EditFilled } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import SwitchComponent from "../../../../components/Dashboard/Global/SwitchComponent";
import InputModal from "../../../../components/Dashboard/Global/InputModal";
import { getBuilding, getManufacture, getProductCat, getproductType, getUnit, getWarehouse } from "../../../../Api/Master/getData";
import { columnsBuilding, columnsManufacture, columnsProdCat, columnsProdType, columnsUnit, columnsWarehouse } from "./columns";
import { selectedTranIdx } from "../../../../components/Dashboard/Global/Helper";
import { updateProduct } from "../../../../Api/Master/updateData";

const EditProduct = ({ dataSource, onEdit }) => {

    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSuspend, setIsSuspend] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [dataProdType, setDataProdType] = useState([]);
    const [selectProdType, setSelectProdType] = useState("");
    const ProdTypeName = selectProdType ? selectProdType.producttypename : '';
    const ProdTypeCode = selectProdType ? selectProdType.producttypecode : '';

    const [dataUnit, setDataUnit] = useState([]);
    const [selectUnit, setSelectUnit] = useState("");
    const UnitName = selectUnit ? selectUnit.unitname : '';
    const UnitCode = selectUnit ? selectUnit.unitcode : '';

    const [dataWarehouse, setDataWarehouse] = useState([]);
    const [selectWarehouse, setSelectWarehouse] = useState("");
    const WarehouseName = selectWarehouse ? selectWarehouse.warehousename : '';
    const WarehouseCode = selectWarehouse ? selectWarehouse.warehousecode : '';

    const [dataProdCat, setDataProdCat] = useState([]);
    const [selectProdCat, setSelectProdCat] = useState("");
    const ProdCatName = selectProdCat ? selectProdCat.productcategoryname : '';
    const ProdCatCode = selectProdCat ? selectProdCat.productcategorycode : '';

    const [dataManufacture, setDataManufacture] = useState([]);
    const [selectManufacture, setSelectManufacture] = useState("");
    const ManufactureName = selectManufacture ? selectManufacture.manufacturename : '';
    const ManufactureCode = selectManufacture ? selectManufacture.manufacturecode : '';

    const [dataBuilding, setDataBuilding] = useState([]);
    const [selectBuilding, setSelectBuilding] = useState("");
    const BuildingName = selectBuilding ? selectBuilding.buildingname : '';
    const BuildingCode = selectBuilding ? selectBuilding.buildingcode : '';

    // PRODUCT TYPE
    useEffect(() => {
        const fetchProdType = async () => {
            try {
                setIsLoading(true);
                const res = await getproductType();
                const filter = res.map((item, row) => ({ ...item, key: row + 1 }));
                setDataProdType(filter);

                const selected = res.filter((item) => item.producttypecode === dataSource.prodtypecode);
                setSelectProdType(selected[0]);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }

        if (isModalOpen) {
            fetchProdType();
        }

    }, [dataSource.prodtypecode, isModalOpen]);

    // UNIT
    useEffect(() => {
        const fetchUnit = async () => {
            try {
                setIsLoading(true);
                const res = await getUnit();
                setDataUnit(res);

                const selected = res.filter((item) => item.unitcode === dataSource.unitcode);
                setSelectUnit(selected[0]);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }
        if (isModalOpen) {
            fetchUnit()
        }
    }, [dataSource.unitcode, isModalOpen]);


    // WAREHOUSE
    useEffect(() => {
        const fetchWarehouse = async () => {
            try {
                setIsLoading(true);
                const res = await getWarehouse();
                const filter = res.map((item, row) => ({ ...item, key: row + 1 }));
                setDataWarehouse(filter);

                const selected = res.filter((item) => item.warehousecode = dataSource.warehousecode);
                setSelectWarehouse(selected[0]);
                // console.log("selected warehouse", selected);

            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        if (isModalOpen) {
            fetchWarehouse();
        }
    }, [dataSource.warehousecode, isModalOpen]);

    // PRODUCT CATEGORY
    useEffect(() => {
        const fetchProdCat = async () => {
            try {
                setIsLoading(true);
                const res = await getProductCat(false);
                const filter = res.map((item, row) => ({ ...item, key: row + 1 }));
                setDataProdCat(filter);

                const selected = res.filter((item) => item.productcategorycode = dataSource.prodcatcode);
                setSelectProdCat(selected[0]);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }
        if (isModalOpen) {
            fetchProdCat();
        }
    }, [dataSource.prodcatcode, isModalOpen]);

    // MANUFACTURE
    useEffect(() => {
        const fetchManufacture = async () => {
            try {
                setIsLoading(true);
                const res = await getManufacture(false);
                const filter = res.map((item, row) => ({ ...item, key: row + 1 }));
                setDataManufacture(filter);

                const selected = res.filter((item) => item.manufacturecode === dataSource.manufacturecode);
                setSelectManufacture(selected[0]);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }
        if (isModalOpen) {
            fetchManufacture();
        }
    }, [dataSource.manufacturecode, isModalOpen]);

    // BUILDING
    useEffect(() => {
        const fetchBuilding = async () => {
            try {
                setIsLoading(true);
                const res = await getBuilding(false);
                const filter = res.map((item, row) => ({ ...item, key: row + 1 }));
                setDataBuilding(filter);

                const selected = res.filter((item) => item.buildingcode === dataSource.buildingcode);
                setSelectBuilding(selected[0]);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }
        if (isModalOpen) {
            fetchBuilding();
        }
    }, [dataSource.buildingcode, isModalOpen]);


    useEffect(() => {
        form.setFieldsValue(
            {
                ...dataSource,
                producttypecode: ProdTypeName,
                unitcode: UnitName,
                warehousecode: WarehouseName,
                productcategorycode: ProdCatName,
                manufacturecode: ManufactureName,
                buildingcode: BuildingName,
            }
        );
    }, [BuildingName, ManufactureName, ProdCatName, ProdTypeName, UnitName, WarehouseName, dataSource, form]);


    const handleSwitchChange = (checked) => {
        setIsSuspend(checked);
        form.setFieldsValue(
            {
                ...dataSource,
                producttypecode: ProdTypeName,
                unitcode: UnitName,
                warehousecode: WarehouseName,
                productcategorycode: ProdCatName,
                manufacturecode: ManufactureName,
                buildingcode: BuildingName,
            }
        );
    };

    const showModal = () => {
        setIsModalOpen(true);
        setIsSuspend(dataSource.issuspend);
    };

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const payload = {
                ...values,
                issuspend: isSuspend,
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
            const response = await updateProduct(payload);
            message.success(response.data.message);
            onEdit(true);
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const onReset = () => {
        form.setFieldsValue(dataSource);
        setIsSuspend(dataSource.Issuspend);
        setIsModalOpen(false);
    };

    return (
        <>
            <Tooltip title="Edit">
                <Button icon={<EditFilled />} type="text" onClick={showModal} />
            </Tooltip>

            <Modal
                title={
                    <div className="flex justify-between items-center">
                        <HeaderTitle title="PRODUCT" subtitle="Edit data a Product" />
                        <SwitchComponent
                            isSuspend={isSuspend}
                            handleSwitchChange={handleSwitchChange}
                        />
                    </div>
                }
                centered
                open={isModalOpen}
                closable={false}
                width={1000}
                styles={{
                    body: {
                        maxHeight: "70vh",
                        overflow: "auto",
                    },
                }}
                footer={false}
            >
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
                        >
                            <Input placeholder="Input Product Code" disabled />
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
                            name="producttypecode"
                            dataSource={dataProdType}
                            loading={isLoading}
                            columns={columnsProdType}
                            onData={(values) => setSelectProdType(values)}
                            onEdit={selectProdType}
                        />

                        <InputModal
                            title="UNIT"
                            label="Unit"
                            name="unitcode"
                            dataSource={dataUnit}
                            loading={isLoading}
                            columns={columnsUnit}
                            onData={(values) => setSelectUnit(values)}
                            onEdit={selectUnit}
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
                            name="warehousecode"
                            dataSource={dataWarehouse}
                            loading={isLoading}
                            columns={columnsWarehouse}
                            onData={(values) => setSelectWarehouse(values)}
                            onEdit={selectWarehouse}
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
                            name="productcategorycode"
                            dataSource={dataProdCat}
                            loading={isLoading}
                            columns={columnsProdCat}
                            onData={(values) => setSelectProdCat(values)}
                            onEdit={selectProdCat}
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

                        <InputModal
                            title="MANUFACTURE"
                            label="Manufacture"
                            name="manufacturecode"
                            dataSource={dataManufacture}
                            loading={isLoading}
                            columns={columnsManufacture}
                            onData={(values) => setSelectManufacture(values)}
                            onEdit={selectManufacture}
                        />

                        <InputModal
                            title="BUILDING"
                            label="Building"
                            name="buildingcode"
                            dataSource={dataBuilding}
                            loading={isLoading}
                            columns={columnsBuilding}
                            onData={(values) => setSelectBuilding(values)}
                            onEdit={selectBuilding}
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
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: "Please input your Unit Code Pack!",
                        //     },
                        // ]}
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

                    <ButtonEdit onReset={onReset} onLoading={loading} />
                </Form>
            </Modal >
        </>
    );
};

export default EditProduct;
