import { EditFilled } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Tooltip, DatePicker, Select } from "antd";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import { updateMaintenanceRequest } from "../../../../Api/Maintenance/updateData";
import SwitchComponent from "../../../../components/Dashboard/Global/SwitchComponent";
import { getEquipment, getEquipmentOne } from '../../../../Api/Master/getData';
import { PrefixGlobal } from '../../../../components/Dashboard/Global/Helper';
import Cookies from "js-cookie";

const EditMaintenanceRequest = ({ dataSource, onEdit }) => {

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuspend, setIsSuspend] = useState(false);
  const [equipment, setEquipment] = useState([]);
  const [branchcode, setBranchCode] = useState("");
  const prefix = PrefixGlobal();

  const handleSwitchChange = (checked) => {
    setIsSuspend(checked);
    form.setFieldsValue(dataSource);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getEquipment();
      const branch = Cookies.get('branchcode');
      console.log(response);

      // Mengubah key
      const modifiedData = response.map(item => ({
        label: `(${item.equipmentcode}) ${item.equipmentname}`,
        value: item.equipmentcode,
        key: item.equipmentversion,
      }));

      setEquipment(modifiedData)
      setBranchCode(branch)
      // setData(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    form.setFieldsValue(dataSource);
    fetchData();
  }, [dataSource, form])

  const showModal = () => {
    setIsModalOpen(true);
    console.log("dataSource", dataSource);

    setIsSuspend(dataSource.issuspend);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        issuspend: isSuspend
      }
      const response = await updateMaintenanceRequest(dataSource.MaintenanceRequestcode, payload);
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
            <HeaderTitle title="MaintenanceRequest" subtitle="Edit data a MaintenanceRequest" />
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
              label="MR Number"
              name="mrnumber"
              rules={[
                {
                  required: true,
                  message: "Please input your MR Number!",
                },
              ]}
            >
              <Input placeholder="Input MR Number" disabled />
            </Form.Item>

            <Form.Item
              label="MR Date"
              name="mrdatetest"
              rules={[
                {
                  required: true,
                  message: "Please input MR Date!",
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
              label="Description"
              name="description"
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Equipment Code"
              name="EquipmentCode"
              rules={[
                {
                  required: true,
                  message: "Please input Equipment Code!",
                },
              ]}
            >
              {/* <Input /> */}
              <Select
                showSearch
                placeholder="Select Equipment"
                optionFilterProp="children"
                filterOption={filterOption}
                options={equipment}
              />
            </Form.Item>
          </div>

          <ButtonEdit onReset={onReset} onLoading={loading} />
        </Form>
      </Modal >
    </>
  );
};

export default EditMaintenanceRequest;
