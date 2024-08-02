import { Form, Input, Col, Row, Checkbox } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { useEffect, useState } from "react";
import { getEquipmentType } from "../../../../Api/Master/getData";
import { JsonCreateModif } from "../../../../Api/Master/Json";
import { postEquipmentType } from "../../../../Api/Master/postData";

const FormEquipmentType = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

  const [equipmentTypeCode, setEquipmentTypeCode] = useState("");

  const fetchEquipmentType = async () => {
    try {
      setLoading(true);
      const response = await getEquipmentType();
      if (response.length > 0) {
        const ECode = response.filter(
          (item) => item.EquipmentTypeCode && item.EquipmentTypeCode.startsWith("EQ-")
        );

        if (ECode.length > 0) {
          const lastCode = ECode[ECode.length - 1].EquipmentTypeCode;
          const nextNumber = parseInt(lastCode.substr(3)) + 1;
          setEquipmentTypeCode(`EQ-${nextNumber.toString().padStart(3, "0")}`);
        } else {
          setEquipmentTypeCode("EQ-01");
        }
      } else {
        setEquipmentTypeCode("EQ-01");
      }
    } catch (error) {
      setEquipmentTypeCode("EQ-01");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipmentType();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ equipmentTypeCode: equipmentTypeCode });
  }, [equipmentTypeCode, form]);

  const handleSubmit = async (values) => {
    console.log("Send data:", values);

    try {
      const payload = {
        ...values,
        ...JsonCreateModif
      };

      const response = await postEquipmentType(payload);
      messageApi.open({
        type: "success",
        content: response.data.message,
      });

      navigate("/master/equipment-type");
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
          title="EQUIPMENT TYPE"
          subtitle="form data a equipemt type"
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
                label="Equipment Type Code"
                name="equipmentTypeCode"
                rules={[
                  {
                    required: true,
                    message: "Please input Equipment Type Code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Equipment Type Name"
                name="equipmentTypeName"
                rules={[
                  {
                    required: true,
                    message: "Please input Equipment Type Name!",
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

export default FormEquipmentType;
