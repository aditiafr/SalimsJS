import { Form, Input, Col, Row, Checkbox } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { useEffect, useState } from "react";
import { getDepartmentNextCode } from "../../../../Api/Master/getData";
import { postDepartment } from "../../../../Api/Master/postData";
import { DepartmentMapToHttp } from "../../../../mapper/Department";

const FormDepartment = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);
  const [departmentCode, setDepartmentCode] = useState("");

  const fetchDepartmentNextCode = async () => {
    try {
      setLoading(true);
      const nextDepartmentCode = await getDepartmentNextCode();
      
      setDepartmentCode(nextDepartmentCode);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartmentNextCode();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ DepartmentCode: departmentCode });
  }, [departmentCode, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = DepartmentMapToHttp(values);

      const response = await postDepartment(payload);
      messageApi.open({
        type: "success",
        content: response.data.message,
      });

      navigate("/master/department");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
          title="DEPARTMENT"
          subtitle="form data a department"
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
                label="Department Code"
                name="DepartmentCode"
                rules={[
                  {
                    required: false,
                    message: "Please input Code!",
                  },
                ]}
              >
                <Input maxLength={5} />
              </Form.Item>

              <Form.Item
                label="Name"
                name="DepartmentName"
                rules={[
                  {
                    required: true,
                    message: "Please input Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Description" name="Description">
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item name="IsSuspend" valuePropName="checked" initialValue={false}>
                <Checkbox>Suspended</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <ButtonSubmit onReset={onReset} onLoading={loading} />
        </Form>
      </div>
    </>
  );
};

export default FormDepartment;
