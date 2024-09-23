import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { PrefixGlobal } from '../../../../components/Dashboard/Global/Helper';
import { getTestPreparationNextCode } from '../../../../Api/Master/getData';
import { postTestPreparation } from '../../../../Api/Master/postData';

const FormTestPreparation = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const prefix = PrefixGlobal();

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            let payload = values;
            if (!values.testpreparationid) {
                const nextCode = await getTestPreparationNextCode();
                const preparationid = nextCode.testpreparationid;
                form.setFieldsValue({ testpreparationid: preparationid });
                payload = {
                    ...payload,
                    testpreparationid: preparationid
                }
            }
            console.log(payload);
            const res = await postTestPreparation(payload);
            message.success(res.data.message);
            navigate('/master/test_preparation')
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
                <HeaderTitle title="TEST PREPARATION" subtitle="form data a Test Preparation" />
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
                            label="Test Preparation Id"
                            name="testpreparationid"
                            rules={[
                                {
                                    validator: prefix,
                                },
                            ]}
                        >
                            <Input placeholder="Input Test Preparation Id" maxLength={6} />
                        </Form.Item>

                        <Form.Item
                            label="Test Preparation Name"
                            name="testpreparationname"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Test Preparation Name!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Test Preparation Name" autoFocus />
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

export default FormTestPreparation;
