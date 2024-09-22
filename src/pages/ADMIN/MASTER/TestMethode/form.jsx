import { Col, Form, Input, Row } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { useState } from "react";
import { JsonCreateModif } from "../../../../Api/Master/Json";
import { postTestMethode } from "../../../../Api/Master/postData";

const FormTestMethode = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

  // const [testMethode, setTestMethode] = useState("");

  // const fetchTestMethode = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await getTestMethode();
  //     if (response.length > 0) {
  //       const BCode = response.filter(
  //         (item) => item.MethodId && item.MethodId.startsWith("BLD")
  //       );
  //       if (BCode.length > 0) {
  //         const lastCode = BCode[BCode.length - 1].MethodId;
  //         const nextNumber = parseInt(lastCode.substr(3)) + 1;
  //         setTestMethode(`BLD${nextNumber.toString().padStart(2, "0")}`);
  //       } else {
  //         setTestMethode("BLD01");
  //       }
  //     } else {
  //       setTestMethode("BLD01");
  //     }
  //   } catch (error) {
  //     setTestMethode("BLD01");
  //     console.log(error.response.statusText);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchTestMethode();
  // }, []);

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      setLoading(true);
      const modifiedValues = {
        ...values,
        ...JsonCreateModif
      }
      const response = await postTestMethode(modifiedValues);
      messageApi.open({
        type: 'success',
        content: response.data.statusMessage,
      });
      navigate("/master/test-methode");
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
        <HeaderTitle
          title="TEST METHODE"
          subtitle="form data a test methode"
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
                label="Method Id"
                name="MethodId"
                rules={[
                  {
                    required: true,
                    message: "Please input your Method Id!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Preservation"
                name="Preservation"
                rules={[
                  {
                    required: true,
                    message: "Please input your Preservation!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Storage Time Limit"
                name="StorageTimeLimit"
                rules={[
                  {
                    required: true,
                    message: "Please input your Storage Time Limit!",
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

export default FormTestMethode;
