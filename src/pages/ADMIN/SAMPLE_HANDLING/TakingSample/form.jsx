import { DatePicker, Form, Input, message } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { useNavigate, useParams } from "react-router-dom";
import { PrefixGlobal, selectedTranIdx } from "../../../../components/Dashboard/Global/Helper";
import { useEffect, useState } from "react";
import InputModal from "../../../../components/Dashboard/Global/InputModal";
import { getSample } from "../../../../Api/Master/getData";
import { columnsPlanningTakingSample, columnsSample } from "./ColumnsTS";
import { getPlannigTakingSample, getTakingSampleOne } from "../../../../Api/SampleHandling/GetData";
import dayjs from "dayjs";
import FormTakingSampleParameter from "./Parameter/form";
import FormTakingSampleCI from "./ContainerInformation/form";
import { postTakingSample } from "../../../../Api/SampleHandling/PostData";
import { updateTakingSample } from "../../../../Api/SampleHandling/UpdateData";

const FormTakingSample = () => {
  const [form] = Form.useForm();
  const { code } = useParams();
  const [dataOne, setDataOne] = useState(null);

  // EDIT DATA
  useEffect(() => {
    if (code) {

      const fetchDataOne = async () => {
        try {
          const res = await getTakingSampleOne(code);
          setDataOne(res);

          form.setFieldsValue({
            ...res,
            tsdate: dayjs(res.tsdate),
          });

        } catch (error) {
          console.log(error);
        }
      }

      fetchDataOne();
      setOpenSample(true);
      setOpenSampleNo(true);

    }
  }, [code, form]);

  const navigate = useNavigate();
  const prefix = PrefixGlobal();
  const [loading, setLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [dataSample, setDataSample] = useState([]);
  const [selectSample, setSelectSample] = useState("");
  const [openSample, setOpenSample] = useState(null);
  const SampleCode = selectSample ? selectSample.samplecode : '';
  const SampleName = selectSample ? selectSample.samplename : '';

  const [dataPlanningTakingSample, setDataPlanningTakingSample] = useState([]);
  const [selectPlanningTakingSample, setSelectPlanningTakingSample] = useState("");
  const [openPlanningTakingSample, setOpenPlanningTakingSample] = useState(null);
  const PlanningTakingSampleNumber = selectPlanningTakingSample ? selectPlanningTakingSample.ptsnumber : '';

  const [dataSampleNo, setDataSampleNo] = useState([]);
  const [selectSampleNo, setSelectSampleNo] = useState("");
  const [openSampleNo, setOpenSampleNo] = useState(null);
  const SampleNoCode = selectSampleNo ? selectSampleNo.samplecode : '';
  const SampleNoName = selectSampleNo ? selectSampleNo.samplename : '';

  // DETAIL
  const [dataParameter, setDataParameter] = useState([]);
  const [dataCI, setDataCI] = useState([]);

  // SAMPLE
  useEffect(() => {
    const fetchSample = async () => {
      try {
        const res = await getSample(true);
        setDataSample(res);

        if (code && dataOne) {
          const selected = res.filter(item => item.samplecode === dataOne.samplecode);
          setSelectSample(selected[0]);
        }

      } catch (error) {
        console.log(error);
      }
    }

    if (openSample) {
      fetchSample();
      setIsLoading(false);
    }

  }, [code, dataOne, openSample]);


  // PLANNING TAKING SAMPLE
  useEffect(() => {
    const fetchPlanningTakingSample = async () => {
      try {
        const res = await getPlannigTakingSample(true);
        setDataPlanningTakingSample(res);
      } catch (error) {
        console.log(error);
      }
    }

    if (openPlanningTakingSample) {
      fetchPlanningTakingSample();
      setIsLoading(false);
    }

  }, [openPlanningTakingSample]);


  // SAMPLE NO
  useEffect(() => {
    const fetchSampleNo = async () => {
      try {
        const res = await getSample(true);
        setDataSampleNo(res);

        if (code && dataOne) {
          const selected = res.filter(item => item.samplecode === dataOne.sampleno);
          setSelectSampleNo(selected[0]);
        }

      } catch (error) {
        console.log(error);
      }
    }

    if (openSampleNo) {
      fetchSampleNo();
      setIsLoading(false);
    }

  }, [code, dataOne, openSampleNo]);


  useEffect(() => {
    form.setFieldsValue({
      samplename: SampleName,
      planningtakingsample: PlanningTakingSampleNumber,
      sampleno: SampleNoName
    })
  }, [PlanningTakingSampleNumber, SampleName, SampleNoName, form]);


  useEffect(() => {
    if (!code) {
      form.setFieldsValue({
        tsnumber: "",
        periode: dayjs().format('YYYYMM'),
      })
    }
  }, [code, form]);



  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        tranidx: selectedTranIdx,
        branchcode: '0001',
        samplecode: SampleCode,
        ptsnumber: "PTS0001",
        sampleno: SampleNoCode,
        taking_sample_parameters: dataParameter,
        taking_sample_ci: dataCI
      }

      if (code) {
        const res = await updateTakingSample(payload);
        message.success(res.data.message);
      } else {
        const res = await postTakingSample(payload);
        message.success(res.data.message);
      }

      console.log(payload);
      navigate('/sample_handling/taking_sample');
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
        <HeaderTitle title="TAKING SAMPLE" subtitle="form data a taking sample" />
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
              label="Taking Sample Number"
              name="tsnumber"
              rules={[
                !code &&
                {
                  validator: prefix,
                },
              ]}
            >
              <Input placeholder="Input Taking Sample Number" maxLength={6} />
            </Form.Item>

            <Form.Item
              label="Periode"
              name="periode"
              rules={[
                {
                  required: true,
                  message: "Please input your Periode!",
                },
              ]}
            >
              <Input placeholder="Input Periode" />
            </Form.Item>

            <Form.Item
              label="Taking Sample Date"
              name="tsdate"
              rules={[
                {
                  required: true,
                  message: "Please input your Taking Sample Date!",
                },
              ]}
            >
              <DatePicker placeholder="Input Taking Sample Date" className="w-full" />
            </Form.Item>

            <InputModal
              title="SAMPLE"
              label="Sample"
              name="samplename"
              dataSource={dataSample}
              loading={isLoading}
              columns={columnsSample}
              onData={(values) => setSelectSample(values)}
              onOpenModal={(values) => setOpenSample(values)}
              onEdit={selectSample}
            />

            {/* <InputModal
              title="PLANNING TAKING SAMPLE"
              label="Planning Taking Sample"
              name="planningtakingsample"
              dataSource={dataPlanningTakingSample}
              loading={isLoading}
              columns={columnsPlanningTakingSample}
              onData={(values) => setSelectPlanningTakingSample(values)}
              onOpenModal={(values) => setOpenPlanningTakingSample(values)}
              onEdit={selectPlanningTakingSample}
            /> */}

            <InputModal
              title="SAMPLE"
              label="Sample No"
              name="sampleno"
              dataSource={dataSampleNo}
              loading={isLoading}
              columns={columnsSample}
              onData={(values) => setSelectSampleNo(values)}
              onOpenModal={(values) => setOpenSampleNo(values)}
              onEdit={selectSampleNo}
            />

            <Form.Item
              label="Map Code"
              name="mapcode"
              rules={[
                {
                  required: true,
                  message: "Please input your Map Code!",
                },
              ]}
            >
              <Input placeholder="Input Map Code" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your Address!",
                },
              ]}
            >
              <Input.TextArea placeholder="Input Address" />
            </Form.Item>

            <Form.Item
              label="Weather"
              name="weather"
              rules={[
                {
                  required: true,
                  message: "Please input your Weather!",
                },
              ]}
            >
              <Input placeholder="Input Weather" />
            </Form.Item>

            <Form.Item
              label="Wind Direction"
              name="winddirection"
              rules={[
                {
                  required: true,
                  message: "Please input your Wind Direction!",
                },
              ]}
            >
              <Input placeholder="Input Wind Direction" />
            </Form.Item>

            <Form.Item
              label="Temperatur"
              name="temperatur"
              rules={[
                {
                  required: true,
                  message: "Please input your Temperatur!",
                },
              ]}
            >
              <Input placeholder="Input Temperatur" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
            >
              <Input.TextArea placeholder="Input Description" />
            </Form.Item>

          </div>

          <div className="m-4 p-4 border rounded-md">
            <FormTakingSampleParameter onSaveData={(values) => setDataParameter(values)} onEdit={dataOne} />
          </div>

          <div className="m-4 p-4 border rounded-md">
            <FormTakingSampleCI onSaveData={(values) => setDataCI(values)} onEdit={dataOne} />
          </div>

          <ButtonSubmit onReset={onReset} onLoading={loading} />

        </Form>
      </div>
    </>
  );
};

export default FormTakingSample;
