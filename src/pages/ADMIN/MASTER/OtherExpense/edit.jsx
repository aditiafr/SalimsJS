import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import { EditFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Tooltip, Checkbox } from "antd";
import React, { useState } from "react";

const EditOtherExpense = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
    setIsModalOpen(false);
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
      <Tooltip title="Edit">
        <Button icon={<EditFilled />} type="text" onClick={showModal} />
      </Tooltip>

      <Modal
        title={
          <HeaderTitle
            title="OTHER EXPENSE"
            subtitle="Edit data a other expense"
          />
        }
        centered
        open={isModalOpen}
        closable={false}
        width={1000}
        styles={{
          body: {
            maxHeight: "70vh",
            overflow: "auto",
          },
        }}
        footer={false}
      >
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row gutter={30} style={{ margin: "0px" }}>
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
          <ButtonEdit onReset={onReset} />
        </Form>
      </Modal>
    </>
  );
};

export default EditOtherExpense;
