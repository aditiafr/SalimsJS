import { Col, DatePicker, Form, Input, Row } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";

const FormTakingSample = () => {
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
        <HeaderTitle title="TAKING SAMPLE" subtitle="form data a taking sample" />
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
                label="TS Number"
                name="TSNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input TS Number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Periode"
                name="Periode"
                rules={[
                  {
                    required: true,
                    message: "Please input Periode!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="TS Date"
                name="Date"
                rules={[
                  {
                    required: true,
                    message: "Please input TS Date!",
                  },
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Sample Code"
                name="SampleCode"
                rules={[
                  {
                    required: true,
                    message: "Please input Sample Code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="PTS Number"
                name="PTSNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input PTS Number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Sample No"
                name="SampleNo"
                rules={[
                  {
                    required: true,
                    message: "Please input Sample No!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Map Code"
                name="MapCode"
                rules={[
                  {
                    required: true,
                    message: "Please input Map Code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Address"
                name="Address"
                rules={[
                  {
                    required: true,
                    message: "Please input Address!",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Weather"
                name="Weather"
                rules={[
                  {
                    required: true,
                    message: "Please input Weather!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Wind Direction"
                name="WindDirection"
                rules={[
                  {
                    required: true,
                    message: "Please input Wind Direction!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Temperature"
                name="Temperature"
                rules={[
                  {
                    required: true,
                    message: "Please input your Temperature!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Description" name="Description">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <ButtonSubmit onReset={onReset} />
        </Form>
      </div>
    </>
  );
};

export default FormTakingSample;
