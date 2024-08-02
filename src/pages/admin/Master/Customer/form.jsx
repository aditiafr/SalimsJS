import { Form, Input, Col, Row, Table, Tag } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { useEffect, useState } from "react";
import { getCustomer } from "../API/getData";
import { JsonCreateModif } from "../API/Json";
import { postCustomer } from "../API/postData";

const FormCustomer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

  const [customerCode, setCustomerCode] = useState("");

  const fetchCustomer = async () => {
    try {
      const response = await getCustomer();
      if (response.length > 0) {
        const BCode = response.filter(
          (item) => item.CustomerCode && item.CustomerCode.startsWith("CS")
        );
        if (BCode.length > 0) {
          const lastCode = BCode[BCode.length - 1].CustomerCode;
          const nextNumber = parseInt(lastCode.substr(2)) + 1;
          setCustomerCode(`CS${nextNumber.toString().padStart(2, "0")}`);
        } else {
          setCustomerCode("CS01");
        }
      } else {
        setCustomerCode("CS01");
      }
    } catch (error) {
      setCustomerCode("CS01");
      console.log(error.response.statusText);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ CustomerCode: customerCode });
  }, [customerCode, form]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      setLoading(true);
      const modifiedValues = {
        ...values,
        ...JsonCreateModif
      }
      const response = await postCustomer(modifiedValues);
      messageApi.open({
        type: 'success',
        content: response.data.statusMessage,
      });
      navigate("/master/customer");
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

  const columns = [
    {
      title: "key",
      dataIndex: "key",
      key: "key",
      width: 150,
    },
    {
      title: "User",
      dataIndex: "User",
      key: "User",
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      width: 150,
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      width: 150,
    },
    {
      title: "Password",
      dataIndex: "Password",
      key: "Password",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 150,
    },
    {
      title: "Suspended",
      dataIndex: "Suspended",
      key: "Suspended",
      width: 120,
      render: (suspended) => (
        <Tag color={suspended ? "red" : "green"}>
          {suspended ? "Yes" : "No"}
        </Tag>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      User: "Ahmad001",
      Name: "Ahmad",
      Phone: "0812398142",
      Password: "*******",
      Description: "Data 1",
      Suspended: false,
    },
    {
      key: "2",
      User: "Ahmad002",
      Name: "Ahmad",
      Phone: "0812398142",
      Password: "*******",
      Description: "Data 2",
      Suspended: true,
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="CUSTOMER"
          subtitle="form data a customer"
        />
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
                label="Customer Code"
                name="CustomerCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your Customer Code!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Customer Name"
                name="CustomerName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Customer Name!",
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
                label="Email"
                name="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
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

          <Row style={{ padding: "28px" }}>
            <Table
              // loading={true}
              //   rowSelection
              columns={columns}
              dataSource={data}
            //   pagination={{
            //     showSizeChanger: true,
            //     defaultPageSize: 10,
            //   }}
            //   scroll={{
            //     x: 1000,
            //   }}
            />
          </Row>

          <ButtonSubmit onReset={onReset} onLoading={loading} />
        </Form>
      </div>
    </>
  );
};

export default FormCustomer;
