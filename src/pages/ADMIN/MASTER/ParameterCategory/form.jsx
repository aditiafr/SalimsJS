"use client";

import { Form, Input, Col, Row } from "antd";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import Checkbox from "antd/es/checkbox/Checkbox";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { useEffect, useState } from "react";
import { getParameterCategoryNextCode } from "../../../../Api/Master/getData";
import { ParameterCategoryMapToHttp } from "../../../../mapper/ParameterCategory";
import { postParameterCategory } from "../../../../Api/Master/postData";

const FormParameterCategory = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);  
  const [parameterCategoryCode, setParameterCategoryCode] = useState("");

  const fetchParameterCategoryNextCode = async () => {
    try {
      setLoading(true);
      const nextParameterCategoryCode = await getParameterCategoryNextCode();

      setParameterCategoryCode(nextParameterCategoryCode);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParameterCategoryNextCode();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ParameterCategoryCode: parameterCategoryCode });
  }, [parameterCategoryCode, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = ParameterCategoryMapToHttp(values);

      const response = await postParameterCategory(payload);
      messageApi.open({
        type: "success",
        content: response.data.message,
      });

      navigate("/master/parameter_category");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="PARAMETER CATEGORY"
          subtitle="form data a parameter category"
        />
      </div>
      <div className="w-full bg-white rounded-lg">
        <Form
          name="basic"
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row gutter={30} style={{ padding: "28px" }}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Code"
                name="ParameterCategoryCode"
                rules={[
                  {
                    required: false,
                    message: "Please input Code!",
                  },
                ]}
              >
                <Input maxLength={5} />
              </Form.Item>

              <Form.Item
                label="Name"
                name="ParameterCategoryName"
                rules={[
                  {
                    required: true,
                    message: "Please input Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Description" name="Description">
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item name="IsSuspend" valuePropName="checked" initialValue={false}>
                <Checkbox>Suspended</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <ButtonSubmit onReset={onReset} onLoading={loading} />
        </Form>
      </div>
    </>
  );
};

export default FormParameterCategory;
