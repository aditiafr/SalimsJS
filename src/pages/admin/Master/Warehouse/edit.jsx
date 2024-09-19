import { EditFilled } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import { updateWarehouse } from "../../../../Api/Master/updateData";
import SwitchComponent from "../../../../components/Dashboard/Global/SwitchComponent";

const EditWarehouse = ({ dataSource, onEdit }) => {
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

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        city: 'CM001',
        issuspend: isSuspend
      }
      const response = await updateWarehouse(dataSource.warehousecode, payload);
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
            <HeaderTitle title="WAREHOUSE" subtitle="Edit data a warehouse" />
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 p-6">

            <Form.Item
              label="Warehouse Code"
              name="warehousecode"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your Warehouse Code!",
            //   },
            // ]}
            >
              <Input placeholder="Input Warehouse Code" maxLength={6} />
            </Form.Item>

            <Form.Item
              label="Warehouse Name"
              name="warehousename"
              rules={[
                {
                  required: true,
                  message: "Please input your Warehouse Name!",
                },
              ]}
            >
              <Input placeholder="Input Warehouse Name" autoFocus />
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
              label="City Name"
              name="cityname"
              rules={[
                {
                  required: true,
                  message: "Please input your City Name!",
                },
              ]}
            >
              <Input placeholder="Input City Name" />
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
              <Input placeholder="Input ZIP Code" maxLength={5} />
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
              <Input placeholder="Input Fax" />
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
              <Input placeholder="Input NPWP" onKeyPress={onlyNumber} />
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

            <Form.Item label="Description" name="description" className="col-span-2">
              <Input.TextArea placeholder="Input Description" />
            </Form.Item>

          </div>

          <ButtonEdit onReset={onReset} onLoading={loading} />
        </Form>
      </Modal>
    </>
  );
};

export default EditWarehouse;
