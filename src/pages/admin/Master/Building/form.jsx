import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useMessageContext } from '../../../../components/Dashboard/Global/MessageContext';
import { getBuilding } from '../../../../Api/Master/getData';
import { postBuilding } from '../../../../Api/Master/postData';

const FormBuilding = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

  const [buildingCode, setBuildingCode] = useState("");

  const fetchBuilding = async () => {
    try {
      const response = await getBuilding();
      if (response.length > 0) {
        const BCode = response.filter(
          (item) => item.buildingcode && item.buildingcode.startsWith("BC")
        );
        if (BCode.length > 0) {
          const lastCode = BCode[BCode.length - 1].buildingcode;
          const nextNumber = parseInt(lastCode.substr(2)) + 1;
          setBuildingCode(`BC${nextNumber.toString().padStart(3, "0")}`);
        } else {
          setBuildingCode("BC001");
        }
      } else {
        setBuildingCode("BC001");
      }
    } catch (error) {
      setBuildingCode("BC001");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBuilding();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ buildingcode: buildingCode });
  }, [buildingCode, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await postBuilding(values);
      messageApi.open({
        type: 'success',
        content: response.data.msg,
      });

      navigate("/master/building");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
        <HeaderTitle title="BUILDING" subtitle="form data a building" />
      </div>
      <div className="w-full bg-white rounded-lg">
        <Form
          name="basic"
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row gutter={30} style={{ padding: "28px" }}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Building Code"
                name="buildingcode"
                rules={[
                  {
                    required: true,
                    message: "Please input your Building Code!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Building Name"
                name="buildingname"
                rules={[
                  {
                    required: true,
                    message: "Please input your Building Name!",
                  },
                ]}
              >
                <Input autoFocus />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
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
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Phone"
                name="phone"
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
                name="fax"
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
                name="contact"
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
                name="zipcode"
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
            </Col>

            <Col xs={24} sm={12}>
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
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Description" name="description">
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

export default FormBuilding;
