import { Form, Input, message } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { postWarehouse } from "../../../../Api/Master/postData";
import { getWarehouseNextCode } from "../../../../Api/Master/getData";
import { PrefixGlobal } from "../../../../components/Dashboard/Global/Helper";

const FormWarehouse = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const prefix = PrefixGlobal();
  const [warehouseCode, setWarehouseCode] = useState("");

  useEffect(() => {
    const fetchNextCode = async () => {
      try {
        const res = await getWarehouseNextCode();
        setWarehouseCode(res.warehousecode);

      } catch (error) {
        console.log();
      }
    }
    fetchNextCode();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let payload = values;
      if (!values.warehousecode) {
        form.setFieldsValue({ warehousecode: warehouseCode });
        payload = {
          ...payload,
          warehousecode: warehouseCode
        }
      }
      console.log(payload);
      const response = await postWarehouse(payload);
      message.success(response.data.message);
      navigate("/master/warehouse");
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
        <HeaderTitle title="WAREHOUSE" subtitle="form data a warehouse" />
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
              label="Warehouse Code"
              name="warehousecode"
              rules={[
                {
                  validator: prefix,
                },
              ]}
            >
              <Input placeholder="Input Warehouse Code" maxLength={6} />
            </Form.Item>

            <Form.Item
              label="Warehouse Name"
              name="warehousename"
              rules={[
                {
                  required: true,
                  message: "Please input your Warehouse Name!",
                },
              ]}
            >
              <Input placeholder="Input Warehouse Name" autoFocus />
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
              <Input.TextArea placeholder="Input Address" />
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
              <Input placeholder="Input City" />
            </Form.Item>

            <Form.Item
              label="ZIP Code"
              name="zipcode"
              rules={[
                {
                  required: true,
                  message: "Please input your ZIP Code!",
                },
              ]}
            >
              <Input
                placeholder="Input ZIP Code"
                maxLength={5}
                onKeyPress={handleOnKeyPress}
              />
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
              <Input placeholder="Input Country" />
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
              <Input
                placeholder="Input Phone Number Example(08123456789)"
                onKeyPress={handleOnKeyPress}
              />
            </Form.Item>

            <Form.Item
              label="Fax Number"
              name="fax"
              rules={[
                {
                  required: true,
                  message: "Please input your Fax Number!",
                },
              ]}
            >
              <Input placeholder="Input Fax Number" onKeyPress={handleOnKeyPress} />
            </Form.Item>

            <Form.Item
              label="Contact Name"
              name="contact"
              rules={[
                {
                  required: true,
                  message: "Please input your Contact Name!",
                },
              ]}
            >
              <Input placeholder="Input Contact Name" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
            >
              <Input.TextArea placeholder="Input Description" />
            </Form.Item>

          </div>

          <ButtonSubmit onReset={onReset} onLoading={loading} />
        </Form>
      </div>
    </>
  );
};

export default FormWarehouse;
