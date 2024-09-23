import { Form, Input, Col, Row, Checkbox } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { useEffect, useState } from "react";
import { getProductTypeNextCode } from "../../../../Api/Master/getData";
import { postProductType } from "../../../../Api/Master/postData";
import { ProductTypeMapToHttp } from "../../../../mapper/ProductType";

const FormProductType = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);
  const [productTypeCode, setProductTypeCode] = useState("");

  const fetchProductTypeNextCode = async () => {
    try {
      setLoading(true);
      const nextProductTypeCode = await getProductTypeNextCode();

      setProductTypeCode(nextProductTypeCode);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductTypeNextCode();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ProductTypeCode: productTypeCode });
  }, [productTypeCode, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = ProductTypeMapToHttp(values);

      const response = await postProductType(payload);
      messageApi.open({
        type: "success",
        content: response.data.message,
      });

      navigate("/master/product-type");
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
          title="PRODUCT TYPE"
          subtitle="form data a product type"
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
                name="ProductTypeCode"
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
                name="ProductTypeName"
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
          <ButtonSubmit onReset={onReset} />
        </Form>
      </div>
    </>
  );
};

export default FormProductType;
