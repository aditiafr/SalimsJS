import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { Col, DatePicker, Form, Input, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PrefixGlobal, selectedTranIdx } from "../../../../components/Dashboard/Global/Helper";
import InputModal from "../../../../components/Dashboard/Global/InputModal";
import { columnsLabour, columnsSR } from "./ColumnsSampleHandling";
import { getLabour } from "../../../../Api/Master/getData";
import { getSampleRegistration } from "../../../../Api/SampleHandling/GetData";
import dayjs from "dayjs";
import FormDetailSampleHandling from "./Detail/form";

const FormSampleHandling = () => {
  const [form] = Form.useForm();
  const { code } = useParams();
  const [dataOne, setDataOne] = useState(null);


  const navigate = useNavigate();
  const prefix = PrefixGlobal();
  const [loading, setLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [dataSR, setDataSR] = useState([]);
  const [selectSR, setSelectSR] = useState("");
  const [openSR, setOpenSR] = useState(null);
  const SRNumber = selectSR ? selectSR.srnumber : '';

  const [dataLabour, setDataLabour] = useState([]);
  const [selectLabour, setSelectLabour] = useState("");
  const [openLabour, setOpenLabour] = useState(null);
  const LabourCode = selectLabour ? selectLabour.labourcode : '';
  const LabourName = selectLabour ? selectLabour.labourname : '';

  const [dataDetail, setDataDetail] = useState([]);


  // SAMPLE REGISTRATION
  useEffect(() => {
    const fetchSR = async () => {
      try {
        const res = await getSampleRegistration(true);
        setDataSR(res);
      } catch (error) {
        console.log(error);
      }
    }

    if (openSR) {
      fetchSR();
      setIsLoading(false);
    }

  }, [openSR]);


  // LABOUR
  useEffect(() => {
    const fetchLabour = async () => {
      try {
        const res = await getLabour(true);
        setDataLabour(res);
      } catch (error) {
        console.log(error);
      }
    }

    if (openLabour) {
      fetchLabour();
      setIsLoading(false);
    }

  }, [openLabour]);


  useEffect(() => {
    form.setFieldsValue({
      srnumber: SRNumber,
      labourname: LabourName
    })
  }, [LabourName, SRNumber, form]);


  useEffect(() => {
    form.setFieldsValue({
      periode: dayjs().format("YYYYMM")
    })
  }, [form]);



  const handleSubmit = (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        tranidx: selectedTranIdx,
        branchcode: '0001',
        labourcode: LabourCode,
        details: dataDetail
      };
      console.log("Submit", payload);
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
        <HeaderTitle title="SAMPLE HANDLING" subtitle="form data a sample handling" />
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
              title="SAMPLE REGISTRATION"
              label="Sample Registration"
              name="srnumber"
              dataSource={dataSR}
              loading={isLoading}
              columns={columnsSR}
              onData={(values) => setSelectSR(values)}
              onOpenModal={(values) => setOpenSR(values)}
              onEdit={selectSR}
            />

            <InputModal
              title="LABOUR"
              label="Labour"
              name="labourname"
              dataSource={dataLabour}
              loading={isLoading}
              columns={columnsLabour}
              onData={(values) => setSelectLabour(values)}
              onOpenModal={(values) => setOpenLabour(values)}
              onEdit={selectLabour}
            />

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
              label="SS Date"
              name="ssdate"
              rules={[
                {
                  required: true,
                  message: "Please input your SS Date!",
                },
              ]}
            >
              {/* <Input placeholder="Input SS Date" /> */}
              <DatePicker placeholder="Input SS Date" className="w-full" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              className="md:col-span-2"
            >
              <Input.TextArea placeholder="Input Description" />
            </Form.Item>

          </div>

          <div className="m-4 p-4 border rounded-md">
            <FormDetailSampleHandling onSaveData={(values) => setDataDetail(values)} onEdit={dataOne} />
          </div>

          <ButtonSubmit onReset={onReset} onLoading={loading} />

        </Form>
      </div>
    </>
  );
};

export default FormSampleHandling;
