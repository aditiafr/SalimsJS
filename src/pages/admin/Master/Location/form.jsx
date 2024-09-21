import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Form, Input, message } from "antd";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useEffect, useState } from "react";
import { getLocationNextCode, getWarehouse } from "../../../../Api/Master/getData";
import { postLocation } from "../../../../Api/Master/postData";
import { useNavigate } from "react-router-dom";
import { PrefixGlobal } from "../../../../components/Dashboard/Global/Helper";
import InputModal from "../../../../components/Dashboard/Global/InputModal";

const FormLocation = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [dataWarehouse, setDataWarehouse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectWarehouse, setSelectWarehouse] = useState("");
  const WarehouseName = selectWarehouse ? selectWarehouse.warehousename : '';
  const WarehouseCode = selectWarehouse ? selectWarehouse.warehousecode : '';

  const prefix = PrefixGlobal();
  const [locationCode, setLocationCode] = useState("");

  useEffect(() => {
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
    fetchWarehouse();
  }, []);


  useEffect(() => {
    const fetchNextCode = async () => {
      try {
        const res = await getLocationNextCode(WarehouseCode);
        setLocationCode(res.locationcode);

      } catch (error) {
        console.log();
      }
    }
    fetchNextCode();
  }, [WarehouseCode]);


  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let payload = {
        ...values,
        warehousecode: WarehouseCode
      }
      if (!values.locationcode) {
        form.setFieldsValue({ locationcode: locationCode });
        payload = {
          ...payload,
          locationcode: locationCode
        }
      }

      const response = await postLocation(payload);
      message.success(response.data.message);
      navigate("/master/location");
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
  }, [WarehouseName, form, locationCode]);

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="LOCATION"
          subtitle="form data a location"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 p-6">
            <InputModal
              title="WAREHOUSE"
              label="Warehouse Name"
              name="warehousename"
              dataSource={dataWarehouse}
              loading={isLoading}
              columns={columns}
              onData={(values) => setSelectWarehouse(values)}
            />

            <Form.Item
              label="Location Code"
              name="locationcode"
              rules={[
                {
                  validator: prefix,
                },
              ]}
            >
              <Input maxLength={6} />
            </Form.Item>

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

            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
          </div>
          <ButtonSubmit onReset={onReset} onLoading={loading} />
        </Form>
      </div>
    </>
  );
};

export default FormLocation;

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
