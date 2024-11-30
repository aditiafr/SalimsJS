import { Form, Input, Col, Row, Checkbox, message } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import FormPriceListDetail from "./PriceListDetail/form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { postPriceList } from "../../../../Api/Master/postData";
import { getPriceListNextCode } from "../../../../Api/Master/getData";

const FormPriceList = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [priceListCode, setPriceListCode] = useState("");
  const [priceListDetail, setPriceListDetail] = useState([]);

  const fetchPriceListNextCode = async () => {
    try {
      setLoading(true);
      const nextPriceListCode = await getPriceListNextCode();
      setPriceListCode(nextPriceListCode);
      console.log(nextPriceListCode);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriceListNextCode();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ pricecode: priceListCode });
  }, [priceListCode, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        detail: priceListDetail,
      };

      const response = await postPriceList(payload);
      message.success(response.data.message);
      navigate("/master/pricelist");
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
          title="PRICE LIST"
          subtitle="form data a sub price list"
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
                label="Price Code"
                name="pricecode"
                rules={[
                  {
                    required: true,
                    message: "Please input Price Code!",
                  },
                ]}
              >
                <Input maxLength={6} />
              </Form.Item>

              <Form.Item
                label="Price Name"
                name="pricename"
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

            <div className="m-4 p-4 border rounded-md">
              <FormPriceListDetail onSaveData={(values) => setPriceListDetail(values)} />
            </div>
          </Row>
          <ButtonSubmit onReset={onReset} onLoading={loading} />
        </Form>
      </div>
    </>
  );
};

export default FormPriceList;
