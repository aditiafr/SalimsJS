import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { Col, DatePicker, Form, Input, Select, Row, message } from "antd";
import { PrefixGlobal } from '../../../../components/Dashboard/Global/Helper';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getMaintenanceProcessNextCode } from '../../../../Api/Maintenance/getData';
import {
  getMaintenanceRequest
  // , getMaintenanceRequestOne 
} from '../../../../Api/Maintenance/getData';
import { postMaintenanceProcess } from '../../../../Api/Maintenance/postData';
import Cookies from "js-cookie";

const FormMaintenanceProcess = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [maintenanceRequest, setMaintenanceRequest] = useState([]);
  const [branchcode, setBranchCode] = useState("");
  const [loading, setLoading] = useState(false);
  const prefix = PrefixGlobal();


  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getMaintenanceRequest();
      const branch = Cookies.get('branchcode');
      console.log(response);

      // Mengubah key
      const modifiedData = response.map(item => ({
        label: `(${item.mrnumber}) ${item.description}`,
        value: item.mrnumber,
      }));

      setMaintenanceRequest(modifiedData)
      setBranchCode(branch)
      // setData(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      let { MRNumber, ...payload } = values;

      // let maintenanceRequestOne = await getMaintenanceRequestOne(branchcode, MRNumber);
      let detail = [
        {
          mrnumber: MRNumber
        }
      ];

      payload = {
        ...payload,
        branchcode: branchcode,
        issuspend: false,
        status: false,
        detail: detail
      }
      console.log("payload", payload);

      if (!values.mpnumber) {
        const nextCode = await getMaintenanceProcessNextCode(branchcode);
        const mpnumber = nextCode.mrnumber;
        form.setFieldsValue({ mpnumber: mpnumber });
        payload = {
          ...payload,
          mpnumber: mpnumber
        }
      }
      console.log(payload);
      const response = await postMaintenanceProcess(payload);
      message.success(response.data.message);
      navigate("/equipment_maintenance/maintenance_process");
    } catch (error) {
      // message.error(error.response.data.message);
      console.log(error);
    }
    setLoading(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="MAINTENANCE PROCESS" subtitle="form data a maintenance process" />
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
              <Form.Item
                label="MP Number"
                name="mpnumber"
                rules={[
                  {
                    validator: prefix,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="MP Date"
                name="mpdate"
                rules={[
                  {
                    required: true,
                    message: "Please input MP Date!",
                  },
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Periode"
                name="periode"
                rules={[
                  {
                    required: true,
                    message: "Please input Periode!",
                  },
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Description" name="description">
                <Input.TextArea />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="MR Number"
                name="MRNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input MR Number!",
                  },
                ]}
              >
                {/* <Input /> */}
                <Select
                  showSearch
                  placeholder="Select Maintenance Request"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={maintenanceRequest}
                />
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={12}>
              <Form.Item
                label="Status"
                name="Status"
                rules={[
                  {
                    required: true,
                    message: "Please input Status!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col> */}
          </Row>
          <ButtonSubmit onReset={onReset} onLoading={loading} />
        </Form>
      </div>
    </>
  );
};

export default FormMaintenanceProcess;
