import { Form, Input, Col, Row, Checkbox } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { useEffect, useState } from "react";
import { getPackingTypeNextCode } from "../../../../Api/Master/getData";
import { PackingTypeMapToHttp } from "../../../../mapper/PackingType";
import { postPackingType } from "../../../../Api/Master/postData";

const FormPackingType = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);
  const [packingTypeCode, setPackingTypeCode] = useState("");

  const fetchPackingTypeNextCode = async () => {
    try {
      setLoading(true);
      const nextPackingTypeCode = await getPackingTypeNextCode();

      setPackingTypeCode(nextPackingTypeCode);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackingTypeNextCode();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ PackingTypeCode: packingTypeCode });
  }, [packingTypeCode, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = PackingTypeMapToHttp(values);

      const response = await postPackingType(payload);
      messageApi.open({
        type: "success",
        content: response.data.message,
      });

      navigate("/master/packing-type");
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
          title="PACKING TYPE"
          subtitle="form data a packing type"
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
                label="Packing Type Code"
                name="PackingTypeCode"
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
                label="Packing Type Name"
                name="PackingTypeName"
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
              <Form.Item label="Description" name="Description">
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item name="IsSuspend" valuePropName="checked" initialValue={false}>
                <Checkbox>Suspended</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <ButtonSubmit onReset={onReset} onLoading={loading}/>
        </Form>
      </div>
    </>
  );
};

export default FormPackingType;
