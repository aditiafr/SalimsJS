import React, { useState } from "react";
import { EditFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Tooltip, Checkbox } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";

const EditPriceListD = () => {
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

  return (
    <>
      <Tooltip title="Edit">
        <Button icon={<EditFilled />} type="text" onClick={showModal} />
      </Tooltip>

      <Modal
        title={
          <HeaderTitle
            title="PRICE LIST D"
            subtitle="Edit data a price list d"
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
                label="BranchCode"
                name="BranchCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your BranchCode!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>

              <Form.Item
                label="PriceCode"
                name="PriceCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your PriceCode!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>

              <Form.Item
                label="ProdCode"
                name="ProdCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your ProdCode!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>

              <Form.Item
                label="DefPrice"
                name="DefPrice"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="DiscP"
                name="DiscP"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="DiscM"
                name="DiscM"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="PriceList"
                name="PriceList"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <ButtonEdit onReset={onReset} />
        </Form>
      </Modal>
    </>
  );
};

export default EditPriceListD;
