"use client";

import { Form, Input, Col, Row, Select, TimePicker } from "antd";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import Checkbox from "antd/es/checkbox/Checkbox";

const FormParameter = () => {
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

  const categories = [
    { label: "Solid", value: "Solid" },
    { label: "Liquid", value: "Liquid" },
    { label: "Gas", value: "Gas" },
  ];

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const formatToRupiah = (e) => {
    const { value } = e.target;
    let valueWithDigitOnly = parseInt(value.replace(/\D/g, "") || 0);
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(valueWithDigitOnly).replace("Rp ", "").replace(",00", "");

    form.setFieldsValue({ Price: formattedValue });
  }

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Parameter"
          subtitle="form data a parameter"
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
                label="Category"
                name="Category"
                rules={[
                  {
                    required: true,
                    message: "Please select Category!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select Category"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={categories}
                />
              </Form.Item>

              <Form.Item
                label="Price"
                name="Price"
              >
                <Input
                  type="text"
                  min={0}
                  addonBefore="Rp"
                  style={{ width: "100%" }}
                  onChange={formatToRupiah}
                />
              </Form.Item>

              <Form.Item
                label="Std Lead Time (HH:mm)"
                name="StdLeadTime"
              >
                <TimePicker 
                  format="HH:mm"
                  minuteStep={5}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Procedure No"
                name="ProcedureNo"
              >
                <Input />                
              </Form.Item>

              <Form.Item
                label="Procedure Name"
                name="ProcedureName"
              >
                <Input />
              </Form.Item>

              <Form.Item label="Description" name="Description">
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item name="Suspended" valuePropName="checked" initialValue={false}>
                <Checkbox>Suspended</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <ButtonSubmit onReset={onReset} />
        </Form>
      </div>
    </>
  );
};

export default FormParameter;
