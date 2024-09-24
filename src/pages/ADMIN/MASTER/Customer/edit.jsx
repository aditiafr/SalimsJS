import { EditFilled } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import SwitchComponent from "../../../../components/Dashboard/Global/SwitchComponent";
import FormCustomerUser from "./User/form";
import FormCustomerZona from "./Zona/form";
import { updateCustomer } from "../../../../Api/Master/updateData";
import { selectedTranIdx } from "../../../../components/Dashboard/Global/Helper";

const EditCustomer = ({ dataSource, onEdit }) => {

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuspend, setIsSuspend] = useState(false);

  const [customerUser, setCustomerUser] = useState([]);
  const [customerZona, setCustomerZona] = useState([]);

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
    setCustomerUser(dataSource.user);
    setCustomerZona(dataSource.zona);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        tranidx: selectedTranIdx,
        issuspend: isSuspend,
        user: customerUser,
        zona: customerZona,
      }
      
      const response = await updateCustomer(payload);
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
            <HeaderTitle title="CUSTOMER" subtitle="Edit data a Customer" />
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
              label="Customer Code"
              name="customercode"
            >
              <Input placeholder="Input Customer Code" disabled />
            </Form.Item>

            <Form.Item
              label="Customer Name"
              name="customername"
              rules={[
                {
                  required: true,
                  message: "Please input your Customer Name!",
                },
              ]}
            >
              <Input placeholder="Input Customer Name" autoFocus />
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

            <Form.Item label="Description" name="description" className="col-span-2">
              <Input.TextArea placeholder="Input Description" />
            </Form.Item>

          </div>

          <div className="m-4 p-4 border rounded-md">
            <FormCustomerUser
              onSaveData={(values) => setCustomerUser(values)}
              onEdit={dataSource.user}
              />
          </div>

          <div className="m-4 p-4 border rounded-md">
            <FormCustomerZona
              onSaveData={(values) => setCustomerZona(values)}
              onEdit={dataSource.zona}
            />
          </div>

          <ButtonEdit onReset={onReset} onLoading={loading} />
        </Form>
      </Modal >
    </>
  );
};

export default EditCustomer;
