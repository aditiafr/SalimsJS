import { EditFilled } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Tooltip } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { JsonCreateModif } from "../../../../Api/Master/Json";
import { updateSampleSLocation } from "../../../../Api/Master/updateData";

const EditSampleLocation = ({ dataSource, onEdit }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

  const formatDataSource = useCallback(() => {
    form.setFieldsValue({
      ...dataSource,
      DateOfUse: dataSource.DateOfUse ? dayjs(dataSource.DateOfUse) : null,
      DateOfAvailable: dataSource.DateOfAvailable ? dayjs(dataSource.DateOfAvailable) : null,
    });
  }, [dataSource, form]);

  useEffect(() => {
    formatDataSource();
  }, [form, formatDataSource]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      setLoading(true);
      const modifiedValues = {
        ...values,
        // DateOfUse: values.DateOfUse ? values.DateOfUse.format("YYYY-MM-DD") : null,
        // DateOfAvailable: values.DateOfAvailable ? values.DateOfAvailable.format("YYYY-MM-DD") : null,
        ...JsonCreateModif
      }
      const response = await updateSampleSLocation(dataSource.BuildingCode, dataSource.LocationCode, modifiedValues);
      messageApi.open({
        type: 'success',
        content: response.data.statusMessage,
      });
      onEdit(true);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    formatDataSource();
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
            title="SAMPLE STORAGE LOCATION"
            subtitle="Edit data a sample storage location"
          />
        }
        centered
        open={isModalOpen}
        closable={false}
        width={1000}
        style={{
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row gutter={30} style={{ margin: "0px", paddingTop: "14px" }}>
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
                  readOnly
                />
              </Form.Item>

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
          <ButtonEdit onReset={onReset} onLoading={loading} />
        </Form>
      </Modal>
    </>
  );
};

export default EditSampleLocation;
