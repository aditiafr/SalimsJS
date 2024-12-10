import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { postTestMethod } from '../../../../Api/Master/postData';
import { PrefixGlobal } from '../../../../components/Dashboard/Global/Helper';

const FormTestMethod = () => {

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const prefix = PrefixGlobal();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values
      };
      console.log(payload);
      const response = await postTestMethod(payload);
      message.success(response.data.message);
      navigate("/master/test_methode");
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error);
    }
    setLoading(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleOnKeyPress = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TEST METHODE" subtitle="form data a test methode" />
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
              label="Method Id"
              name="methodid"
              rules={[
                {
                  validator: prefix,
                },
              ]}
            >
              <Input placeholder="Input Method Id" maxLength={6} />
            </Form.Item>

            <Form.Item
              label="Preservation"
              name="preservation"
              rules={[
                {
                  required: true,
                  message: "Please input your Preservation!",
                },
              ]}
            >
              <Input placeholder="Input Preservation" />
            </Form.Item>

            <Form.Item
              label="Storage Time Limit"
              name="storagetimelimit"
              rules={[
                {
                  required: true,
                  message: "Please input your Storage Time Limit!",
                },
              ]}
            >
              <Input placeholder="Input Storage Time Limit" onKeyPress={handleOnKeyPress} />
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

export default FormTestMethod;
