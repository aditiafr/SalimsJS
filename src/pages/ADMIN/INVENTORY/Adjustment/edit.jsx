import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { EditFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Tooltip, Checkbox, Select, Table, message, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { updateLabour } from "../../../../Api/Master/updateData";
import InputModal from "../../../../components/Dashboard/Global/InputModal";
import FormLabourPar from "./LabourPar/form";
import { getDepartments } from "../../../../Api/Master/getData";
import dayjs from 'dayjs';

const EditLabour = ({ dataSource, onEdit }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [labourPar, setLabourPar] = useState([]);

  const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
  const [dataDepartment, setDataDepartment] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState("");
  const [openDepartment, setOpenDepartment] = useState(null);
  const departmentName = selectDepartment ? selectDepartment.DepartmentName : "";
  const departmentCode = selectDepartment ? selectDepartment.DepartmentCode : "";

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        setIsDepartmentLoading(true);
        const response = await getDepartments(false);
        setDataDepartment(response);

        for (let i = 0; i < response.length; i++) {
          if (response[i].DepartmentCode === dataSource.depcode) {
            setSelectDepartment(response[i]);
            form.setFieldsValue({ departmentname: response[i].DepartmentName });
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
      setIsDepartmentLoading(false);
    };

    fetchDepartment();
  }, [openDepartment]);

  useEffect(() => {
    form.setFieldsValue({ departmentname: departmentName });
  }, [departmentName, form]);

  useEffect(() => {
    form.setFieldsValue({
      ...dataSource,
      dateofuse: dayjs(dataSource.dateofuse),
      dateofavailable: dayjs(dataSource.dateofavailable),
    });
  }, [dataSource, form]);

  const showModal = () => {
    setIsModalOpen(true);
    setLabourPar(dataSource.detail);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        labour_par: labourPar,
        depcode: selectDepartment.DepartmentCode,
      };

      const response = await updateLabour(dataSource.labourcode, payload);
      onEdit(true);
      message.success(response.data.message);
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
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row gutter={30} style={{ margin: "0px" }}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Code"
                name="labourcode"
                rules={[
                  {
                    required: false,
                    message: "Please input Code!",
                  },
                ]}
              >
                <Input maxLength={6} disabled />
              </Form.Item>

              <Form.Item
                label="Name"
                name="labourname"
                rules={[
                  {
                    required: true,
                    message: "Please input Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Title"
                name="tittle"
                rules={[
                  {
                    required: true,
                    message: "Please input Title!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <InputModal
                title="Department"
                label="Department"
                name="departmentname"
                dataSource={dataDepartment}
                loading={isDepartmentLoading}
                columns={departmentColumns}
                onData={(values) => setSelectDepartment(values)}
                onOpenModal={(values) => setOpenDepartment(values)}
              />
            </Col>

            <Col xs={24} sm={12}>     
              <Form.Item
                label="Date of Use"
                name="dateofuse"
              >
               <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Date of Available"
                name="dateofavailable"
              >
               <DatePicker style={{ width: "100%" }} />
              </Form.Item>
         
              <Form.Item label="Description" name="description">
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item name="issuspend" valuePropName="checked" initialValue={false}>
                <Checkbox>Suspended</Checkbox>
              </Form.Item>
            </Col>

            <div className="m-4 p-4 border rounded-md">
                <FormLabourPar 
                  onSaveData={(values) => setLabourPar(values)} 
                  onEdit={dataSource.detail}
                />
            </div>
          </Row>
          <ButtonEdit onReset={onReset} onLoading={loading} />
        </Form>
      </Modal>
    </>
  );
};

export default EditLabour;

const departmentColumns = [
  {
    title: "No",
    dataIndex: "key",
    key: "key",
    width: 60,
    fixed: "left",
  },
  {
    title: "Department Code",
    dataIndex: "DepartmentCode",
    key: "DepartmentCode",
    width: 80,
  },
  {
    title: "Department Name",
    dataIndex: "DepartmentName",
    key: "DepartmentName",
    width: 100,
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
    width: 200,
    render: (text) => (text || "N/A"),
  },
];