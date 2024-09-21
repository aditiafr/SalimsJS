import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { getParameterNextCode } from '../../../../Api/Master/getData';
import { postParameter } from '../../../../Api/Master/postData';
import { PrefixGlobal } from '../../../../components/Dashboard/Global/Helper';

const FormParameter = () => {

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const prefix = PrefixGlobal();
  const [ParameterCode, setParameterCode] = useState("");

  useEffect(() => {
    const fetchNextCode = async () => {
      try {
        const res = await getParameterNextCode();
        setParameterCode(res.parcode);

      } catch (error) {
        console.log(error);
      }
    }
    fetchNextCode();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let payload = values;
      if (!values.parcode) {
        form.setFieldsValue({ parcode: ParameterCode });
        payload = {
          ...payload,
          parcode: ParameterCode
        }
      }
      console.log(payload);
      // const response = await postParameter(payload);
      // message.success(response.data.message);
      // navigate("/master/parameter");
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error);
    }
    setLoading(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleOnKeyPress = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="PARAMETER" subtitle="form data a parameter" />
      </div>
      <div className="w-full bg-white rounded-lg">
        <Form
          name="basic"
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          form={form}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 p-6">

            <Form.Item
              label="Parameter Code"
              name="parcode"
              rules={[
                {
                  validator: prefix,
                },
              ]}
            >
              <Input placeholder="Input Parameter Code" maxLength={6} />
            </Form.Item>

            <Form.Item
              label="Parameter Name"
              name="parname"
              rules={[
                {
                  required: true,
                  message: "Please input your Parameter Name!",
                },
              ]}
            >
              <Input placeholder="Input Parameter Name" />
            </Form.Item>

            <Form.Item
              label="Method Id"
              name="methodid"
              rules={[
                {
                  required: true,
                  message: "Please input your Method Id!",
                },
              ]}
            >
              <Input placeholder="Input Method Id" />
            </Form.Item>

            <Form.Item
              label="Preservation"
              name="preservation"
              rules={[
                {
                  required: true,
                  message: "Please input your Preservation!",
                },
              ]}
            >
              <Input placeholder="Input Preservation" />
            </Form.Item>

            <Form.Item
              label="Storage Time Limit"
              name="storagetimelimit"
              rules={[
                {
                  required: true,
                  message: "Please input your Storage Time Limit!",
                },
              ]}
            >
              <Input placeholder="Input Storage Time Limit" />
            </Form.Item>

            <Form.Item
              label="Product Code"
              name="prodcatcode"
              rules={[
                {
                  required: true,
                  message: "Please input your Product Code!",
                },
              ]}
            >
              <Input placeholder="Input Product Code" />
            </Form.Item>

            <Form.Item
              label="Product Name"
              name="prodcatname"
              rules={[
                {
                  required: true,
                  message: "Please input your Product Name!",
                },
              ]}
            >
              <Input placeholder="Input Product Name" />
            </Form.Item>

            <Form.Item
              label="Unit Code"
              name="unitcode"
              rules={[
                {
                  required: true,
                  message: "Please input your Unit Code!",
                },
              ]}
            >
              <Input placeholder="Input Unit Code" />
            </Form.Item>

            <Form.Item
              label="Unit Name"
              name="unitname"
              rules={[
                {
                  required: true,
                  message: "Please input your Unit Name!",
                },
              ]}
            >
              <Input placeholder="Input Unit Name" />
            </Form.Item>

            <Form.Item
              label="Alias Name"
              name="aliasname"
              rules={[
                {
                  required: true,
                  message: "Please input your Alias Name!",
                },
              ]}
            >
              <Input placeholder="Input Alias Name" />
            </Form.Item>

            <Form.Item
              label="Duration"
              name="duration"
              rules={[
                {
                  required: true,
                  message: "Please input your Duration!",
                },
              ]}
            >
              <Input placeholder="Input Duration" />
            </Form.Item>

            <Form.Item
              label="Akreditasi"
              name="akreditasi"
              rules={[
                {
                  required: true,
                  message: "Please input your Akreditasi!",
                },
              ]}
            >
              <Input placeholder="Input Akreditasi" />
            </Form.Item>

            <Form.Item
              label="Result Unit Code"
              name="resultunitcode"
              rules={[
                {
                  required: true,
                  message: "Please input your Result Unit Code!",
                },
              ]}
            >
              <Input placeholder="Input Result Unit Code" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your Price!",
                },
              ]}
            >
              <Input placeholder="Input Price" />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea placeholder="Input Description" />
            </Form.Item>

          </div>

          <ButtonSubmit onReset={onReset} onLoading={loading} />

        </Form>
      </div>
    </>
  );
};

export default FormParameter;
