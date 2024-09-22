import React, { useEffect, useState } from "react";
import { EditFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Tooltip, Checkbox } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { ProductTypeMapToHttp } from "../../../../mapper/ProductType";
import { updateProductType } from "../../../../Api/Master/updateData";

const EditProductType = ({ dataSource, onEdit }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue(dataSource);
  }, [dataSource, form]);

  const showModal = () => {
    form.setFieldsValue(dataSource);
    setIsModalOpen(true);
  };


  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = ProductTypeMapToHttp(values);

      const response = await updateProductType(dataSource.ProductTypeCode, payload);
      messageApi.open({
        type: "success",
        content: response.data.message,
      });

      onEdit(true);
      setIsModalOpen(false);
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
            title="PRODUCT TYPE"
            subtitle="Edit data a product type"
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
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row gutter={30} style={{ margin: "0px" }}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Code"
                name="ProductTypeCode"
                rules={[
                  {
                    required: true,
                    message: "Please input Code!",
                  },
                ]}
              >
                <Input maxLength={20} disabled />
              </Form.Item>
              
              <Form.Item
                label="Name"
                name="ProductTypeName"
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
          <ButtonEdit onReset={onReset} />
        </Form>
      </Modal>
    </>
  );
};

export default EditProductType;
