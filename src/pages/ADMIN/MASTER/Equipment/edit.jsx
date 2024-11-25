import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { EditFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Tooltip, Checkbox, Select, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import InputModal from "../../../../components/Dashboard/Global/InputModal";
import { getEquipmentType, getManufacture, getVendor } from "../../../../Api/Master/getData";
import { updateEquipment } from "../../../../Api/Master/updateData";
import dayjs from 'dayjs';

const EditDepartment = ({ dataSource, onEdit }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

  const [isEquipmentTypeLoading, setIsEquipmentTypeLoading] = useState(false);
  const [dataEquipmentType, setDataEquipmentType] = useState([]);
  const [selectEquipmentType, setSelectEquipmentType] = useState("");
  const [openEquipmentType, setOpenEquipmentType] = useState(null);
  const equipmentTypeName = selectEquipmentType ? selectEquipmentType.EquipmentTypeName : "";
  const equipmentTypeCode = selectEquipmentType ? selectEquipmentType.EquipmentTypeCode : "";

  const [isVendorLoading, setIsVendorLoading] = useState(false);
  const [dataVendor, setDataVendor] = useState([]);
  const [selectVendor, setSelectVendor] = useState("");
  const [openVendor, setOpenVendor] = useState(null);
  const vendorName = selectVendor ? selectVendor.vendorname : "";
  const vendorCode = selectVendor ? selectVendor.vendorcode : "";

  const [isManufactureLoading, setIsManufactureLoading] = useState(false);
  const [dataManufacture, setDataManufacture] = useState([]);
  const [selectManufacture, setSelectManufacture] = useState("");
  const [openManufacture, setOpenManufacture] = useState(null);
  const manufactureName = selectManufacture ? selectManufacture.manufacturename : "";
  const manufactureCode = selectManufacture ? selectManufacture.manufacturecode : "";

  useEffect(() => {
    const fetchEquipmentType = async () => {
      try {
        setIsEquipmentTypeLoading(true);
        const response = await getEquipmentType(false);
        setDataEquipmentType(response);

        for (let i = 0; i < response.length; i++) {
          if (response[i].EquipmentTypeCode === dataSource.equipmenttypecode) {
            setSelectEquipmentType(response[i]);
            form.setFieldsValue({ equipmenttypename: response[i].EquipmentTypeName });
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
      setIsEquipmentTypeLoading(false);
    };
      fetchEquipmentType();
  }, [openEquipmentType]);

  useEffect(() => {
    form.setFieldsValue({ equipmenttypename: equipmentTypeName });
  }, [equipmentTypeName, form, equipmentTypeCode]);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        setIsVendorLoading(true);
        const response = await getVendor(false);
        setDataVendor(response);

        for (let i = 0; i < response.length; i++) {
          if (response[i].vendorcode === dataSource.vendorcode) {
            setSelectVendor(response[i]);
            form.setFieldsValue({ vendorname: response[i].vendorname });
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
      setIsVendorLoading(false);
    };
      fetchVendor();
  }, [openVendor]);

  useEffect(() => {
    form.setFieldsValue({ vendorname: vendorName });
  }, [vendorName, form, vendorCode]);

  useEffect(() => {
    const fetchManufacture = async () => {
      try {
        setIsManufactureLoading(true);
        const response = await getManufacture(false);
        setDataManufacture(response);

        for (let i = 0; i < response.length; i++) {
          if (response[i].manufacturecode === dataSource.manufacturecode) {
            setSelectManufacture(response[i]);
            form.setFieldsValue({ manufacturename: response[i].manufacturename });
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
      setIsManufactureLoading(false);
    };
      fetchManufacture();
  }, [openManufacture]);

  useEffect(() => {
    form.setFieldsValue({ manufacturename: manufactureName });
  }, [manufactureName, form, manufactureCode]);

  useEffect(() => {
    form.setFieldsValue({
      ...dataSource,
      datecalibration: dataSource.datecalibration ? dayjs(dataSource.datecalibration) : null,
      duedatecalibration: dataSource.duedatecalibration ? dayjs(dataSource.duedatecalibration) : null,
      dateofuse: dataSource.dateofuse ? dayjs(dataSource.dateofuse) : null,
      dateofavailable: dataSource.dateofavailable ? dayjs(dataSource.dateofavailable) : null,
    });
  }, [dataSource, form]);

  const showModal = () => {
    form.setFieldsValue({
      ...dataSource,
      datecalibration: dataSource.datecalibration ? dayjs(dataSource.datecalibration) : null,
      duedatecalibration: dataSource.duedatecalibration ? dayjs(dataSource.duedatecalibration) : null,
      dateofuse: dataSource.dateofuse ? dayjs(dataSource.dateofuse) : null,
      dateofavailable: dataSource.dateofavailable ? dayjs(dataSource.dateofavailable) : null,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let payload = {
        ...values,
        equipmenttypecode: equipmentTypeCode,
        vendorcode: vendorCode,
        manufacturecode: manufactureCode,
        branchcode: dataSource.branchcode,
      };

      const response = await updateEquipment(dataSource.equipmentcode, payload);
      messageApi.open({
        type: "success",
        content: response.data.message,
      });

      onEdit(true);
      setIsModalOpen(false);
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
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title="Edit">
        <Button icon={<EditFilled />} type="text" onClick={showModal} />
      </Tooltip>

      <Modal
        title={
          <HeaderTitle
            title="DEPARTMENT"
            subtitle="Edit data a department"
          />
        }
        centered
        open={isModalOpen}
        closable={false}
        width={1000}
        styles={{
          body: {
            maxHeight: "70vh",
            overflow: "auto",
          },
        }}
        footer={false}
      >
        <Form
          name="basic"
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row gutter={30} style={{ margin: "0px" }}>
          <Col xs={24} sm={12}>
              <InputModal
                title="Equipment Type"
                label="Equipment Type"
                name="equipmenttypename"
                dataSource={dataEquipmentType}
                loading={isEquipmentTypeLoading}
                columns={equipementTypeColumns}
                onData={(values) => setSelectEquipmentType(values)}
                onOpenModal={(values) => setOpenEquipmentType(values)}
              />

              <InputModal
                title="Vendor"
                label="Vendor"
                name="vendorname"
                dataSource={dataVendor}
                loading={isVendorLoading}
                columns={vendorsColumns}
                onData={(values) => setSelectVendor(values)}
                onOpenModal={(values) => setOpenVendor(values)}
              />

              <InputModal
                title="Manufacture"
                label="Manufacture"
                name="manufacturename"
                dataSource={dataManufacture}
                loading={isManufactureLoading}
                columns={manufacturesColumns}
                onData={(values) => setSelectManufacture(values)}
                onOpenModal={(values) => setOpenManufacture(values)}
              />

              <Form.Item
                label="Code"
                name="equipmentcode"
                rules={[
                  {
                    required: false,
                    message: "Please input Code!",
                  },
                ]}
              >
                <Input maxLength={6} />
              </Form.Item>

              <Form.Item
                label="Name"
                name="equipmentname"
                rules={[
                  {
                    required: true,
                    message: "Please input Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Serial Number"
                name="serialnumber"
              >
                <Input maxLength={20} />
              </Form.Item>

              <Form.Item
                label="Calibration Date"
                name="datecalibration"
              >
               <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Calibration Due Date"
                name="duedatecalibration"
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Date of Use"
                name="dateofuse"
              >
               <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Date of Available"
                name="dateofavailable"
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Qty"
                name="qty"
              >
                <Input type="number" maxLength={20} />
              </Form.Item>

              <Form.Item
                label="Temperature"
                name="tempinfo"
              >
                <Input type="number" maxLength={20} addonAfter="°C" />
              </Form.Item>

              <Form.Item label="Description" name="description">
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item name="isqctools" valuePropName="checked" initialValue={false}>
                <Checkbox>QC Tool</Checkbox>
              </Form.Item>

              <Form.Item name="issuspend" valuePropName="checked" initialValue={false}>
                <Checkbox>Suspended</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <ButtonEdit onReset={onReset} />
        </Form>
      </Modal>
    </>
  );
};

export default EditDepartment;

const equipementTypeColumns = [
  {
    title: "No",
    dataIndex: "key",
    key: "key",
    width: 60,
    fixed: "left",
  },
  {
    title: "Equipment Type Code",
    dataIndex: "EquipmentTypeCode",
    key: "EquipmentTypeCode",
    width: 80,
    fixed: "left",
  },
  {
    title: "Equipment Type Name",
    dataIndex: "EquipmentTypeName",
    key: "EquipmentTypeName",
    width: 100,
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
    width: 200,
    render: (text) => (text || "N/A"),
  }
]

const vendorsColumns = [
  {
    title: "No",
    dataIndex: "key",
    key: "key",
    fixed: "left",
    width: 80,
  },
  {
    title: "Vendor Code",
    dataIndex: "vendorcode",
    key: "vendorcode",
    fixed: "left",
  },
  {
    title: "Vendor Name",
    dataIndex: "vendorname",
    key: "vendorname",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Postal Code",
    dataIndex: "postalcode",
    key: "postalcode",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Fax Code",
    dataIndex: "fax",
    key: "fax",
  },
  {
    title: "NPWP",
    dataIndex: "npwp",
    key: "npwp",
  },
  {
    title: "Contact Person",
    dataIndex: "contactperson",
    key: "contactperson",
  },
  {
    title: "Address 2",
    dataIndex: "address2",
    key: "address2",
  },
  {
    title: "Hp Number",
    dataIndex: "hp",
    key: "hp",
  },
  {
    title: "Email Address",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 150,
  }
];

const manufacturesColumns = [
  {
    title: "No",
    dataIndex: "key",
    key: "key",
    width: 60,
    fixed: "left",
  },
  {
    title: "Manufacture Code",
    dataIndex: "manufacturecode",
    key: "manufacturecode",
  },
  {
    title: "Manufacture Name",
    dataIndex: "manufacturename",
    key: "manufacturename",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  }
]