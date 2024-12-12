import { EditFilled } from "@ant-design/icons";
import { Button, Form, DatePicker, Select, Input, message, Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import { updateMaintenanceProcess } from "../../../../Api/Maintenance/updateData";
import dayjs from "dayjs";
import {
  getMaintenanceRequest
} from '../../../../Api/Maintenance/getData';
const EditMaintenanceProcess = ({ dataSource, onEdit }) => {

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [customStatus, setCustomStatus] = useState("");
  const [maintenanceRequest, setMaintenanceRequest] = useState([]);
  const [payLoadData, setPayLoadData] = useState(null);

  const handleStatusChange = (value) => {
    setStatus(value);
    // Reset custom status if switching from Others
    if (value !== "Others") {
      setCustomStatus("");
    }
  };

  const handleCustomInputChange = (e) => {
    setCustomStatus(e.target.value);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getMaintenanceRequest();
      console.log(response);

      // Mengubah key
      const modifiedData = response.map(item => ({
        label: `(${item.mrnumber}) ${item.description}`,
        value: item.mrnumber,
      }));

      setMaintenanceRequest(modifiedData)
      // setData(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
    fetchData();
  }, [dataSource, form])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
      }
      const response = await updateMaintenanceProcess(payload);
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
    setIsModalOpen(false);
  };

  const handleOnKeyPress = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }
  const statusOption = [
    { label: "Calibrated", value: "Calibrated" },
    { label: "Repaired", value: "Repaired" },
    { label: "Unusable", value: "Unusable" },
    { label: "Others", value: "Others" },
  ];
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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
              name="periode"
              rules={[
                {
                  required: true,
                  message: "Please input Periode!",
                },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>


            <Form.Item label="Description" name="description">
              <Input.TextArea placeholder="Input Description" />
            </Form.Item>

            <Form.Item
              label="MR Number"
              name="mrnumber"
              rules={[
                {
                  required: true,
                  message: "Please input MR Number!",
                },
              ]}
            >
              <Input disabled />
              {/* <Select
                showSearch
                placeholder="Select Maintenance Request"
                optionFilterProp="children"
                filterOption={filterOption}
                options={maintenanceRequest}

              /> */}
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please input MR Number!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select Status"
                optionFilterProp="children"
                filterOption={filterOption}
                options={statusOption}
                value={status}
                onChange={handleStatusChange}
              />
              {status === "Others" && (
                <Input
                  placeholder="Input Status"
                  value={customStatus}
                  style={{ marginTop: 10 }}
                  onChange={handleCustomInputChange}
                />
              )}
            </Form.Item>
          </div>

          <ButtonEdit onReset={onReset} onLoading={loading} />
        </Form>
      </Modal >
    </>
  );
};

export default EditMaintenanceProcess;
