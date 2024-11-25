import { EditFilled } from "@ant-design/icons";
import { Button, Form, DatePicker, Input, message, Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import { updateMaintenanceProcess } from "../../../../Api/Maintenance/updateData";
import dayjs from "dayjs";

const EditMaintenanceProcess = ({ dataSource, onEdit }) => {

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuspend, setIsSuspend] = useState(false);
  const [payLoadData, setPayLoadData] = useState(null);

  const handleSwitchChange = (checked) => {
    setIsSuspend(checked);
    form.setFieldsValue(payLoadData);
  };

  useEffect(() => {
    if (form) {
      const payload = {
        ...dataSource,
        mpdate: dayjs(dataSource.mpdate),
        periode: dayjs(dataSource.periode),
      }
      form.setFieldsValue(payload);
      setPayLoadData(payload);
    }
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
      const response = await updateMaintenanceProcess(dataSource.MaintenanceProcesscode, payload);
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

  const handleOnKeyPress = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  return (
    <>
      <Tooltip title="Edit">
        <Button icon={<EditFilled />} type="text" onClick={showModal} />
      </Tooltip>

      <Modal
        title={
          <div className="flex justify-between items-center">
            <HeaderTitle title="Maintenance Process" subtitle="Edit data a Maintenance Process" />
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
              label="Branch Code"
              name="branchcode"
            >
              <Input placeholder="Input Branch Code" disabled />
            </Form.Item>

            <Form.Item
              label="MP Number"
              name="mpnumber"
            >
              <Input placeholder="Input MaintenanceProcess Code" disabled />
            </Form.Item>

            <Form.Item
              label="MP Date"
              name="mpdate"
              rules={[
                {
                  required: true,
                  message: "Please input MP Date!",
                },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>


            <Form.Item
              label="Periode"
              name="periodetest"
              rules={[
                {
                  required: true,
                  message: "Please input Periode!",
                },
              ]}
            >
              <DatePicker className="w-full" />
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
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input your City!",
                },
              ]}
            >
              <Input placeholder="Input City" />
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
              <Input placeholder="Input Country" />
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
              <Input
                placeholder="Input Fax"
                onKeyPress={handleOnKeyPress}
              />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your Phone Number!"
                }
              ]}
            >
              <Input
                type="tel"
                placeholder="Input Phone Number Example(08123456789)"
                maxLength={13}
                onKeyPress={handleOnKeyPress}
              />
            </Form.Item>

            <Form.Item
              label="Contact Name"
              name="contact"
              rules={[
                {
                  required: true,
                  message: "Please input your Contact Name!",
                },
              ]}
            >
              <Input placeholder="Input Contact Name" />
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
              <Input
                placeholder="Input ZIP Code"
                maxLength={5}
                onKeyPress={handleOnKeyPress}
              />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea placeholder="Input Description" />
            </Form.Item>

          </div>

          <ButtonEdit onReset={onReset} onLoading={loading} />
        </Form>
      </Modal >
    </>
  );
};

export default EditMaintenanceProcess;
