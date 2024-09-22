import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { EditFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Tooltip, Checkbox, Select, Table } from "antd";
import React, { useState } from "react";

const EditLabour = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  
  const departments = [
    { label: "(D03) Quality Control", value: "(D03) Quality Control" },
    { label: "(D04) Production", value: "(D04) Production" },
    { label: "(D05) Warehouse", value: "(D05) Warehouse" },
  ];

  const levels = [
    { label: "Supervisor", value: "Supervisor" },
    { label: "Staff", value: "Staff" },
    { label: "Operator", value: "Operator" },
  ];

  const columns = [
    {
      title: "Code",
      dataIndex: "Code",
      key: "Code",
      width: 80,
    },
    {
      title: "Parameter",
      dataIndex: "Parameter",
      key: "Parameter",
      width: 100,
    },
    {
      title: "Procedure",
      dataIndex: "Procedure",
      key: "Procedure",
      width: 100,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Alias",
      dataIndex: "Alias",
      key: "Alias",
      width: 100,
      render: (text) => (text ?? "N/A"),
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 200,
      render: (text) => (text ?? "N/A"),
    }
  ];

  const data = [
    {
      key: 1,
      Code  : "QC01",
      Parameter: "COD",
      Procedure: "Waste-01",
      Alias: "Deternimation of Chemical Oxygen Demand",
      Description: "0"
    },
    {
      key: 2,
      Code  : "QC02",
      Parameter: "TSS",
      Procedure: "Waste-02",
      Alias: "Deternimation of Total Suspended Solid",
      Description: "0"
    },
    {
      key: 3,
      Code  : "QC03",
      Parameter: "pH",
      Procedure: "Waste-03",
      Alias: "Deternimation of pH",
      Description: "0"
    },
    {
      key: 4,
      Code  : "QC04",
      Parameter: "Temperature",
      Procedure: "Waste-04",
      Alias: "Deternimation of Temperature",
      Description: "0"
    },
    {
      key: 5,
      Code  : "QC05",
      Parameter: "DO",
      Procedure: "Waste-05",
      Alias: "Deternimation of Dissolved Oxygen",
      Description: "0"
    },
  ];

  return (
    <>
      <Tooltip title="Edit">
        <Button icon={<EditFilled />} type="text" onClick={showModal} />
      </Tooltip>

      <Modal
        title={
          <HeaderTitle
            title="Labour"
            subtitle="Edit data a labour"
          />
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
          <Row gutter={30} style={{ margin: "0px" }}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Branch"
                name="Branch"
                rules={[
                  {
                    required: true,
                    message: "Please input your Branch!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>

              <Form.Item
                label="Department"
                name="Department"
                rules={[
                  {
                    required: true,
                    message: "Please select Department!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select Department"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={departments}
                />
              </Form.Item>

              <Form.Item
                label="Code"
                name="Code"
                rules={[
                  {
                    required: true,
                    message: "Please input your Code!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>

              <Form.Item
                label="Name"
                name="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Level"
                name="Level"
              >
                <Select
                  showSearch
                  placeholder="Select Level"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={levels}
                />
              </Form.Item>
              
              <Form.Item label="Description" name="Description">
                <Input.TextArea rows={6} />
              </Form.Item>

              <Form.Item name="Suspended" valuePropName="checked" initialValue={false}>
                <Checkbox>Suspended</Checkbox>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{
                  x: 1000,
                }}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <ButtonEdit onReset={onReset} />
        </Form>
      </Modal>
    </>
  );
};

export default EditLabour;
