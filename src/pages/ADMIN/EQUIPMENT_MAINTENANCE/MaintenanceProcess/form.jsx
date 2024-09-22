import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { Col, DatePicker, Form, Input, Row } from "antd";

const FormMaintenanceProcess = () => {
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
        <HeaderTitle title="MAINTENANCE PROCESS" subtitle="form data a maintenance process" />
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
                label="MP Number"
                name="MPNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input MP Number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="MP Date"
                name="MPDate"
                rules={[
                  {
                    required: true,
                    message: "Please input MP Date!",
                  },
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Equipment Code"
                name="EquipmentCode"
                rules={[
                  {
                    required: true,
                    message: "Please input Equipment Code!",
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

            <Col xs={24} sm={12}>
              <Form.Item
                label="MR Number"
                name="MRNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input MR Number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Status"
                name="Status"
                rules={[
                  {
                    required: true,
                    message: "Please input Status!",
                  },
                ]}
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

export default FormMaintenanceProcess;
