import { useEffect, useState } from "react";
import { Col, Form, Input, Row } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { getVendor } from "../../../../Api/Master/getData";
import { postVendor } from "../../../../Api/Master/postData";

const FormVendor = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);
  const [vendorCode, setVendorCode] = useState("");

  useEffect(() => {
    form.setFieldsValue({
      branchcode: "00001"
    })
  }, [form]);


  const fetchVendor = async () => {
    try {
      setLoading(true);
      const response = await getVendor();
      if (response.length > 0) {
        const BCode = response.filter(
          (item) => item.VendorCode && item.VendorCode.startsWith("VR")
        );
        if (BCode.length > 0) {
          const lastCode = BCode[BCode.length - 1].VendorCode;
          const nextNumber = parseInt(lastCode.substr(2)) + 1;
          setVendorCode(`VR${nextNumber.toString().padStart(2, "0")}`);
        } else {
          setVendorCode("VR01");
        }
      } else {
        setVendorCode("VR01");
      }
    } catch (error) {
      setVendorCode("VR01");
      console.log(error.response.statusText);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVendor();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ VendorCode: vendorCode });
  }, [vendorCode, form]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      setLoading(true);
      const payload = {
        ...values,
      }
      console.log(payload);
      
      const response = await postVendor(payload);
      messageApi.open({
        type: 'success',
        content: response.data.msg,
      });
      navigate("/master/vendor");
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
        <HeaderTitle title="VENDOR" subtitle="form data a vendor" />
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
                label="Branch Code"
                name="branchcode"
                rules={[
                  {
                    required: true,
                    message: "Please input your Branch Code!",
                  },
                ]}
              >
                <Input readOnly />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Vendor Code"
                name="vendorcode"
                rules={[
                  {
                    required: true,
                    message: "Please input your Vendor Code!",
                  },
                ]}
              >
                <Input maxLength={5} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
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
                label="Postal Code"
                name="postalcode"
                rules={[
                  {
                    required: true,
                    message: "Please input your Postal Code!",
                  },
                ]}
              >
                <Input maxLength={5} />
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
                label="NPWP"
                name="npwp"
                rules={[
                  {
                    required: true,
                    message: "Please input your NPWP!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
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
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Description" name="Description">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <ButtonSubmit onReset={onReset} />
        </Form>
      </div>
    </>
  );
};

export default FormVendor;
