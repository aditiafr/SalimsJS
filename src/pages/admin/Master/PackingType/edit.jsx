import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Tooltip, Checkbox } from "antd";
import { EditFilled } from "@ant-design/icons";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import { PackingTypeMapToHttp } from "../../../../mapper/PackingType";
import { updatePackingType } from "../../../../Api/Master/updateData";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";

const EditPackingType = ({ dataSource, onEdit }) => {
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
      const payload = PackingTypeMapToHttp(values);

      const response = await updatePackingType(dataSource.PackingTypeCode, payload);
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
            title="PACKING TYPE"
            subtitle="Edit data a packing type"
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
                label="Packing Type Code"
                name="PackingTypeCode"
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
                label="Packing Type Name"
                name="PackingTypeName"
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
          <ButtonEdit onReset={onReset} onLoading={loading}/>
        </Form>
      </Modal>
    </>
  );
};

export default EditPackingType;
