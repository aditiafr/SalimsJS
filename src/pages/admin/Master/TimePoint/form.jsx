import { Form, Input, Col, Row, InputNumber, TimePicker } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { PrefixGlobal } from "../../../../components/Dashboard/Global/Helper";
import { useEffect, useState } from "react";
import { getTimePointNextCode } from "../../../../Api/Master/getData";

const FormTimePoint = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const prefix = PrefixGlobal();
  const [TimePointCode, setTimePointCode] = useState("");

  useEffect(() => {
    const fetchNextCode = async () => {
      try {
        const res = await getTimePointNextCode();
        setTimePointCode(res.timepointcode);

      } catch (error) {
        console.log(error);
      }
    }
    fetchNextCode();
  }, []);


  const handleSubmit = (values) => {
    try {
      setLoading(true);
      let payload = values;
      if (!values.timepointcode) {
        form.setFieldsValue({ timepointcode: TimePointCode })
        payload = {
          ...payload,
          timepointcode: TimePointCode
        }
        console.log(payload);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TIME POINT" subtitle="form data a time point" />
      </div>
      <div className="w-full bg-white rounded-lg">
        <Form
          name="basic"
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          form={form}
        >
          <Row gutter={30} style={{ padding: "28px" }}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Time Point Code"
                name="timepointcode"
                rules={[
                  {
                    validator: prefix,
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Time Point Name"
                name="timepointname"
                rules={[
                  {
                    required: true,
                    message: "Please input your Time Point Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Interval"
                name="Interval"
              >
                <div className="flex justify-around border p-2 rounded-md">
                  <Form.Item
                    label="Month"
                    name="Month"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    label="Day"
                    name="Day"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    label="Time"
                    name="Time"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <TimePicker />
                  </Form.Item>
                </div>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Description" name="Description">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <ButtonSubmit onReset={onReset} onLoading={loading} />
        </Form>
      </div>
    </>
  );
};

export default FormTimePoint;
