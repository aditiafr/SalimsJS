import { Form, Input, InputNumber, message, TimePicker } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { PrefixGlobal } from "../../../../components/Dashboard/Global/Helper";
import { useEffect, useState } from "react";
import { getTimePointNextCode } from "../../../../Api/Master/getData";
import dayjs from "dayjs";
import { postTimePoint } from "../../../../Api/Master/postData";
import { useNavigate } from "react-router-dom";

const FormTimePoint = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
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


  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let payload = {
        ...values,
        intervaltime: dayjs(values.intervaltime).format("HH:mm"),
        powmintime: dayjs(values.powmintime).format("HH:mm"),
        powmaxtime: dayjs(values.powmaxtime).format("HH:mm"),
        twmintime: dayjs(values.twmintime).format("HH:mm"),
        twmaxtime: dayjs(values.twmaxtime).format("HH:mm"),
      };
      if (!values.timepointcode) {
        form.setFieldsValue({ timepointcode: TimePointCode })
        payload = {
          ...payload,
          timepointcode: TimePointCode
        }
      }
      console.log(payload);
      const res = await postTimePoint(payload);
      message.success(res.data.message);
      navigate('/master/time_point');
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
          name="form"
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          form={form}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 p-6">
            <Form.Item
              label="Time Point Code"
              name="timepointcode"
              rules={[
                {
                  validator: prefix,
                },
              ]}
            >
              <Input maxLength={6} placeholder="Input Time Point Code" />
            </Form.Item>

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
              <Input placeholder="Input Time Point Name" />
            </Form.Item>

            <div className="col-span-2">
              <p className="mb-2">Interval</p>
              <div className="flex justify-around border p-2 rounded-md gap-4">
                <Form.Item
                  label="Monthly"
                  name="monthly"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Monthly!",
                    },
                  ]}
                  className="w-full"
                >
                  <InputNumber min={1} max={12} defaultValue={0} className="w-full" />
                </Form.Item>
                <Form.Item
                  label="Day"
                  name="intervalday"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Day!",
                    },
                  ]}
                  className="w-full"
                >
                  <InputNumber min={1} defaultValue={0} className="w-full" />
                </Form.Item>
                <Form.Item
                  label="Time"
                  name="intervaltime"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Time!",
                    },
                  ]}
                  className="w-full"
                >
                  <TimePicker className="w-full" format={"HH:mm"} defaultValue={dayjs('00:00', 'HH:mm')} />
                </Form.Item>
              </div>
            </div>

            <div className="col-span-2 mt-4">
              <p className="mb-2">Pull Out Window</p>
              <div className="flex flex-col lg:flex-row gap-4 pt-2">
                <div className="relative flex justify-around border p-2 rounded-md gap-4 w-full">
                  <p className="absolute -top-3 left-3 bg-white px-1">Minimum</p>
                  <Form.Item
                    label="Day"
                    name="powminday"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Day!",
                      },
                    ]}
                    className="w-full"
                  >
                    <InputNumber min={1} defaultValue={0} className="w-full" />
                  </Form.Item>
                  <Form.Item
                    label="Time"
                    name="powmintime"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Time!",
                      },
                    ]}
                    className="w-full"
                  >
                    <TimePicker className="w-full" defaultValue={dayjs('00:00', 'HH:mm')} format={"HH:mm"} />
                  </Form.Item>
                </div>

                <div className="relative flex justify-around border p-2 rounded-md gap-4 w-full">
                  <p className="absolute -top-3 left-3 bg-white px-1">Maximum</p>
                  <Form.Item
                    label="Day"
                    name="powmaxday"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Day!",
                      },
                    ]}
                    className="w-full"
                  >
                    <InputNumber min={1} defaultValue={0} className="w-full" />
                  </Form.Item>
                  <Form.Item
                    label="Time"
                    name="powmaxtime"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Time!",
                      },
                    ]}
                    className="w-full"
                  >
                    <TimePicker className="w-full" defaultValue={dayjs('00:00', 'HH:mm')} format={"HH:mm"} />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="col-span-2 my-4">
              <p className="mb-2">Test Window</p>
              <div className="flex flex-col lg:flex-row gap-4 pt-2">
                <div className="relative flex justify-around border p-2 rounded-md gap-4 w-full">
                  <p className="absolute -top-3 left-3 bg-white px-1">Minimum</p>
                  <Form.Item
                    label="Day"
                    name="twminday"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Day!",
                      },
                    ]}
                    className="w-full"
                  >
                    <InputNumber min={1} defaultValue={0} className="w-full" />
                  </Form.Item>
                  <Form.Item
                    label="Time"
                    name="twmintime"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Time!",
                      },
                    ]}
                    className="w-full"
                  >
                    <TimePicker className="w-full" defaultValue={dayjs('00:00', 'HH:mm')} format={"HH:mm"} />
                  </Form.Item>
                </div>

                <div className="relative flex justify-around border p-2 rounded-md gap-4 w-full">
                  <p className="absolute -top-3 left-3 bg-white px-1">Maximum</p>
                  <Form.Item
                    label="Day"
                    name="twmaxday"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Day!",
                      },
                    ]}
                    className="w-full"
                  >
                    <InputNumber min={1} defaultValue={0} className="w-full" />
                  </Form.Item>
                  <Form.Item
                    label="Time"
                    name="twmaxtime"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Time!",
                      },
                    ]}
                    className="w-full"
                  >
                    <TimePicker className="w-full" defaultValue={dayjs('00:00', 'HH:mm')} format={"HH:mm"} />
                  </Form.Item>
                </div>
              </div>
            </div>

            <Form.Item label="Description" name="description" className="col-span-2">
              <Input.TextArea placeholder="Description" />
            </Form.Item>
          </div>

          <ButtonSubmit onReset={onReset} onLoading={loading} />

        </Form>
      </div>
    </>
  );
};

export default FormTimePoint;
