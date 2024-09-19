import { EditFilled } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import { updateBuilding } from "../../../../Api/Master/updateData";
import SwitchComponent from "../../../../components/Dashboard/Global/SwitchComponent";

const EditBuilding = ({ dataSource, onEdit }) => {
  console.log(dataSource);

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
      const response = await updateBuilding(dataSource.buildingcode, payload);
      message.success(response.data.message);
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
    form.setFieldsValue(dataSource);
    setIsSuspend(dataSource.Issuspend);
    setIsModalOpen(false);
  };

  const onlyNumber = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <>
      <Tooltip title="Edit">
        <Button icon={<EditFilled />} type="text" onClick={showModal} />
      </Tooltip>

      <Modal
        title={
          <div className="flex justify-between items-center">
            <HeaderTitle title="BUILDING" subtitle="Edit data a Building" />
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
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 p-2">

            <Form.Item
              label="Building Code"
              name="buildingcode"
            >
              <Input placeholder="Input Building Code" disabled />
            </Form.Item>

            <Form.Item
              label="Building Name"
              name="buildingname"
              rules={[
                {
                  required: true,
                  message: "Please input your Building Name!",
                },
              ]}
            >
              <Input placeholder="Input Building Name" autoFocus />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your Address!",
                },
              ]}
            >
              <Input.TextArea placeholder="Input Address" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your Phone Number!",
                },
              ]}
            >
              <Input
                placeholder="Input Phone Number Example(08123456789)"
                onKeyPress={onlyNumber}
              />
            </Form.Item>

            <Form.Item
              label="Fax"
              name="fax"
              rules={[
                {
                  required: true,
                  message: "Please input your Fax!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Contact"
              name="contact"
              rules={[
                {
                  required: true,
                  message: "Please input your Contact!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="ZIP Code"
              name="zipcode"
              rules={[
                {
                  required: true,
                  message: "Please input your ZIP Code!",
                },
              ]}
            >
              <Input maxLength={5} />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input your City!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Country"
              name="country"
              rules={[
                {
                  required: true,
                  message: "Please input your Country!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>

          </div>

          <ButtonEdit onReset={onReset} onLoading={loading} />
        </Form>
      </Modal >
    </>
  );
};

export default EditBuilding;
