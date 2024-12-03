import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { Col, DatePicker, Form, Input, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { PrefixGlobal, selectedTranIdx } from "../../../../components/Dashboard/Global/Helper";
import InputModal from "../../../../components/Dashboard/Global/InputModal";
import { columnsLabour } from "./ColumnsSampleHandling";

const FormSampleHandling = () => {
  const [form] = Form.useForm();
  const { code } = useParams();
  const [dataOne, setDataOne] = useState(null);


  const navigate = useNavigate();
  const prefix = PrefixGlobal();
  const [loading, setLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [dataLabour, setDataLabour] = useState([]);
  const [selectLabour, setSelectLabour] = useState("");
  const [openLabour, setOpenLabour] = useState(null);
  const LabourCode = selectLabour ? selectLabour.labourcode : '';
  const LabourName = selectLabour ? selectLabour.labourname : '';


  const [details, setDetails] = useState([]);


  // LABOUR
  // const fetchLabour = async () => {
  //   try {
  //     const res = await 
  //   } catch (error) {
      
  //   }
  // }
  

  const handleSubmit = (values) => {
    try {
      const payload = {
        ...values,
        tranidx: selectedTranIdx,
        branchcode: '0001',
        details: details
      };
      console.log("Submit", payload);
    } catch (error) {
      console.log(error);
    }
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

            <Form.Item
              label="Split Sample Number"
              name="srnumber"
              rules={[
                !code &&
                {
                  validator: prefix,
                },
              ]}
            >
              <Input placeholder="Input Split Sample Number" maxLength={6} />
            </Form.Item>

            <InputModal
              title="LABOUR"
              label="Labout"
              name="laboutname"
              dataSource={dataLabour}
              loading={isLoading}
              columns={columnsLabour}
              onData={(values) => setSelectLabour(values)}
              onOpenModal={(values) => setOpenLabour(values)}
              onEdit={selectLabour}
            />

            <Form.Item
              label="periode"
              name="periode"
              rules={[
                {
                  required: true,
                  message: "Please input your periode!",
                },
              ]}
            >
              <Input placeholder="Input periode" />
            </Form.Item>

            <Form.Item
              label="ssdate"
              name="ssdate"
              rules={[
                {
                  required: true,
                  message: "Please input your ssdate!",
                },
              ]}
            >
              <Input placeholder="Input ssdate" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
            >
              <Input.TextArea placeholder="Input Description" />
            </Form.Item>

          </div>

          {/* <div className="m-4 p-4 border rounded-md">
            <FormTakingSampleParameter onSaveData={(values) => setDataParameter(values)} onEdit={dataOne} />
          </div> */}

          <ButtonSubmit onReset={onReset} onLoading={loading} />

        </Form>
      </div>
    </>
  );
};

export default FormSampleHandling;
