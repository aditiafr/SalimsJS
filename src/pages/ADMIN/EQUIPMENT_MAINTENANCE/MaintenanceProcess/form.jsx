import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { Col, DatePicker, Form, Input, Select, Row, message } from "antd";
import { PrefixGlobal } from '../../../../components/Dashboard/Global/Helper';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getMaintenanceProcessNextCode } from '../../../../Api/Maintenance/getData';
import {
  getMaintenanceRequest
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

  const [status, setStatus] = useState("");
  const [customStatus, setCustomStatus] = useState("");

  const handleStatusChange = (value) => {
    setStatus(value);
    // Reset custom status if switching from Others
    if (value !== "Others") {
      setCustomStatus("");
    }
  };

  const handleCustomInputChange = (e) => {
    setCustomStatus(e.target.value);
  };

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
      form.setFieldsValue({ branchcode: branch });
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

      console.log("values", values);

      let { MRNumber, status, ...payload } = values;

      console.log("before", status);

      status = status === "Others" ? customStatus : status;

      console.log("after", status);

      let detail = [
        {
          mrnumber: MRNumber
        }
      ];

      payload = {
        ...payload,
        branchcode: branchcode,
        issuspend: false,
        detail: detail,
        status: status
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

  const statusOption = [
    { label: "Calibrated", value: "Calibrated" },
    { label: "Repaired", value: "Repaired" },
    { label: "Unusable", value: "Unusable" },
    { label: "Others", value: "Others" },
  ];

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
                label="Branch Code"
                name="branchcode"
              >
                <Input placeholder="Input Branch Code" disabled />
              </Form.Item>
            </Col>

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
                <Select
                  showSearch
                  placeholder="Select Maintenance Request"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={maintenanceRequest}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Please input MR Number!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select Status"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={statusOption}
                  value={status}
                  onChange={handleStatusChange}
                />
                {status === "Others" && (
                  <Input
                    placeholder="Input Status"
                    value={customStatus}
                    style={{ marginTop: 10 }}
                    onChange={handleCustomInputChange}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <ButtonSubmit onReset={onReset} onLoading={loading} />
        </Form>
      </div>
    </>
  );
};

export default FormMaintenanceProcess;
