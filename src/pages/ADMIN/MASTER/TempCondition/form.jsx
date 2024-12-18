import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { postBuilding } from '../../../../Api/Master/postData';

const FormTempCondition = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const payload = values;

            const response = await postBuilding(payload);
            message.success(response.data.message);
            navigate("/master/building");
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
                <HeaderTitle title="TEMPCONDITION" subtitle="form data a Temp Condition" />
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
                            label="TempCondition Code"
                            name="buildingcode"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please input your Building Code!",
                        //   },
                        // ]}
                        >
                            <Input placeholder="Input TempCondition Code" maxLength={6} />
                        </Form.Item>

                        <Form.Item
                            label="TempCondition Name"
                            name="buildingname"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Building Name!",
                                },
                            ]}
                        >
                            <Input placeholder="Input TempCondition Name" autoFocus />
                        </Form.Item>

                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Address!",
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="Input Address" />
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[
                                { required: true, message: "Please input your Phone Number!" },
                                {
                                    pattern: /^[0-9]+$/,
                                    message: "Please input numbers only!",
                                },
                                // {
                                //   min: 10,
                                //   max: 13,
                                //   message: "Phone number must be between 10 and 13 digits!",
                                // },
                            ]}
                        >
                            <Input
                                type="tel"
                                placeholder="Input Phone Number Example(08123456789)"
                                maxLength={13}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Fax"
                            name="fax"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Fax!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Fax" />
                        </Form.Item>

                        <Form.Item
                            label="Contact Name"
                            name="contact"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Contact Name!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Contact Name" />
                        </Form.Item>

                        <Form.Item
                            label="ZIP Code"
                            name="zipcode"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your ZIP Code!",
                                },
                            ]}
                        >
                            <Input placeholder="Input ZIP Code" maxLength={5} />
                        </Form.Item>

                        <Form.Item
                            label="City"
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your City!",
                                },
                            ]}
                        >
                            <Input placeholder="Input City" />
                        </Form.Item>

                        <Form.Item
                            label="Country"
                            name="country"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Country!",
                                },
                            ]}
                        >
                            <Input placeholder="Input Country" />
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

export default FormTempCondition;
