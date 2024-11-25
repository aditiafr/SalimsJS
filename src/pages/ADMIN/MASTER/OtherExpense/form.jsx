"use client";

import { Form, Input, Col, Row } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import Checkbox from "antd/es/checkbox/Checkbox";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { useEffect, useState } from "react";
import { getOtherExpenseNextCode } from "../../../../Api/Master/getData";
import { OtherExpenseMapToHttp } from "../../../../mapper/OtherExpense";
import { postOtherExpense } from "../../../../Api/Master/postData";

const FormOtherExpense = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);
  const [otherExpenseCode, setOtherExpenseCode] = useState("");

  const fetchOtherExpenseNextCode = async () => {
    try {
      setLoading(true);
      const nextOtherExpenseCode = await getOtherExpenseNextCode();

      setOtherExpenseCode(nextOtherExpenseCode);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOtherExpenseNextCode();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ OtherExpenseCode: otherExpenseCode });
  }, [otherExpenseCode, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = OtherExpenseMapToHttp(values);

      const response = await postOtherExpense(payload);
      messageApi.open({
        type: "success",
        content: response.data.message,
      });

      navigate("/master/other_expense");
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

  const formatToRupiah = (e) => {
    const { value } = e.target;
    let valueWithDigitOnly = parseInt(value.replace(/\D/g, "") || 0);
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(valueWithDigitOnly).replace("Rp ", "").replace(",00", "");

    form.setFieldsValue({ DefaultValue: formattedValue });
  }

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="OTHER EXPENSE"
          subtitle="form data a other expense"
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
                name="OtherExpenseCode"
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
                name="OtherExpenseName"
                rules={[
                  {
                    required: true,
                    message: "Please input Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              
              <Form.Item
                label="Default Value"
                name="DefaultValue"
              >
                <Input
                  type="text"
                  min={0}
                  addonBefore="Rp"
                  style={{ width: "100%" }}
                  onChange={formatToRupiah}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Description" name="Description">
                <Input.TextArea rows={7} />
              </Form.Item>

              <Row gutter={30} style={{ margin: "0px" }}>
                <Col xs={24} sm={12}>
                  <Form.Item name="IsDefaultTakingSample" valuePropName="checked" initialValue={false}>
                    <Checkbox>Default Taking Sample</Checkbox>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item name="IsSuspend" valuePropName="checked" initialValue={false}>
                    <Checkbox>Suspended</Checkbox>
                  </Form.Item>
                </Col>
             </Row>
            </Col>
          </Row>
          <ButtonSubmit onReset={onReset} onLoading={loading} />
        </Form>
      </div>
    </>
  );
};

export default FormOtherExpense;
