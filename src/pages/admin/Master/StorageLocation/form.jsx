import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Col, Form, Input, Row } from "antd";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import InputModal from "./InputModal";
import { useEffect, useState } from "react";
import { getStorageLocation, getWarehouse } from "../../../../Api/Master/getData";
import { postStorageLocation } from "../../../../Api/Master/postData";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";

const FormStorageLocation = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

  const [dataWarehouse, setDataWarehouse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectWarehouse, setSelectWarehouse] = useState("");
  console.log(selectWarehouse);

  const WarehouseName = selectWarehouse ? selectWarehouse.warehousename : '';
  const WarehouseCode = selectWarehouse ? selectWarehouse.warehousecode : '';

  const [locationCode, setLocationCode] = useState("");

  const fetchWarehouse = async () => {
    try {
      setIsLoading(true);
      const response = await getWarehouse();
      const filter = response.filter((item) => item.issuspend !== true).map((item, row) => ({ ...item, key: row + 1 }));
      setDataWarehouse(filter);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWarehouse();
  }, []);

  const fetchLocation = async () => {
    try {
      const response = await getStorageLocation();
      if (response.length > 0) {
        const LCode = response.filter(
          (item) => item.locationcode && item.locationcode.startsWith("LC")
        );
        if (LCode.length > 0) {
          const lastCode = LCode[LCode.length - 1].locationcode;
          const nextNumber = parseInt(lastCode.substr(2)) + 1;
          setLocationCode(`LC${nextNumber.toString().padStart(3, "0")}`);
        } else {
          setLocationCode("LC001");
        }
      } else {
        setLocationCode("LC001");
      }
    } catch (error) {
      setLocationCode("LC001");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, [])


  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        warehousecode: WarehouseCode
      }
      const response = await postStorageLocation(payload);
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

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({ warehousename: WarehouseName });
    form.setFieldsValue({ locationcode: locationCode });
  }, [WarehouseName, form, locationCode]);

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
          onFinish={handleSubmit}
          autoComplete="off"
          form={form}
        >
          <Row gutter={30} style={{ padding: "28px" }}>
            <Col xs={24} sm={12}>
              <InputModal
                label="Warehouse Name"
                name="warehousename"
                dataSource={dataWarehouse}
                loading={isLoading}
                columns={columns}
                onData={(values) => setSelectWarehouse(values)}
              />
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Location Code"
                name="locationcode"
                rules={[
                  {
                    required: true,
                    message: "Please input your LocationCode!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Location Name"
                name="locationname"
                rules={[
                  {
                    required: true,
                    message: "Please input your Location Name!",
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