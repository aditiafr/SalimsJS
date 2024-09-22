import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { PrefixGlobal } from '../../../../components/Dashboard/Global/Helper';
import { getManufactureNextCode } from '../../../../Api/Master/getData';
import { postManufacture } from '../../../../Api/Master/postData';

const FormManufacture = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const prefix = PrefixGlobal();
    const [loading, setLoading] = useState(false);
    const [manufactureCode, setManufactureCode] = useState([]);

    useEffect(() => {
        const fetchNextCode = async () => {
            try {
                const res = await getManufactureNextCode();
                setManufactureCode(res.manufacturecode);
            } catch (error) {
                console.log(error);
            }
        }
        fetchNextCode();
    }, []);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            let payload = values;
            if (!values.manufacturecode) {
                form.setFieldsValue({ manufacturecode: manufactureCode });
                payload = {
                    ...payload,
                    manufacturecode: manufactureCode
                }
            }
            const response = await postManufacture(payload);
            message.success(response.data.message);
            navigate("/master/manufacture");
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
                <HeaderTitle title="MANUFACTURE" subtitle="form data a manufacture" />
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
                            label="Manufacture Code"
                            name="manufacturecode"
                            rules={[
                                {
                                    validator: prefix,
                                },
                            ]}
                        >
                            <Input placeholder="Input Manufacture Code" maxLength={6} />
                        </Form.Item>

                        <Form.Item
                            label="Manufacture Name"
                            name="manufacturename"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Manufacture Name!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Manufacture Name" autoFocus />
                        </Form.Item>

                        <Form.Item label="Description" name="description" className="col-span-2">
                            <Input.TextArea placeholder="Input Description" />
                        </Form.Item>

                    </div>

                    <ButtonSubmit onReset={onReset} onLoading={loading} />

                </Form>
            </div>
        </>
    );
};

export default FormManufacture;
