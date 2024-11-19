"use client";

import { Form, Input, Col, Row, Select, Table, message, DatePicker } from "antd";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import Checkbox from "antd/es/checkbox/Checkbox";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDepartments, getLabourNextCode } from "../../../../Api/Master/getData";
import { postLabour } from "../../../../Api/Master/postData";
import InputModal from "../../../../components/Dashboard/Global/InputModal";
import FormLabourPar from "./LabourPar/form";

const FormLabour = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [labourCode, setLabourCode] = useState("");
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
      } catch (error) {
        console.log(error);
      }
      setIsDepartmentLoading(false);
    };
    if (openDepartment) {
      fetchDepartment();
      setOpenDepartment(false);
    }
  }, [openDepartment]);

  useEffect(() => {
    form.setFieldsValue({ departmentname: departmentName });
  }, [departmentName, form, departmentCode]);

  const fetchLabourNextCode = async () => {
    try {
      setLoading(true);
      const nextLabourCode = await getLabourNextCode();
      setLabourCode(nextLabourCode);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabourNextCode();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ labourcode: labourCode });
  }, [labourCode, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        labour_par: labourPar,
        depcode: departmentCode,
      };

      const response = await postLabour(payload);
      message.success(response.data.message);
      navigate("/master/labour");
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error);
    }
    setLoading(false);
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="Labour"
          subtitle="form data a labour"
        />
      </div>
      <div className="w-full bg-white rounded-lg">
        <Form
          name="basic"
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row gutter={30} style={{ padding: "28px" }}>
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
                <Input maxLength={6} />
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
                <FormLabourPar onSaveData={(values) => setLabourPar(values)} />
            </div>
          </Row>
          <ButtonSubmit onReset={onReset} onLoading={loading} />
        </Form>
      </div>
    </>
  );
};

export default FormLabour;

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