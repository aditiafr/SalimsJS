import { Form, Input, Col, Row, Checkbox } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { useState } from "react";
import { postEquipmentType } from "../../../../Api/Master/postData";
import { EquipmentTypeMapToHttp } from "../../../../mapper/EquipmentType";

const FormEquipmentType = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = EquipmentTypeMapToHttp(values);

      const response = await postEquipmentType(payload);
      messageApi.open({
        type: "success",
        content: response.data.msg,
      });

      navigate("/master/equipment-type");
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
                name="EquipmentTypeCode"
                rules={[
                  {
                    required: false,
                    message: "Please input Equipment Type Code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Equipment Type Name"
                name="EquipmentTypeName"
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

export default FormEquipmentType;
