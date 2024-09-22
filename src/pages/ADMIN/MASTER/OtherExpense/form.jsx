"use client";

import { Form, Input, Col, Row } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import Checkbox from "antd/es/checkbox/Checkbox";

const FormOtherExpense = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row gutter={30} style={{ padding: "28px" }}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Code"
                name="Code"
                rules={[
                  {
                    required: true,
                    message: "Please input your Code!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>

              <Form.Item
                label="Name"
                name="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
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
                  <Form.Item name="Suspended" valuePropName="checked" initialValue={false}>
                    <Checkbox>Suspended</Checkbox>
                  </Form.Item>
                </Col>
             </Row>
            </Col>
          </Row>
          <ButtonSubmit onReset={onReset} />
        </Form>
      </div>
    </>
  );
};

export default FormOtherExpense;
