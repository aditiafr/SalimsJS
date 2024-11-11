import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderTitle from '../../../../../components/Dashboard/Global/HeaderTitle';
import ButtonSubmit from '../../../../../components/Dashboard/Global/Button/ButtonSubmit';
import InputModal from '../../../../../components/Dashboard/Global/InputModal';
import { getParameter } from '../../../../../Api/Master/getData';
import FormSampleFormula from './Formula/form';
import FormSampleProduct from './Product/form';

const FormSampleParameter = () => {

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [dataParameter, setDataParameter] = useState([]);
  const [selectParameter, setSelectParameter] = useState("");
  const [openParameter, setOpenParameter] = useState(null);
  const ParameterCode = selectParameter ? selectParameter.parcode : '';
  const ParameterName = selectParameter ? selectParameter.parname : '';

  const [sampleFormula, setSampleFormula] = useState([]);
  const [sampleProduct, setSampleProduct] = useState([]);

  const { code } = useParams();
  const [dataParams, setDataParams] = useState(null);

  useEffect(() => {
    if (code) {
      const dataParm = JSON.parse(localStorage.getItem('DataSampleParm'));
      const filter = dataParm.filter(item => item.parcode === code);
      setDataParams(filter[0]);
      setOpenParameter(true);
    }
  }, [code, form]);

  useEffect(() => {
    if (code && dataParams) {
      form.setFieldsValue(dataParams);
      // setSampleFormula(dataParams.sample_fo);
      // setSampleProduct(dataParams.sample_pr);
    }
  }, [code, dataParams, form]);


  // PARAMETER
  useEffect(() => {
    const fetchParameter = async () => {
      try {
        const res = await getParameter();
        setDataParameter(res);

        if (code && dataParams) {
          const selected = res.filter(item => item.parcode === dataParams.parcode);
          setSelectParameter(selected[0])
        }

      } catch (error) {
        console.log(error);
      }
    }

    if (openParameter) {
      fetchParameter();
      setOpenParameter(false);
      setIsLoading(false)
    }

  }, [code, dataParams, openParameter]);


  useEffect(() => {
    form.setFieldsValue({
      ParameterName: ParameterName
    })
  }, [ParameterName, form]);


  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        branchcode: "0001",
        parname: ParameterName,
        parcode: ParameterCode,
        sample_fo: sampleFormula,
        sample_pr: sampleProduct,
      };
      // console.log(payload);

      const existingData = JSON.parse(localStorage.getItem('DataSampleParm')) || [];
      if (code) {
        const updatedData = existingData.map((item) =>
          item.parcode === code ? { ...item, ...values } : item
        );

        localStorage.setItem('DataSampleParm', JSON.stringify(updatedData));
        message.success("Success Update Data!")
      } else {
        const updatedData = [...existingData, payload];
        localStorage.setItem('DataSampleParm', JSON.stringify(updatedData));
        message.success("Success Add Data!");
      }
      navigate(-1);

    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="SAMPLE PARAMETER" subtitle="Form data a Sample Parameter" />
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
              title="PARAMETER"
              label="Parameter"
              name="ParameterName"
              dataSource={dataParameter}
              loading={isLoading}
              columns={columnsParameter}
              onData={(values) => setSelectParameter(values)}
              onOpenModal={(values) => setOpenParameter(values)}
            />

            <Form.Item
              label="Request Quantity"
              name="req_qty"
              rules={[
                {
                  required: true,
                  message: "Please input your Request Quantity!",
                },
              ]}
            >
              <InputNumber placeholder="Input Request Quantity" className="w-full" />
            </Form.Item>

            <Form.Item
              label="Lower Limit"
              name="l_limit"
              rules={[
                {
                  required: true,
                  message: "Please input your Lower Limit!",
                },
              ]}
            >
              <InputNumber placeholder="Input Lower Limit" className="w-full" />
            </Form.Item>

            <Form.Item
              label="Upper Limit"
              name="u_limit"
              rules={[
                {
                  required: true,
                  message: "Please input your Upper Limit!",
                },
              ]}
            >
              <InputNumber placeholder="Input Upper Limit" className="w-full" />
            </Form.Item>

            <Form.Item
              label="Lower Spec"
              name="l_spec"
              rules={[
                {
                  required: true,
                  message: "Please input your Lower Spec!",
                },
              ]}
            >
              <InputNumber placeholder="Input Lower Spec" className="w-full" />
            </Form.Item>

            <Form.Item
              label="Upper Spec"
              name="u_spec"
              rules={[
                {
                  required: true,
                  message: "Please input your Upper Spec!",
                },
              ]}
            >
              <InputNumber placeholder="Input Upper Spec" className="w-full" />
            </Form.Item>

            <Form.Item
              label="Frequency"
              name="frequency"
              rules={[
                {
                  required: true,
                  message: "Please input your Frequency!",
                },
              ]}
            >
              <Input placeholder="Input Frequency" className="w-full" />
            </Form.Item>

            <Form.Item
              label="Specification"
              name="specification"
              rules={[
                {
                  required: true,
                  message: "Please input your Specification!",
                },
              ]}
            >
              <Input placeholder="Input Specification" />
            </Form.Item>

          </div>

          <div className="m-4 p-4 border rounded-md">
            <FormSampleFormula
              onSaveData={(values) => setSampleFormula(values)}
              onParamCode={ParameterCode}
              onEdit={dataParams ? dataParams.sample_fo : ''}
            />
          </div>

          <div className="m-4 p-4 border rounded-md">
            <FormSampleProduct
              onSaveData={(values) => setSampleProduct(values)}
              onParamCode={ParameterCode}
              onEdit={dataParams ? dataParams.sample_pr : ''}
            />
          </div>

          <ButtonSubmit onReset={onReset} onLoading={loading} />

        </Form>
      </div>
    </>
  );
};

export default FormSampleParameter;



const columnsParameter = [
  {
    title: "No",
    dataIndex: "key",
    key: "key",
    width: 60,
    fixed: "left",
  },
  {
    title: "Parameter Code",
    dataIndex: "parcode",
    key: "parcode",
    fixed: "left",
  },
  {
    title: "Parameter Name",
    dataIndex: "parname",
    key: "parname",
  },
  {
    title: "Method Id",
    dataIndex: "methodid",
    key: "methodid",
  },
  {
    title: "Preservation",
    dataIndex: "preservation",
    key: "preservation",
  },
  {
    title: "Storage Time Limit",
    dataIndex: "storagetimelimit",
    key: "storagetimelimit",
  },
  {
    title: "Product Category Code",
    dataIndex: "prodcatcode",
    key: "prodcatcode",
  },
  {
    title: "product Category Name",
    dataIndex: "prodcatname",
    key: "prodcatname",
  },
  {
    title: "Unit Code",
    dataIndex: "unitcode",
    key: "unitcode",
  },
  {
    title: "Unit Name",
    dataIndex: "unitname",
    key: "unitname",
  },
  {
    title: "Alias Name",
    dataIndex: "aliasname",
    key: "aliasname",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Akreditasi",
    dataIndex: "akreditasi",
    key: "akreditasi",
  },
  {
    title: "Result Unit Code",
    dataIndex: "resultunitcode",
    key: "resultunitcode",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
]

