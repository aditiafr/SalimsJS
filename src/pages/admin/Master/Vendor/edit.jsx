import { EditFilled } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import { updateVendor } from "../../../../Api/Master/updateData";
import SwitchComponent from "../../../../components/Dashboard/Global/SwitchComponent";

const EditVendor = ({ dataSource, onEdit }) => {
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
      console.log(payload);

      // const response = await updateVendor(dataSource.branchcode ,dataSource.vendorcode, payload);
      // message.success(response.data.message);
      // onEdit(true);
      // setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onReset = () => {
    form.resetFields();
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
            <HeaderTitle title="VENDOR" subtitle="Edit data a vendor" />
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
              label="Vendor Code"
              name="vendorcode"
            >
              <Input maxLength={6} disabled />
            </Form.Item>

            <Form.Item
              label="Vendor Name"
              name="vendorname"
              rules={[
                {
                  required: true,
                  message: "Please input your Vendor Name!",
                },
              ]}
            >
              <Input />
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
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Address 2"
              name="address2"
            >
              <Input.TextArea />
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
              label="Postal Code"
              name="postalcode"
              rules={[
                {
                  required: true,
                  message: "Please input your Postal Code!",
                },
              ]}
            >
              <Input maxLength={5} onKeyPress={handleOnKeyPress} />
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

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email Address!",
                },
                {
                  type: 'email',
                },
              ]}
            >
              <Input />
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
              <Input onKeyPress={handleOnKeyPress} />
            </Form.Item>

            <Form.Item
              label="Hp Number"
              name="hp"
              rules={[
                {
                  required: true,
                  message: "Please input your Hp Number!",
                },
              ]}
            >
              <Input onKeyPress={handleOnKeyPress} />
            </Form.Item>

            <Form.Item
              label="Fax Code"
              name="fax"
              rules={[
                {
                  required: true,
                  message: "Please input your Fax Code!",
                },
              ]}
            >
              <Input onKeyPress={handleOnKeyPress} />
            </Form.Item>

            <Form.Item
              label="NPWP"
              name="npwp"
              rules={[
                {
                  required: true,
                  message: "Please input your NPWP!",
                },
              ]}
            >
              <Input onKeyPress={handleOnKeyPress} />
            </Form.Item>

            <Form.Item
              label="Contact Person"
              name="contactperson"
              rules={[
                {
                  required: true,
                  message: "Please input your Contact Person!",
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
      </Modal>
    </>
  );
};

export default EditVendor;
