import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import { EditFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Tooltip, Checkbox, Select, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { updateParameter } from "../../../../Api/Master/updateData";
import InputModal from "../../../../components/Dashboard/Global/InputModal";
import { getPackingTypes, getParameterCategory, getTestMethode } from "../../../../Api/Master/getData";

const EditParameter = ({ dataSource, onEdit }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { messageApi } = useMessageContext();
  const [loading, setLoading] = useState(false);

  const [isTestMethodLoading, setIsTestMethodLoading] = useState(false);
  const [dataTestMethod, setDataTestMethod] = useState([]);
  const [selectTestMethod, setSelectTestMethod] = useState("");
  const [openTestMethod, setOpenTestMethod] = useState(null);
  const TestMethodId = selectTestMethod ? selectTestMethod.methodid : '';

  const [isParameterCategoryLoading, setIsParameterCategoryLoading] = useState(false);
  const [dataParameterCategory, setDataParameterCategory] = useState([]);
  const [selectParameterCategory, setSelectParameterCategory] = useState("");
  const [openParameterCategory, setOpenParameterCategory] = useState(null);
  const ParameterCategoryName = selectParameterCategory ? selectParameterCategory.ParameterCategoryName : '';
  const ParameterCategoryCode = selectParameterCategory ? selectParameterCategory.ParameterCategoryCode : '';

  const [isResultUnitLoading, setIsResultUnitLoading] = useState(false);
  const [dataResultUnit, setDataResultUnit] = useState([]);
  const [selectResultUnit, setSelectResultUnit] = useState("");
  const [openResultUnit, setOpenResultUnit] = useState(null);
  const ResultUnitName = selectResultUnit ? selectResultUnit.PackingTypeName : '';
  const ResultUnitCode = selectResultUnit ? selectResultUnit.PackingTypeCode : '';

  useEffect(() => {
    const fetchTestMethod = async () => {
      try {
        setIsTestMethodLoading(true);
        const response = await getTestMethode(false);
        setDataTestMethod(response);
      } catch (error) {
        console.log(error);
      }
      setIsTestMethodLoading(false);
    };
    if (openTestMethod) {
      fetchTestMethod();
      setOpenTestMethod(false);
    }
  }, [openTestMethod]);

  useEffect(() => {
    form.setFieldsValue({ methodid: TestMethodId });
  }, [TestMethodId, form]);

  useEffect(() => {
    const fetchParameterCategory = async () => {
      try {
        setIsParameterCategoryLoading(true);
        const response = await getParameterCategory(false);
        setDataParameterCategory(response);

        for (let i = 0; i < response.length; i++) {
          if (response[i].ParameterCategoryCode === dataSource.parcatcode) {
            setSelectParameterCategory(response[i]);
            form.setFieldsValue({ parametercategoryname: response[i].ParameterCategoryName });
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
      setIsParameterCategoryLoading(false);
    };
      fetchParameterCategory();
  }, [openParameterCategory]);

  useEffect(() => {
    form.setFieldsValue({ parametercategoryname: ParameterCategoryName });
  }, [ParameterCategoryName, form]);

  useEffect(() => {
    const fetchResultUnit = async () => {
      try {
        setIsResultUnitLoading(true);
        const response = await getPackingTypes(false);
        setDataResultUnit(response);

        for (let i = 0; i < response.length; i++) {
          if (response[i].PackingTypeCode === dataSource.resultunitcode) {
            setSelectResultUnit(response[i]);
            form.setFieldsValue({ resultunitname: response[i].PackingTypeName });
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
      setIsResultUnitLoading(false);
    };
    
    fetchResultUnit();
  }, [openResultUnit]);


  useEffect(() => {
    form.setFieldsValue({ resultunitname: ResultUnitName });
  }, [ResultUnitName, form]);

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
        methodid: TestMethodId,
        parcatcode: ParameterCategoryCode,
        resultunitcode: ResultUnitCode
      }

      const response = await updateParameter(dataSource.parcode, payload);
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

  const formatToRupiah = (e) => {
    const { value } = e.target;
    let valueWithDigitOnly = parseInt(value.replace(/\D/g, "") || 0);
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(valueWithDigitOnly).replace("Rp ", "").replace(",00", "");

    form.setFieldsValue({ Price: formattedValue });
  }

  return (
    <>
      <Tooltip title="Edit">
        <Button icon={<EditFilled />} type="text" onClick={showModal} />
      </Tooltip>

      <Modal
        title={
          <HeaderTitle
            title="PARAMETER"
            subtitle="Edit data a parameter"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 p-6">

            <Form.Item
              label="Parameter Code"
              name="parcode"
            >
              <Input readOnly />
            </Form.Item>

            <Form.Item
              label="Parameter Name"
              name="parname"
              rules={[
                {
                  required: true,
                  message: "Please input Parameter Name!",
                },
              ]}
            >
              <Input placeholder="Input Parameter Name" />
            </Form.Item>

            <InputModal
              title="Test Method"
              label="Method Id"
              name="methodid"
              dataSource={dataTestMethod}
              loading={isTestMethodLoading}
              columns={testMethodColumns}
              onData={(values) => setSelectTestMethod(values)}
              onOpenModal={(values) => setOpenTestMethod(values)}
            />

            <InputModal
              title="Parameter Category"
              label="Parameter Category Name"
              name="parametercategoryname"
              dataSource={dataParameterCategory}
              loading={isParameterCategoryLoading}
              columns={parameterCategoryColumns}
              onData={(values) => setSelectParameterCategory(values)}
              onOpenModal={(values) => setOpenParameterCategory(values)}
            />

            <Form.Item
              label="Alias Name"
              name="aliasname"
              rules={[
                {
                  required: true,
                  message: "Please input your Alias Name!",
                },
              ]}
            >
              <Input placeholder="Input Alias Name" />
            </Form.Item>

            <Form.Item
              label="Duration"
              name="duration"
              rules={[
                {
                  required: true,
                  message: "Please input your Duration!",
                },
              ]}
            >
              <Input placeholder="Input Duration" />
            </Form.Item>

            <InputModal
              title="Result Unit"
              label="Result Unit Name"
              name="resultunitname"
              dataSource={dataResultUnit}
              loading={isResultUnitLoading}
              columns={resultUnitColumns}
              onData={(values) => setSelectResultUnit(values)}
              onOpenModal={(values) => setOpenResultUnit(values)}
            />

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your Price!",
                },
              ]}
            >
              <Input placeholder="Input Price" />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea placeholder="Input Description" />
            </Form.Item>

            <Form.Item name="akreditasi" valuePropName="checked" initialValue={false}>
              <Checkbox>Akreditasi</Checkbox>
            </Form.Item>

            <Form.Item name="issuspend" valuePropName="checked" initialValue={false}>
              <Checkbox>Suspended</Checkbox>
            </Form.Item>
            </div>
          <ButtonEdit onReset={onReset} onLoading={loading} />
        </Form>
      </Modal>
    </>
  );
};

export default EditParameter;


const testMethodColumns = [
  {
    title: "No",
    dataIndex: "key",
    key: "key",
    width: 50,
    fixed: "left",
  },
  {
    title: "Method Id",
    dataIndex: "methodid",
    key: "methodid",
    width: 50,
    fixed: "left",
  },
  {
    title: "Preservation",
    dataIndex: "preservation",
    key: "preservation",
    width: 150,
  },
  {
    title: "Storage Time Limit",
    dataIndex: "storagetimelimit",
    key: "storagetimelimit",
    width: 150,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 150,
  }
];

const parameterCategoryColumns = [
  {
    title: "No",
    dataIndex: "key",
    key: "key",
    width: 80,
    fixed: "left",
  },
  {
    title: "Code",
    dataIndex: "ParameterCategoryCode",
    key: "ParameterCategoryCode",
    width: 80,
    fixed: "left",
  },
  {
    title: "Name",
    dataIndex: "ParameterCategoryName",
    key: "ParameterCategoryName",
    width: 100,
    fixed: "left",
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
    width: 200,
    render: (text) => (text ?? "N/A"),
  },
];

const resultUnitColumns = [
  {
    title: "No",
    dataIndex: "key",
    key: "key",
    width: 80,
    fixed: "left",
  },
  {
    title: "Result Unit Code",
    dataIndex: "PackingTypeCode",
    key: "PackingTypeCode",
    width: 80,
    fixed: "left",
  },
  {
    title: "Result Unit Name",
    dataIndex: "PackingTypeName",
    key: "PackingTypeName",
    width: 100,
    fixed: "left",
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
    width: 200,
    render: (text) => (text ?? "N/A"),
  },
];