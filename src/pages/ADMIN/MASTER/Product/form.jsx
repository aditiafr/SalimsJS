import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { PrefixGlobal, selectedTranIdx } from '../../../../components/Dashboard/Global/Helper';
import { postProduct } from '../../../../Api/Master/postData';

const FormProduct = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const prefix = PrefixGlobal();

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const payload = {
                ...values,
                branchcode: "0001",
                tranidx: selectedTranIdx,
                tempcode: "MTE001"
            }
            console.log(payload);
            const res = await postProduct(payload);
            message.success(res.data.message);
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

                        <Form.Item
                            label="Product Type Code"
                            name="prodtypecode"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Product Type Code!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Product Type Code" />
                        </Form.Item>

                        <Form.Item
                            label="Unit Code"
                            name="unitcode"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Unit Code!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Unit Code" />
                        </Form.Item>

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
                            <Input placeholder="Input Formula QTY" />
                        </Form.Item>

                        <Form.Item
                            label="Warehouse Code"
                            name="warehousecode"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Warehouse Code!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Warehouse Code" />
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
                            label="Product Category Code"
                            name="prodcatcode"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Product Category Code!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Product Category Code" />
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
                            <Input placeholder="Input Shelf Life" />
                        </Form.Item>

                        <Form.Item
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
                        </Form.Item>

                        <Form.Item
                            label="Manufacture Code"
                            name="manufacturecode"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Manufacture Code!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Manufacture Code" />
                        </Form.Item>

                        <Form.Item
                            label="Building Code"
                            name="buildingcode"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Building Code!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Building Code" />
                        </Form.Item>

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
                            label="Formula QTY Pack"
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

                        <Form.Item label="Description" name="description">
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
