import { EditFilled } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Modal, TimePicker, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import SwitchComponent from "../../../../components/Dashboard/Global/SwitchComponent";
import { updateTimePoint } from "../../../../Api/Master/updateData";
import dayjs from "dayjs";

const EditTimePoint = ({ dataSource, onEdit }) => {

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
        intervaltime: dayjs(dataSource.intervaltime, "HH:mm"),
        powmintime: dayjs(dataSource.powmintime, "HH:mm"),
        powmaxtime: dayjs(dataSource.powmaxtime, "HH:mm"),
        twmintime: dayjs(dataSource.twmintime, "HH:mm"),
        twmaxtime: dayjs(dataSource.twmaxtime, "HH:mm"),
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
        issuspend: isSuspend,
        intervaltime: dayjs(values.intervaltime).format("HH:mm"),
        powmintime: dayjs(values.powmintime).format("HH:mm"),
        powmaxtime: dayjs(values.powmaxtime).format("HH:mm"),
        twmintime: dayjs(values.twmintime).format("HH:mm"),
        twmaxtime: dayjs(values.twmaxtime).format("HH:mm"),
      }
      console.log(payload);

      const response = await updateTimePoint(dataSource.timepointcode, payload);
      message.success(response.data.message);
      onEdit(true);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onReset = () => {
    form.setFieldsValue(payLoadData);
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
          autoComplete="off"
          form={form}
        >

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 p-6">
            <Form.Item
              label="Time Point Code"
              name="timepointcode"
            >
              <Input disabled placeholder="Input Time Point Code" />
            </Form.Item>

            <Form.Item
              label="Time Point Name"
              name="timepointname"
              rules={[
                {
                  required: true,
                  message: "Please input your Time Point Name!",
                },
              ]}
            >
              <Input placeholder="Input Time Point Name" />
            </Form.Item>

            <div className="col-span-2">
              <p className="mb-2">Interval</p>
              <div className="flex justify-around border p-2 rounded-md gap-4">
                <Form.Item
                  label="Monthly"
                  name="monthly"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Monthly!",
                    },
                  ]}
                  className="w-full"
                >
                  <InputNumber min={1} max={12} defaultValue={0} className="w-full" />
                </Form.Item>
                <Form.Item
                  label="Day"
                  name="intervalday"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Day!",
                    },
                  ]}
                  className="w-full"
                >
                  <InputNumber min={1} defaultValue={0} className="w-full" />
                </Form.Item>
                <Form.Item
                  label="Time"
                  name="intervaltime"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Time!",
                    },
                  ]}
                  className="w-full"
                >
                  <TimePicker className="w-full" format={"HH:mm"} defaultValue={dayjs('00:00', 'HH:mm')} />
                </Form.Item>
              </div>
            </div>

            <div className="col-span-2 mt-4">
              <p className="mb-2">Pull Out Window</p>
              <div className="flex flex-col lg:flex-row gap-4 pt-2">
                <div className="relative flex justify-around border p-2 rounded-md gap-4 w-full">
                  <p className="absolute -top-3 left-3 bg-white px-1">Minimum</p>
                  <Form.Item
                    label="Day"
                    name="powminday"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Day!",
                      },
                    ]}
                    className="w-full"
                  >
                    <InputNumber min={1} defaultValue={0} className="w-full" />
                  </Form.Item>
                  <Form.Item
                    label="Time"
                    name="powmintime"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Time!",
                      },
                    ]}
                    className="w-full"
                  >
                    <TimePicker className="w-full" defaultValue={dayjs('00:00', 'HH:mm')} format={"HH:mm"} />
                  </Form.Item>
                </div>

                <div className="relative flex justify-around border p-2 rounded-md gap-4 w-full">
                  <p className="absolute -top-3 left-3 bg-white px-1">Maximum</p>
                  <Form.Item
                    label="Day"
                    name="powmaxday"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Day!",
                      },
                    ]}
                    className="w-full"
                  >
                    <InputNumber min={1} defaultValue={0} className="w-full" />
                  </Form.Item>
                  <Form.Item
                    label="Time"
                    name="powmaxtime"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Time!",
                      },
                    ]}
                    className="w-full"
                  >
                    <TimePicker className="w-full" defaultValue={dayjs('00:00', 'HH:mm')} format={"HH:mm"} />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="col-span-2 my-4">
              <p className="mb-2">Test Window</p>
              <div className="flex flex-col lg:flex-row gap-4 pt-2">
                <div className="relative flex justify-around border p-2 rounded-md gap-4 w-full">
                  <p className="absolute -top-3 left-3 bg-white px-1">Minimum</p>
                  <Form.Item
                    label="Day"
                    name="twminday"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Day!",
                      },
                    ]}
                    className="w-full"
                  >
                    <InputNumber min={1} defaultValue={0} className="w-full" />
                  </Form.Item>
                  <Form.Item
                    label="Time"
                    name="twmintime"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Time!",
                      },
                    ]}
                    className="w-full"
                  >
                    <TimePicker className="w-full" defaultValue={dayjs('00:00', 'HH:mm')} format={"HH:mm"} />
                  </Form.Item>
                </div>

                <div className="relative flex justify-around border p-2 rounded-md gap-4 w-full">
                  <p className="absolute -top-3 left-3 bg-white px-1">Maximum</p>
                  <Form.Item
                    label="Day"
                    name="twmaxday"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Day!",
                      },
                    ]}
                    className="w-full"
                  >
                    <InputNumber min={1} defaultValue={0} className="w-full" />
                  </Form.Item>
                  <Form.Item
                    label="Time"
                    name="twmaxtime"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Time!",
                      },
                    ]}
                    className="w-full"
                  >
                    <TimePicker className="w-full" defaultValue={dayjs('00:00', 'HH:mm')} format={"HH:mm"} />
                  </Form.Item>
                </div>
              </div>
            </div>

            <Form.Item label="Description" name="description" className="col-span-2">
              <Input.TextArea placeholder="Description" />
            </Form.Item>
          </div>

          <ButtonEdit onReset={onReset} onLoading={loading} />
        </Form>
      </Modal >
    </>
  );
};

export default EditTimePoint;
