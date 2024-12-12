import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { Col, DatePicker, Form, Input, Row, Select, message } from "antd";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQcToolsEquipment } from '../../../../Api/General/GetData';
import { getEquipmentOne } from '../../../../Api/Master/getData';
import { postMaintenanceRequest } from '../../../../Api/Maintenance/postData';
import { PrefixGlobal } from '../../../../components/Dashboard/Global/Helper';
import Cookies from "js-cookie";

const FormMaintenanceRequest = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [equipment, setEquipment] = useState([]);
  const prefix = PrefixGlobal();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getQcToolsEquipment();
      const branch = Cookies.get('branchcode');

      // Mengubah key
      const modifiedData = response.map(item => ({
        label: `(${item.equipmentcode}) ${item.equipmentname}`,
        value: item.equipmentcode,
        key: item.equipmentversion,
      }));

      setEquipment(modifiedData)
      form.setFieldsValue({ branchcode: branch });
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

      let { EquipmentCode, ...payload } = values;

      let equipmentOne = await getEquipmentOne(EquipmentCode);

      payload = {
        ...payload,
        equipmentcode: EquipmentCode,
        equipmentversion: `${equipmentOne.version}`,
      }

      if (!values.mrnumber) {
        payload = {
          ...payload,
          mrnumber: ""
        }
      }

      const response = await postMaintenanceRequest(payload);
      message.success(response.data.message);
      navigate("/equipment_maintenance/maintenance_request");
    } catch (error) {
      message.error(error.response.data.message);
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
        <HeaderTitle title="MAINTENANCE REQUEST" subtitle="form data a maintenance request" />
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
                label="Branch"
                name="branchcode"
                rules={[
                  {
                    required: true,
                    message: "Please input your Branch!",
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="MR Number"
                name="mrnumber"
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
                label="MR Date"
                name="mrdate"
                rules={[
                  {
                    required: true,
                    message: "Please input MR Date!",
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
                label="Equipment Code"
                name="EquipmentCode"
                rules={[
                  {
                    required: true,
                    message: "Please input Equipment Code!",
                  },
                ]}
              >
                {/* <Input /> */}
                <Select
                  showSearch
                  placeholder="Select Equipment"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={equipment}
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
                <Select
                  showSearch
                  placeholder="Select Equipment Type"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={equipementTypes}
                />
              </Form.Item>
            </Col> */}
          </Row>
          <ButtonSubmit onReset={onReset} onLoading={loading} />
        </Form>
      </div>
    </>
  );
};

export default FormMaintenanceRequest;
