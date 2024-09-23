import { EditFilled } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import { updateSampleLocation } from "../../../../Api/Master/updateData";
import SwitchComponent from "../../../../components/Dashboard/Global/SwitchComponent";

const EditSampleLocation = ({ dataSource, onEdit }) => {

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuspend, setIsSuspend] = useState();

  const handleSwitchChange = (checked) => {
    setIsSuspend(checked);
    form.setFieldsValue(dataSource);
  };

  useEffect(() => {
    form.setFieldsValue(dataSource);
  }, [dataSource, form])

  const showModal = () => {
    setIsModalOpen(true);
    setIsSuspend(dataSource.issuspend)
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { buildingname, ...filterValues } = values;
      const payload = {
        ...filterValues,
        issuspend: isSuspend
      }
      console.log(payload);
      
      const response = await updateSampleLocation(dataSource.buildingcode, dataSource.locationcode, payload);
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
            <HeaderTitle
              title="SAMPLE LOCATION"
              subtitle="Edit data a Sample Location"
            />
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
          name="form"
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          form={form}
        >

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 p-6">
            <Form.Item
              label="Building Name"
              name="buildingname"
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Location Code"
              name="locationcode"
            >
              <Input readOnly />
            </Form.Item>

            <Form.Item
              label="Location Name"
              name="locationname"
              rules={[
                {
                  required: true,
                  message: "Please input your Location Name!",
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

export default EditSampleLocation;
