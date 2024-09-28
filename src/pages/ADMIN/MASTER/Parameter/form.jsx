import React, { useEffect, useState } from 'react';
import { Checkbox, Form, Input, message } from 'antd';
import { useFetcher, useNavigate } from 'react-router-dom';
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { getPackingTypes, getParameterCategory, getParameterNextCode, getTestMethod } from '../../../../Api/Master/getData';
import { postParameter } from '../../../../Api/Master/postData';
import { PrefixGlobal } from '../../../../components/Dashboard/Global/Helper';
import InputModal from "../../../../components/Dashboard/Global/InputModal";

const FormParameter = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const prefix = PrefixGlobal();
  const [ParameterCode, setParameterCode] = useState("");

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
        const response = await getTestMethod(false);
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
  }, [TestMethodId, form, ParameterCode]);

  useEffect(() => {
    const fetchParameterCategory = async () => {
      try {
        setIsParameterCategoryLoading(true);
        const response = await getParameterCategory(false);
        setDataParameterCategory(response);
      } catch (error) {
        console.log(error);
      }
      setIsParameterCategoryLoading(false);
    };
    if (openParameterCategory) {
      fetchParameterCategory();
      setOpenParameterCategory(false);
    }
  }, [openParameterCategory]);

  useEffect(() => {
    form.setFieldsValue({ parametercategoryname: ParameterCategoryName });
  }, [ParameterCategoryName, form, ParameterCode]);

  useEffect(() => {
    const fetchResultUnit = async () => {
      try {
        setIsResultUnitLoading(true);
        const response = await getPackingTypes(false);
        setDataResultUnit(response);
      } catch (error) {
        console.log(error);
      }
      setIsResultUnitLoading(false);
    };
    if (openResultUnit) {
      fetchResultUnit();
      setOpenResultUnit(false);
    }
  }, [openResultUnit]);


  useEffect(() => {
    form.setFieldsValue({ resultunitname: ResultUnitName });
  }, [ResultUnitName, form, ParameterCode]);
  
  useEffect(() => {
    const fetchNextCode = async () => {
      try {
        const res = await getParameterNextCode();
        setParameterCode(res.parcode);

      } catch (error) {
        console.log(error);
      }
    }
    fetchNextCode();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ parcode: ParameterCode });
  }, [ParameterCode, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let payload = {
        ...values,
        methodid: TestMethodId,
        parcatcode: ParameterCategoryCode,
        resultunitcode: ResultUnitCode
      }
      if (!values.parcode) {
        form.setFieldsValue({ parcode: ParameterCode });
        payload = {
          ...payload,
          parcode: ParameterCode
        }
      }
      console.log(payload);
      const response = await postParameter(payload);
      message.success(response.data.message);
      navigate("/master/parameter");
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error);
    }
    setLoading(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleOnKeyPress = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="PARAMETER" subtitle="form data a parameter" />
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

            <Form.Item
              label="Parameter Code"
              name="parcode"
              rules={[
                {
                  validator: prefix,
                },
              ]}
            >
              <Input placeholder="Input Parameter Code" maxLength={6} />
            </Form.Item>

            <Form.Item
              label="Parameter Name"
              name="parname"
              rules={[
                {
                  required: true,
                  message: "Please input your Parameter Name!",
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

          <ButtonSubmit onReset={onReset} onLoading={loading} />

        </Form>
      </div>
    </>
  );
};

export default FormParameter;

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
