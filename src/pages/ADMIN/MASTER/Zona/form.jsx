import { Form, Input, Col, Row, Checkbox, message } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { useEffect, useState } from "react";
import { getZonaNextCode } from "../../../../Api/Master/getData";
import { postZona } from "../../../../Api/Master/postData";

const FormZona = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);
  const [zonaCode, setZonaCode] = useState("");

  const fetchZonaNextCode = async () => {
    try {
      setLoading(true);
      const nextZonaCode = await getZonaNextCode();

      setZonaCode(nextZonaCode);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZonaNextCode();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ zonacode: zonaCode });
  }, [zonaCode, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let payload = values;

      if (!payload.zonacode) {
        payload = { ...payload, zonacode: zonaCode };
      }

      const response = await postZona(payload);
      message.success(response.data.message);

      navigate("/master/zona");
    } catch (error) {
      message.error(error.response.data.message);
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
          title="ZONA"
          subtitle="form data a zona"
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
                label="Zona Code"
                name="zonacode"
                rules={[
                  {
                    required: false,
                    message: "Please input Zona Code!",
                  },
                ]}
              >
                <Input maxLength={5} />
              </Form.Item>

              <Form.Item
                label="Zona Name"
                name="zonaname"
                rules={[
                  {
                    required: true,
                    message: "Please input Zona Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
              >
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item
                label="ZIP Code"
                name="zipcode"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Lat Long"
                name="latlong"
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Description" name="description">
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item name="issuspend" valuePropName="checked" initialValue={false}>
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

export default FormZona;
