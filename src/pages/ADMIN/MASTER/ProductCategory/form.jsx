import { Form, Input, Col, Row, Checkbox } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { useEffect, useState } from "react";
import { getProductCategoryNextCode } from "../../../../Api/Master/getData";
import { ProductCategoryMapToHttp } from "../../../../mapper/ProductCategory";
import { postProductCategory } from "../../../../Api/Master/postData";

const FormProductCategory = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);
  const [productCategoryCode, setProductCategory] = useState("");

  const fetchProductCategoryNextCode = async () => {
    try {
      setLoading(true);
      const nextProductCategoryCode = await getProductCategoryNextCode();
    
      setProductCategory(nextProductCategoryCode);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductCategoryNextCode();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ProductCategoryCode: productCategoryCode });
  }, [productCategoryCode, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = ProductCategoryMapToHttp(values);

      const response = await postProductCategory(payload);
      messageApi.open({
        type: "success",
        content: response.data.message,
      });

      navigate("/master/product-category");
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
          title="PRODUCT CATEGORY"
          subtitle="form data a product category"
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
                name="ProductCategoryCode"
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
                name="ProductCategoryName"
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
          <ButtonSubmit onReset={onReset} onLoading={loading}/>
        </Form>
      </div>
    </>
  );
};

export default FormProductCategory;
