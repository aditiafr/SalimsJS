import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { Col, Form, Input, Row } from "antd";
import FormLabourPar from "./LabourPar/form";
import { useEffect, useState } from "react";

const FormAdjustment = () => {
  const [form] = Form.useForm();
  const [labourCode, setLabourCode] = useState("");
  const [labourPar, setLabourPar] = useState([]);

  const onFinish = (values) => {
    console.log("Success:", values);
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
        <HeaderTitle title="ADJUSTMENT" subtitle="form data a adjustment" />
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
                label="Adjustment Number"
                name="ADNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your Adjustment Number!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Adjustment Date"
                name="ADDate"
                rules={[
                  {
                    required: true,
                    message: "Please input your Adjustment Date!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Description" name="Description">
                <Input.TextArea />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Warehouse Code"
                name="WarehouseCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your Warehouse Code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Location Code"
                name="LocationCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your Location Code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <div className="m-4 p-4 border rounded-md">
              <FormLabourPar onSaveData={(values) => setLabourPar(values)} />
            </div>
          </Row>
          <ButtonSubmit onReset={onReset} />
        </Form>
      </div>
    </>
  );
};

export default FormAdjustment;
