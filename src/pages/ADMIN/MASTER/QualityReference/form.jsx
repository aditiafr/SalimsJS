import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { PrefixGlobal, selectedTranIdx } from '../../../../components/Dashboard/Global/Helper';
import FormDetailQualityReference from './Detail/form';
import InputModal from '../../../../components/Dashboard/Global/InputModal';
import { getProductCat } from '../../../../Api/Master/getData';
import { postQualityReference } from '../../../../Api/Master/postData';
import { columnsProdCat } from './columnsModal';

const FormQualityReference = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const prefix = PrefixGlobal();

    const [isLoading, setIsLoading] = useState(true);
    const [dataProductCategory, setDataProductCategory] = useState([]);
    const [selectProductCategory, setSelectProductCategory] = useState("");
    const [openProductCategory, setOpenProductCategory] = useState(null);
    const ProductCategoryName = selectProductCategory ? selectProductCategory.productcategoryname : '';
    const ProductCategoryCode = selectProductCategory ? selectProductCategory.productcategorycode : '';

    const [detailForm, setDetailForm] = useState([]);


    // PRODUCT CATEGORY
    useEffect(() => {
        const fetchProdCat = async () => {
            try {
                const res = await getProductCat();
                setDataProductCategory(res);
            } catch (error) {
                console.log(error);
            }
        }

        if (openProductCategory) {
            fetchProdCat();
            setOpenProductCategory(false);
            setIsLoading(false);
        }

    }, [openProductCategory]);

    useEffect(() => {
        form.setFieldsValue({
            ProductCategoryName: ProductCategoryName
        })
    }, [ProductCategoryName, form]);


    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const payload = {
                ...values,
                tranidx: selectedTranIdx,
                prodcatcode: ProductCategoryCode,
                detail: detailForm,
            }
            console.log(payload);
            
            const res = await postQualityReference(payload);
            message.success(res.data.message);
            navigate("/master/quality_reference")
        } catch (error) {
            message.error(error.response.data.message);
            console.log(error);
        }
        setLoading(false);
    }

    const onReset = () => {
        form.resetFields();
    };

    return (
        <>
            <div className="flex justify-between items-center px-2 pb-4">
                <HeaderTitle title="QUALITY REFERENCE" subtitle="form data a Quality Reference" />
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
                            label="Quality Reference Id"
                            name="qrid"
                        // rules={[
                        //     {
                        //         validator: prefix,
                        //     },
                        // ]}
                        >
                            <Input placeholder="Input Quality Reference Id" maxLength={6} />
                        </Form.Item>

                        <Form.Item
                            label="Quality Reference Name"
                            name="qrname"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Quality Reference Name!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Quality Reference Name" autoFocus />
                        </Form.Item>

                        <InputModal
                            title="PRODUCT CATEGORY"
                            label="Product Category"
                            name="ProductCategoryName"
                            dataSource={dataProductCategory}
                            loading={isLoading}
                            columns={columnsProdCat}
                            onData={(values) => setSelectProductCategory(values)}
                            onOpenModal={(values) => setOpenProductCategory(values)}
                        />

                        <Form.Item
                            label="Reference Value Quality"
                            name="refvalueqty"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Reference Value Quality!",
                                },
                            ]}
                        >
                            <InputNumber min={0} placeholder="Input Reference Value Quality" className="w-full" />
                        </Form.Item>

                        <Form.Item label="Description" name="description" className="lg:col-span-2">
                            <Input.TextArea placeholder="Input Description" />
                        </Form.Item>

                    </div>

                    <div className="m-4 p-4 border rounded-md">
                        <FormDetailQualityReference onSaveData={(values) => setDetailForm(values)} />
                    </div>

                    <ButtonSubmit onReset={onReset} onLoading={loading} />

                </Form>
            </div>
        </>
    );
};

export default FormQualityReference;
