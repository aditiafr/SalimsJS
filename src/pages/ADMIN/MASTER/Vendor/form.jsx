import { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { postVendor } from "../../../../Api/Master/postData";
import { PrefixGlobal } from "../../../../components/Dashboard/Global/Helper";
import { getVendorNextCode } from "../../../../Api/Master/getData";

const FormVendor = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const prefix = PrefixGlobal();
  const [vendorCode, setVendorCode] = useState("");

  useEffect(() => {
    const fetchNextCode = async () => {
      try {
        const res = await getVendorNextCode();
        setVendorCode(res.vendorcode);

      } catch (error) {
        console.log();
      }
    }
    fetchNextCode();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let payload = {
        ...values,
        branchcode: "0001"
      };
      if (!values.vendorcode) {
        form.setFieldsValue({ vendorcode: vendorCode });
        payload = {
          ...payload,
          vendorcode: vendorCode
        }
      }
      
      const response = await postVendor(payload);
      message.success(response.data.message);
      navigate("/master/vendor");
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
  };

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="VENDOR" subtitle="form data a vendor" />
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
              label="Vendor Code"
              name="vendorcode"
              rules={[
                {
                  validator: prefix,
                },
              ]}
            >
              <Input maxLength={6} />
            </Form.Item>

            <Form.Item
              label="Vendor Name"
              name="vendorname"
              rules={[
                {
                  required: true,
                  message: "Please input your Vendor Name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your Address!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Address 2"
              name="address2"
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input your City!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Postal Code"
              name="postalcode"
              rules={[
                {
                  required: true,
                  message: "Please input your Postal Code!",
                },
              ]}
            >
              <Input maxLength={5} onKeyPress={handleOnKeyPress} />
            </Form.Item>

            <Form.Item
              label="Country"
              name="country"
              rules={[
                {
                  required: true,
                  message: "Please input your Country!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email Address!",
                },
                {
                  type: 'email',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your Phone Number!",
                },
              ]}
            >
              <Input onKeyPress={handleOnKeyPress} />
            </Form.Item>

            <Form.Item
              label="Hp Number"
              name="hp"
              rules={[
                {
                  required: true,
                  message: "Please input your Hp Number!",
                },
              ]}
            >
              <Input onKeyPress={handleOnKeyPress} />
            </Form.Item>

            <Form.Item
              label="Fax Code"
              name="fax"
              rules={[
                {
                  required: true,
                  message: "Please input your Fax Code!",
                },
              ]}
            >
              <Input onKeyPress={handleOnKeyPress} />
            </Form.Item>

            <Form.Item
              label="NPWP"
              name="npwp"
              rules={[
                {
                  required: true,
                  message: "Please input your NPWP!",
                },
              ]}
            >
              <Input onKeyPress={handleOnKeyPress} />
            </Form.Item>

            <Form.Item
              label="Contact Person"
              name="contactperson"
              rules={[
                {
                  required: true,
                  message: "Please input your Contact Person!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>

          </div>

          <ButtonSubmit onReset={onReset} onLoading={loading} />

        </Form>
      </div>
    </>
  );
};
export default FormVendor;
