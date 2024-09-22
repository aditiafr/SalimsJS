import { Form, Input, Col, Row, Checkbox } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";

const FormPriceListM = () => {
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
          title="PRICE LIST M"
          subtitle="form data a sub price list M"
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
                label="PriceName"
                name="PriceName"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Description"
                name="Description"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="IsSuspend"
                name="IsSuspend"
                valuePropName="checked"
                initialValue={false}
              >
                <Checkbox>IsSuspend</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <ButtonSubmit onReset={onReset} />
        </Form>
      </div>
    </>
  );
};

export default FormPriceListM;
