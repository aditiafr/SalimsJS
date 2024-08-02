"use client";

import { Form, Input, Col, Row, Button, Radio } from "antd";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import Checkbox from "antd/es/checkbox/Checkbox";
import { SearchOutlined } from "@ant-design/icons";
import EditableTable from "../../../../components/Dashboard/Global/Table/EditableTable";

const FormFormula = () => {
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

  form.setFieldsValue({
    SimResult: 34.123,
  });

  const formulaParametercolumns = [
    {
      title: 'Parameter',
      dataIndex: 'parameter',
      width: '30%',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '60%',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) =>
        record ? (
          <Button
            type="primary"
            onClick={() => {
              console.log("clicked");
            }}
          >
            Copy
          </Button>
        ) : null,
    },
  ];

  const formulaParameterdata = [
    {
      key: '0',
      parameter: '#GI_E01',
      description: 'Faktor Pengecekan',
    },
    {
      key: '1',
      parameter: '#GI_E02',
      description: 'N Tiosufate',
    },
    {
      key: '2',
      parameter: '@ms@',
      description: 'Masa Sample (gr)',
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Formula"
          subtitle="form data a formula"
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
                label="Branch"
                name="Branch"
                rules={[
                  {
                    required: true,
                    message: "Please input your Branch!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>
              
              <Form.Item
                label="Version"
                name="Version"
                rules={[
                 
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>
              
              
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
                  <Row gutter={30}>
                    <Col xs={24} sm={12}>
                      <Input maxLength={20} />
                    </Col>
                    <Col xs={24} sm={12}>
                      <Button
                        type="primary"
                        onClick={() => {
                          console.log("clicked");
                        }}
                      >
                        <SearchOutlined />
                        Copy Formula
                      </Button>
                    </Col> 
                  </Row>
                </Form.Item>
            
                <Row gutter={30}>
                  <Col xs={24} sm={12}>
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
                      <Input maxLength={20} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} style={{ marginTop: "30px" }}>
                    <Form.Item name="IsNumeric" valuePropName="checked" initialValue={false}>
                      <Checkbox>Is Numeric</Checkbox>
                    </Form.Item>
                  </Col>
              </Row>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Description" name="Description">
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item name="Suspended" valuePropName="checked" initialValue={false}>
                <Checkbox>Suspend</Checkbox>
              </Form.Item>

              <Form.Item name="IsCompareSpec" valuePropName="checked" initialValue={false}>
                <Checkbox>Compare Spec</Checkbox>
              </Form.Item>

              <Form.Item
                label="Result Type"
                name="ResultType"
                rules={[
                  {
                    required: true,
                    message: "Please input your Result Type!",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="Support">Support</Radio>
                  <Radio value="Final">Final</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={30} style={{ padding: "28px" }}>
            <Col span={24}>
              <EditableTable columns={formulaParametercolumns} initialData={formulaParameterdata} />

              <Form.Item
                label="Formula"
                name="Formula"
                style={{ marginTop: "30px" }}
              >
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item
                label="Sim Result"
                name="SimResult"
                readOnly
              >
                <Input maxLength={20} disabled/>
              </Form.Item>
            </Col>
          </Row>

          <ButtonSubmit onReset={onReset} />
        </Form>
      </div>
    </>
  );
};

export default FormFormula;

