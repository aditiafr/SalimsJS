import { Form, Input, Col, Row, Checkbox } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";

const FormZona = () => {
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
          title="ZONA"
          subtitle="form data a zona"
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
                label="ZonaCode"
                name="ZonaCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your ZonaCode!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>

              <Form.Item
                label="ZonaName"
                name="ZonaName"
                rules={[
                  {
                    required: true,
                    message: "Please input your ZonaName!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Address"
                name="Address"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="ZIP Code"
                name="ZIPCode"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="City"
                name="City"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="LatLong"
                name="LatLong"
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Description" name="Description">
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item name="IsSuspend" valuePropName="checked" initialValue={false}>
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

export default FormZona;
