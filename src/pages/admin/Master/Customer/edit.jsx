import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Table, Tag, Tooltip } from "antd";
import { EditFilled } from "@ant-design/icons";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { JsonCreateModif } from "../API/Json";
import { updateCustomer } from "../API/updateData";

const EditCustomer = ({ dataSource, onEdit }) => {

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
      const response = await updateCustomer(dataSource.CustomerCode, modifiedValues);
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
    form.resetFields();
    setIsModalOpen(false);
  };


  const columns = [
    {
      title: "key",
      dataIndex: "key",
      key: "key",
      width: 150,
    },
    {
      title: "User",
      dataIndex: "User",
      key: "User",
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      width: 150,
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      width: 150,
    },
    {
      title: "Password",
      dataIndex: "Password",
      key: "Password",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 150,
    },
    {
      title: "Suspended",
      dataIndex: "Suspended",
      key: "Suspended",
      width: 120,
      render: (suspended) => (
        <Tag color={suspended ? "red" : "green"}>
          {suspended ? "Yes" : "No"}
        </Tag>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      User: "Ahmad001",
      Name: "Ahmad",
      Phone: "0812398142",
      Password: "*******",
      Description: "Data 1",
      Suspended: false,
    },
    {
      key: "2",
      User: "Ahmad002",
      Name: "Ahmad",
      Phone: "0812398142",
      Password: "*******",
      Description: "Data 2",
      Suspended: true,
    },
  ];

  return (
    <>
      <Tooltip title="Edit">
        <Button icon={<EditFilled />} type="text" onClick={showModal} />
      </Tooltip>

      <Modal
        title={<HeaderTitle title="CUSTOMER" subtitle="Edit data a customer" />}
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
                label="Customer Code"
                name="CustomerCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your Customer Code!",
                  },
                ]}
              >
                <Input readOnly />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Customer Name"
                name="CustomerName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Customer Name!",
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
                label="Email"
                name="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
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

          <Row style={{ padding: "28px" }}>
            <Table
              // loading={true}
              //   rowSelection
              columns={columns}
              dataSource={data}
            //   pagination={{
            //     showSizeChanger: true,
            //     defaultPageSize: 10,
            //   }}
            //   scroll={{
            //     x: 1000,
            //   }}
            />
          </Row>

          <ButtonEdit onReset={onReset} onLoading={loading} />
        </Form>
      </Modal>
    </>
  );
};

export default EditCustomer;
