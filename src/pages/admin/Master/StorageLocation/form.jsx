import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Col, Form, Input, Row } from "antd";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import InputModal from "./InputModal";
import { useEffect, useState } from "react";
import { getWarehouse } from "../../../../Api/Master/getData";

const FormStorageLocation = () => {
  const [form] = Form.useForm();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataModal, setDataModal] = useState([]);

  console.log(dataModal);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getWarehouse();
      const filter = response.filter((item) => item.issuspend !== true).map((item, row) => ({ ...item, key: row + 1 }));
      setData(filter);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ warehouse: dataModal.warehousename });
  }, [dataModal.warehousename, form]);

  const onFinish = (values) => {
    console.log("Success:", values);
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
          title="STORAGE LOCATION"
          subtitle="form data a storage location"
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
              <InputModal
                label="Warehouse"
                name="warehouse"
                dataSource={data}
                loading={loading}
                columns={columns}
                onData={(values) => setDataModal(values)}
              />
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Code"
                name="Code"
                rules={[
                  {
                    required: true,
                    message: "Please input your Code!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Name"
                name="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
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

export default FormStorageLocation;


const columns = [
  {
    title: "No",
    dataIndex: "key",
    key: "key",
    fixed: "left",
    width: 80,
  },
  {
    title: "Warehouse Code",
    dataIndex: "warehousecode",
    key: "warehousecode",
    fixed: "left",
  },
  {
    title: "Warehousen Name",
    dataIndex: "warehousename",
    key: "warehousename",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Fax",
    dataIndex: "fax",
    key: "fax",
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
  },
  {
    title: "Zip Code",
    dataIndex: "zipcode",
    key: "zipcode",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];