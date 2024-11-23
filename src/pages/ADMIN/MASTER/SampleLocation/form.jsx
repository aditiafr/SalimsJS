import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { Form, Input, message } from "antd";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useEffect, useState } from "react";
import { getBuilding, getSampleLocationNextCode } from "../../../../Api/Master/getData";
import { postSampleLocation } from "../../../../Api/Master/postData";
import { useNavigate } from "react-router-dom";
import { PrefixGlobal } from "../../../../components/Dashboard/Global/Helper";
import InputModal from "../../../../components/Dashboard/Global/InputModal";

const FormSampleLocation = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [dataBuilding, setDataBuilding] = useState([]);
  const [selectBuilding, setSelectBuilding] = useState("");
  const [openBuilding, setOpenBuilding] = useState(null);
  const BuildingName = selectBuilding ? selectBuilding.buildingname : '';
  const BuildingCode = selectBuilding ? selectBuilding.buildingcode : '';

  const prefix = PrefixGlobal();
  const [locationCode, setLocationCode] = useState("");

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        setIsLoading(true);
        const response = await getBuilding(false);
        setDataBuilding(response);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    if (openBuilding) {
      fetchBuilding();
      setOpenBuilding(false);
    }
  }, [openBuilding]);


  useEffect(() => {
    const fetchNextCode = async () => {
      try {
        const res = await getSampleLocationNextCode(BuildingCode);
        setLocationCode(res.locationcode);

      } catch (error) {
        console.log();
      }
    }
    if (BuildingCode) {
      fetchNextCode();
    }
  }, [BuildingCode]);


  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let payload = {
        ...values,
        buildingcode: BuildingCode
      }
      if (!values.locationcode) {
        form.setFieldsValue({ locationcode: locationCode });
        payload = {
          ...payload,
          locationcode: locationCode
        }
      }
      console.log(payload);
      const response = await postSampleLocation(payload);
      message.success(response.data.message);
      navigate("/master/sample_location");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({ buildingname: BuildingName });
  }, [BuildingName, form, locationCode]);

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="SAMPLE LOCATION"
          subtitle="form data a sample location"
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
              title="BUILDING"
              label="Building Name"
              name="buildingname"
              dataSource={dataBuilding}
              loading={isLoading}
              columns={columns}
              onData={(values) => setSelectBuilding(values)}
              onOpenModal={(values) => setOpenBuilding(values)}
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
              <Input maxLength={6} placeholder="Input Location Code" />
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
              <Input placeholder="Input Location Name" />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea placeholder="Input Description" />
            </Form.Item>
          </div>
          <ButtonSubmit onReset={onReset} onLoading={loading} />
        </Form>
      </div>
    </>
  );
};

export default FormSampleLocation;

const columns = [
  {
    title: "No",
    dataIndex: "key",
    key: "key",
    width: 60,
    fixed: "left",
  },
  {
    title: "Building Code",
    dataIndex: "buildingcode",
    key: "buildingcode",
    fixed: "left",
  },
  {
    title: "Building Name",
    dataIndex: "buildingname",
    key: "buildingname",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: 350,
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Fax",
    dataIndex: "fax",
    key: "fax",
  },
  {
    title: "Contact Name",
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
