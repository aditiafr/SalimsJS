import { EditFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Tooltip } from "antd";
import { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { JsonCreateModif } from "../API/Json";
import { updateWarehouse } from "../API/updateData";

const EditWarehouse = ({ dataSource, onEdit }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue(dataSource);
  }, [dataSource, form])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      setLoading(true);
      const modifiedValues = {
        ...values,
        ...JsonCreateModif
      }
      const response = await updateWarehouse(dataSource.WarehouseCode, modifiedValues);
      messageApi.open({
        type: 'success',
        content: response.data.statusMessage,
      });
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
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title="Edit">
        <Button icon={<EditFilled />} type="text" onClick={showModal} />
      </Tooltip>

      <Modal
        title={
          <HeaderTitle title="WAREHOUSE" subtitle="Edit data a warehouse" />
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
          <Row gutter={30} style={{ margin: "0px", paddingTop: "14px" }}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Warehouse Code"
                name="WarehouseCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your Warehouse Code!",
                  },
                ]}
              >
                <Input maxLength={20} readOnly />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Warehouse Name"
                name="WarehouseName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Warehouse Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Address"
                name="Address"
                rules={[
                  {
                    required: true,
                    message: "Please input your Address!",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Phone"
                name="Phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Fax"
                name="Fax"
                rules={[
                  {
                    required: true,
                    message: "Please input your Fax!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Contact"
                name="Contact"
                rules={[
                  {
                    required: true,
                    message: "Please input your Contact!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="ZIP Code"
                name="ZIPCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your ZIP Code!",
                  },
                ]}
              >
                <Input maxLength={5} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="City"
                name="City"
                rules={[
                  {
                    required: true,
                    message: "Please input your City!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Country"
                name="Country"
                rules={[
                  {
                    required: true,
                    message: "Please input your Country!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Description" name="Description">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <ButtonEdit onReset={onReset} onLoading={loading} />
        </Form>
      </Modal>
    </>
  );
};

export default EditWarehouse;
