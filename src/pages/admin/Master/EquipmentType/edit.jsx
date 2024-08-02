import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Tooltip, Checkbox } from "antd";
import { EditFilled } from "@ant-design/icons";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { JsonCreateModif } from "../API/Json";
import { updateEquipmentType } from "../API/updateData";

const EditEquipmentType = ({ dataSource, onEdit }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue(dataSource);
  }, [dataSource, form]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    console.log("Updated data:", values);

    try {
      setLoading(true);
      const payload = {
        ...values,
        ...JsonCreateModif,
      };

      const response = await updateEquipmentType(dataSource.EquipmentTypeCode, payload);
      messageApi.open({
        type: "success",
        content: response.data.statusMessage,
      });

      onEdit(true);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
            title="EQUIPMENT TYPE"
            subtitle="Edit data a equipment type"
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
                label="Equipment Type Code"
                name="EquipmentTypeCode"
                rules={[
                  {
                    required: true,
                    message: "Please input Equipment Type Code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              
              <Form.Item
                label="Equipment Type Name"
                name="EquipmentTypeName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Equipement Type Name!",
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
          <ButtonEdit onReset={onReset} onLoading={loading} />
        </Form>
      </Modal>
    </>
  );
};

export default EditEquipmentType;
