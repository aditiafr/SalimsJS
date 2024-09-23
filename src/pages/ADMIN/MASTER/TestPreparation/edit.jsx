import { EditFilled } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import SwitchComponent from "../../../../components/Dashboard/Global/SwitchComponent";
import { updateTestPreparation } from "../../../../Api/Master/updateData";

const EditTestPreparation = ({ dataSource, onEdit }) => {

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuspend, setIsSuspend] = useState(false);

  const handleSwitchChange = (checked) => {
    setIsSuspend(checked);
    form.setFieldsValue(dataSource);
  };

  useEffect(() => {
    form.setFieldsValue(dataSource);
  }, [dataSource, form])

  const showModal = () => {
    setIsModalOpen(true);
    setIsSuspend(dataSource.issuspend);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        issuspend: isSuspend
      }
      const response = await updateTestPreparation(dataSource.testpreparationid, payload);
      message.success(response.data.message);
      onEdit(true);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onReset = () => {
    form.setFieldsValue(dataSource);
    setIsSuspend(dataSource.Issuspend);
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title="Edit">
        <Button icon={<EditFilled />} type="text" onClick={showModal} />
      </Tooltip>

      <Modal
        title={
          <div className="flex justify-between items-center">
            <HeaderTitle title="TEST PREPARATION" subtitle="Edit data a Test Preparation" />
            <SwitchComponent
              isSuspend={isSuspend}
              handleSwitchChange={handleSwitchChange}
            />
          </div>
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
          autoComplete="off"
          form={form}
        >

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 p-6">

            <Form.Item
              label="Test Preparation Id"
              name="testpreparationid"
            >
              <Input placeholder="Input Test Preparation Id" disabled />
            </Form.Item>

            <Form.Item
              label="Test Preparation Name"
              name="testpreparationname"
              rules={[
                {
                  required: true,
                  message: "Please input your Test Preparation Name!",
                },
              ]}
            >
              <Input placeholder="Input Test Preparation Name" autoFocus />
            </Form.Item>

            <Form.Item label="Description" name="description" className="col-span-2">
              <Input.TextArea placeholder="Input Description" />
            </Form.Item>

          </div>

          <ButtonEdit onReset={onReset} onLoading={loading} />
        </Form>
      </Modal >
    </>
  );
};

export default EditTestPreparation;
