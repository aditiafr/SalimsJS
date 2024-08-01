import { Form, Input, Col, Row, Checkbox } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { useEffect, useState } from "react";
import { getDepartments } from "../API/getData";
import { postDepartment } from "../API/postData";
import { JsonCreateModif } from "../API/Json";

const FormDepartment = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

  const [departmentCode, setDepartmentCode] = useState("");

  const fetchDepartment = async () => {
    try {
      setLoading(true);
      const response = await getDepartments();
      if (response.length > 0) {
        const DCode = response.filter(
          (item) => item.DepCode && item.DepCode.startsWith("D")
        );

        if (DCode.length > 0) {
          const lastCode = DCode[DCode.length - 1].DepCode;
          const nextNumber = parseInt(lastCode.substr(1)) + 1;
          setDepartmentCode(`D${nextNumber.toString().padStart(2, "0")}`);
        } else {
          setDepartmentCode("D01");
        }
      } else {
        setDepartmentCode("D01");
      }
    } catch (error) {
      setDepartmentCode("D01");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ depCode: departmentCode });
  }, [departmentCode, form]);

  const handleSubmit = async (values) => {
    console.log("Send data:", values);

    try {
      const payload = {
        ...values,
        ...JsonCreateModif,
      };

      const response = await postDepartment(payload);
      messageApi.open({
        type: "success",
        content: response.data.statusMessage,
      });

      navigate("/master/department");
    } catch (error) {
      console.log(error);
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
                label="Code"
                name="depCode"
                rules={[
                  {
                    required: true,
                    message: "Please input Code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Name"
                name="depName"
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
              <Form.Item label="Description" name="description">
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item name="isSuspend" valuePropName="checked" initialValue={false}>
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
