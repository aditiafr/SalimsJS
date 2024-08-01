import { Col, Form, Input, Row } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { useEffect, useState } from "react";
import { getWarehouse } from "../API/getData";
import { JsonCreateModif } from "../API/Json";
import { postWarehouse } from "../API/postData";

const FormWarehouse = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

  const [warehouseCode, setWarehouseCode] = useState("");

  const fetchWarehouse = async () => {
    try {
      setLoading(true);
      const response = await getWarehouse();
      if (response.length > 0) {
        const BCode = response.filter(
          (item) => item.WarehouseCode && item.WarehouseCode.startsWith("WH")
        );
        if (BCode.length > 0) {
          const lastCode = BCode[BCode.length - 1].WarehouseCode;
          const nextNumber = parseInt(lastCode.substr(2)) + 1;
          setWarehouseCode(`WH${nextNumber.toString().padStart(2, "0")}`);
        } else {
          setWarehouseCode("WH01");
        }
      } else {
        setWarehouseCode("WH01");
      }
    } catch (error) {
      setWarehouseCode("WH01");
      console.log(error.response.statusText);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWarehouse();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ WarehouseCode: warehouseCode });
  }, [warehouseCode, form]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const modifiedValues = {
        ...values,
        ...JsonCreateModif
      }
      const response = await postWarehouse(modifiedValues);
      messageApi.open({
        type: 'success',
        content: response.data.statusMessage,
      });
      navigate("/master/warehouse");
    } catch (error) {
      console.log(error);
    }
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
        <HeaderTitle title="WAREHOUSE" subtitle="form data a warehouse" />
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
                label="Warehouse Code"
                name="WarehouseCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your Warehouse Code!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Warehouse Name"
                name="WarehouseName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Warehouse Name!",
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
                    message: "Please input your Address!",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Phone"
                name="Phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Fax"
                name="Fax"
                rules={[
                  {
                    required: true,
                    message: "Please input your Fax!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Contact"
                name="Contact"
                rules={[
                  {
                    required: true,
                    message: "Please input your Contact!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="ZIP Code"
                name="ZIPCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your ZIP Code!",
                  },
                ]}
              >
                <Input maxLength={5} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="City"
                name="City"
                rules={[
                  {
                    required: true,
                    message: "Please input your City!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Country"
                name="Country"
                rules={[
                  {
                    required: true,
                    message: "Please input your Country!",
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
          <ButtonSubmit onReset={onReset} onLoading={loading} />
        </Form>
      </div>
    </>
  );
};

export default FormWarehouse;
