import { Form, Input, Col, Row } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";

const FormPriceListD = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
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
          title="PRICE LIST D"
          subtitle="form data a price list d"
        />
      </div>
      <div className="w-full bg-white rounded-lg">
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row gutter={30} style={{ padding: "28px" }}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="BranchCode"
                name="BranchCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your BranchCode!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>

              <Form.Item
                label="PriceCode"
                name="PriceCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your PriceCode!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>

              <Form.Item
                label="ProdCode"
                name="ProdCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your ProdCode!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>

              <Form.Item
                label="DefPrice"
                name="DefPrice"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="DiscP"
                name="DiscP"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="DiscM"
                name="DiscM"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="PriceList"
                name="PriceList"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <ButtonSubmit onReset={onReset} />
        </Form>
      </div>
    </>
  );
};

export default FormPriceListD;
