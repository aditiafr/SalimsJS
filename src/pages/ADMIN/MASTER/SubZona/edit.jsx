import React, { useEffect, useState } from "react";
import { EditFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Tooltip, Checkbox } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { getZona } from "../../../../Api/Master/getData";
import InputModal from "../../../../components/Dashboard/Global/InputModal";
import { updateSubZona } from "../../../../Api/Master/updateData";

const EditSubZona = ({ dataSource, onEdit }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

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

        for (let i = 0; i < response.length; i++) {
          if (response[i].zonacode === dataSource.zonacode) {
            setSelectZona(response[i]);
            form.setFieldsValue({ zonaname: response[i].zonaname });
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
      setIsZonaLoading(false);
    };

      fetchZona();
  }, [openZona]);

  useEffect(() => {
    form.setFieldsValue({ zonaname: zonaName });
  }, [zonaName, form]);

  useEffect(() => {
    form.setFieldsValue(dataSource);
  }, [dataSource, form]);

  const showModal = () => {
    form.setFieldsValue(dataSource);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let payload = {
        ...values,
        zonacode: selectZona.zonacode,
      };

      const response = await updateSubZona(dataSource.subzonacode, payload);
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
            title="SUB ZONA"
            subtitle="Edit data a sub zona"
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
                <Input maxLength={20} disabled />
              </Form.Item>

              <Form.Item
                label="Sub Zona Name"
                name="subzonaname"
                rules={[
                  {
                    required: true,
                    message: "Please input your sub zona name!",
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
                name="zipcode"
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
          <ButtonEdit onReset={onReset} />
        </Form>
      </Modal>
    </>
  );
};

export default EditSubZona;

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