import { Col, DatePicker, Form, Input, Row } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { useCallback, useEffect, useState } from "react";
import InputModal from "./InputModal";
import { JsonCreateModif } from "../../../../Api/Master/Json";
import { postSampleSLocation } from "../../../../Api/Master/postData";
import { getSampleSLocation } from "../../../../Api/Master/getData";

const FormSampleStorageLocation = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const buildingCode = dataModal.BuildingCode;

  const [sampleSLocationCode, setSampleSLocationCode] = useState("");

  const fetchSampleSLocation = useCallback(async () => {
    try {
      const response = await getSampleSLocation(buildingCode);
      if (response.length > 0) {
        const BCode = response.filter(
          (item) => item.LocationCode && item.LocationCode.startsWith("LOC")
        );
        if (BCode.length > 0) {
          const lastCode = BCode[BCode.length - 1].LocationCode;
          const nextNumber = parseInt(lastCode.substr(3)) + 1;
          setSampleSLocationCode(`LOC${nextNumber.toString().padStart(2, "0")}`);
        } else {
          setSampleSLocationCode("LOC01");
        }
      } else {
        setSampleSLocationCode("LOC01");
      }
    } catch (error) {
      setSampleSLocationCode("LOC01");
      console.log(error.response.statusText);
    }
  }, [buildingCode]);

  useEffect(() => {
    if (buildingCode) {
      fetchSampleSLocation();
    }
  }, [buildingCode, fetchSampleSLocation]);

  useEffect(() => {
    form.setFieldsValue({
      LocationCode: sampleSLocationCode,
      BuildingCode: buildingCode
    });
  }, [sampleSLocationCode, form, buildingCode]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      setLoading(true);
      const modifiedValues = {
        ...values,
        ...JsonCreateModif
      }
      const response = await postSampleSLocation(modifiedValues);
      messageApi.open({
        type: 'success',
        content: response.data.statusMessage,
      });
      navigate("/master/sample-storage-location");
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

  // const onChange = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle
          title="SAMPLE STORAGE LOCATION"
          subtitle="form data a sample storage location"
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
                label="Building Code"
                name="BuildingCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your Building Code!",
                  },
                ]}
              >
                <Input
                  onClick={() => setOpenModal(true)}
                  readOnly
                />
              </Form.Item>

              <InputModal
                setOpenModals={openModal}
                setValues={(values) => setDataModal(values)}
                setIsModalOpen={() => setOpenModal(false)}
              />

            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Location Code"
                name="LocationCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your Location Code!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Location Name"
                name="LocationName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Location Name!",
                  },
                ]}
              >
                <Input maxLength={20} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Date Of Use"
                name="DateOfUse"
                rules={[
                  {
                    required: true,
                    message: "Please input your Date Of Use!",
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Date Of Available"
                name="DateOfAvailable"
                rules={[
                  {
                    required: true,
                    message: "Please input your Date Of Available!",
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
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

export default FormSampleStorageLocation;
