import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { postBuilding } from "../API/postData";
import { JsonCreateModif } from "../API/Json";
import { useMessageContext } from '../../../../components/Dashboard/Global/MessageContext';
import { getBuilding } from '../API/getData';

const FormBuilding = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

  const [buildingCode, setBuildingCode] = useState("");

  const fetchBuilding = async () => {
    try {
      setLoading(true);
      const response = await getBuilding();
      if (response.length > 0) {
        const BCode = response.filter(
          (item) => item.BuildingCode && item.BuildingCode.startsWith("BLD")
        );
        if (BCode.length > 0) {
          const lastCode = BCode[BCode.length - 1].BuildingCode;
          const nextNumber = parseInt(lastCode.substr(3)) + 1;
          setBuildingCode(`BLD${nextNumber.toString().padStart(2, "0")}`);
        } else {
          setBuildingCode("BLD01");
        }
      } else {
        setBuildingCode("BLD01");
      }
    } catch (error) {
      setBuildingCode("BLD01");
      console.log(error.response.statusText);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBuilding();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ BuildingCode: buildingCode });
  }, [buildingCode, form]);

  const handleSubmit = async (values) => {
    console.log("Success:", values);
    try {
      const modifiedValues = {
        ...values,
        ...JsonCreateModif
      }
      const response = await postBuilding(modifiedValues);
      messageApi.open({
        type: 'success',
        content: response.data.statusMessage,
      });
      navigate("/master/building");
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
                name="BuildingCode"
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
                name="BuildingName"
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

export default FormBuilding;
