import { Form, Input, Col, Row, Checkbox } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSubZona, getSubZonaNextCode, getZona } from "../../../../Api/Master/getData";
import { postSubZona } from "../../../../Api/Master/postData";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import InputModal from "../../../../components/Dashboard/Global/InputModal";

const FormSubZona = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext(); 
  const [loading, setLoading] = useState(false);
  const [SubZonaCode, setSubZonaCode] = useState("");

  const [isZonaLoading, setIsZonaLoading] = useState(false);
  const [dataZona, setDataZona] = useState([]);
  const [selectZona, setSelectZona] = useState("");
  const [openZona, setOpenZona] = useState(null);
  const zonaName = selectZona ? selectZona.zonaname : "";
  const zonaCode = selectZona ? selectZona.zonacode : "";

  useEffect(() => {
    const fetchZona = async () => {
      try {
        setIsZonaLoading(true);
        const response = await getZona(false);
        setDataZona(response);
      } catch (error) {
        console.log(error);
      }
      setIsZonaLoading(false);
    };
    if (openZona) {
      fetchZona();
      setOpenZona(false);
    }
  }, [openZona]);

  useEffect(() => {
    form.setFieldsValue({ zonaname: zonaName });
  }, [zonaName, form, zonaCode]);

  useEffect(() => {
    const fetchNextCode = async () => {
      try {
        const response = await getSubZonaNextCode(true);
        setSubZonaCode(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNextCode();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ subzonacode: SubZonaCode });
  }, [SubZonaCode, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
     
      let payload = {
        ...values,
        zonacode: zonaCode,
      };

      if (!values.subzonacode) {
        form.setFieldsValue({ subzonacode: SubZonaCode });
        payload = {
          ...payload,
          subzonacode: SubZonaCode,
        };
      }

      const response = await postSubZona(payload);
      messageApi.open({
        type: "success",
        content: response.data.message,
      });
      navigate("/master/subzona");
    } catch (error) {
    console.log(error);
    } finally {
      setLoading(false);
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
        <HeaderTitle
          title="SUB ZONA"
          subtitle="form data a sub zona"
        />
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

              <InputModal
                title="Zona"
                label="Zona"
                name="zonaname"
                dataSource={dataZona}
                loading={isZonaLoading}
                columns={zonaColumns}
                onData={(values) => setSelectZona(values)}
                onOpenModal={(values) => setOpenZona(values)}
              />

              <Form.Item
                label="Sub Zona Code"
                name="subzonacode"
                rules={[
                  {
                    required: false,
                    message: "Please input sub zona code!",
                  },
                ]}
              >
                <Input maxLength={6} />
              </Form.Item>

              <Form.Item
                label="Sub Zona Name"
                name="subzonaname"
                rules={[
                  {
                    required: true,
                    message: "Please input sub zona name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
              >
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item
                label="ZIP Code"
                name="zipCode"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="LatLong"
                name="latlong"
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Description" name="description">
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item name="issuspend" valuePropName="checked" initialValue={false}>
                <Checkbox>Suspended</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <ButtonSubmit onReset={onReset} />
        </Form>
      </div>
    </>
  );
};

export default FormSubZona;


const zonaColumns = [
  {
    title: "Zona Code",
    dataIndex: "zonacode",
    key: "zonacode",
    width: 80,
    fixed: "left",
  },
  {
    title: "Zona Name",
    dataIndex: "zonaname",
    key: "zonaname",
    width: 100,
    fixed: "left",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: 200,
    render: (text) => (text ?? "N/A"),
  },
  {
    title: "ZIP Code",
    dataIndex: "zipcode",
    key: "zipcode",
    width: 100,
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    width: 100,
  },
  {
    title: "Lat Long",
    dataIndex: "latlong",
    key: "latlong",
    width: 100,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 200,
    render: (text) => (text ?? "N/A"),
  }
];