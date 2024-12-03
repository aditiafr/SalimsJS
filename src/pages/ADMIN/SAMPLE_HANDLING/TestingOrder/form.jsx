import { DatePicker, Form, Input, InputNumber, message } from "antd";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonSubmit from "../../../../components/Dashboard/Global/Button/ButtonSubmit";
import { PrefixGlobal, selectedTranIdx } from "../../../../components/Dashboard/Global/Helper";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputModal from "../../../../components/Dashboard/Global/InputModal";
import { getCustomer } from "../../../../Api/Master/getData";
import { columnsCustomer } from "./ColumnsTestingOrder";
import FormTestingOrderAcCost from "./AcCost/form";
import FormTestingOrderSample from "./Sample/form";
import DetailPriceSample from "./DetailPrice";
import { postTestingOrder } from "../../../../Api/SampleHandling/PostData";
import dayjs from "dayjs";
import { getTestingOrderOne } from "../../../../Api/SampleHandling/GetData";
import { updateTestingOrder } from "../../../../Api/SampleHandling/UpdateData";

const FormTestingOrder = () => {

  const [form] = Form.useForm();
  const { code } = useParams();
  const [dataOne, setDataOne] = useState(null);

  useEffect(() => {
    if (code) {
      setOpenCustomer(true);
    }
  }, [code]);


  const navigate = useNavigate();
  const prefix = PrefixGlobal();
  const [loading, setLoading] = useState(false);

  const [TPrice, setTPrice] = useState({
    Gross: 0,
    DiscountPersen: 0,
    TotalDiscount: 0,
    DPP: 0,
    VATPersen: 0,
    TotalVAT: 0,
    NET: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  const [dataCustomer, setDataCustomer] = useState([]);
  const [selectCustomer, setSelectCustomer] = useState("");
  const [openCustomer, setOpenCustomer] = useState(null);
  const CustomerCode = selectCustomer ? selectCustomer.customercode : '';
  const CustomerName = selectCustomer ? selectCustomer.customername : '';
  const ContactCustomer = selectCustomer ? selectCustomer.contact : '';

  const [dataAcCost, setDataAcCost] = useState([]);
  const [dataSample, setDataSample] = useState([]);
  const AC_EV = dataAcCost.length > 0 ? parseInt(dataAcCost.reduce((sum, item) => sum + item.expensevalue, 0)) : 0;
  const SMPL_STP = dataAcCost.length > 0 ? parseInt(dataSample.reduce((sum, item) => sum + item.subtotalprice, 0)) : 0;
  const Total_Gross = AC_EV + SMPL_STP;


  // EDIT DATA
  useEffect(() => {
    if (code) {

      const fetchDataOne = async () => {
        try {
          const res = await getTestingOrderOne(code);
          setDataOne(res);

          form.setFieldsValue({
            ...res,
            // customername: CustomerName,
            reqdate: dayjs(res.reqdate),
          });

        } catch (error) {
          console.log(error);
        }
      }

      fetchDataOne();

    }
  }, [code, form]);


  // // TOTAL PRICE
  // const Gross = Total_Gross
  // const DiscountPersen = valuePrice.discount
  // const TotalDiscount = Gross * (DiscountPersen / 100);
  // const DPP = Gross - TotalDiscount;
  // const VATPersen = valuePrice.vat
  // const TotalVAT = DPP * (VATPersen / 100);
  // const NET = DPP + TotalVAT;

  // useEffect(() => {
  //   setTPrice(
  //     {
  //       Gross: Gross,
  //       DiscountPersen: DiscountPersen,
  //       TotalDiscount: TotalDiscount,
  //       DPP: DPP,
  //       VATPersen: VATPersen,
  //       TotalVAT: TotalVAT,
  //       NET: NET,
  //     }
  //   )
  // }, [DPP, DiscountPersen, Gross, NET, TotalDiscount, TotalVAT, VATPersen]);

  // CUSTOMER
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await getCustomer(false);
        setDataCustomer(res);

        if (code && dataOne) {
          const selected = res.filter(item => item.customercode === dataOne.customercode);
          setSelectCustomer(selected[0]);
        }

      } catch (error) {
        console.log(error);
      }
    }

    if (openCustomer) {
      fetchCustomer();
      setIsLoading(false);
    }

  }, [code, dataOne, openCustomer]);


  useEffect(() => {
    form.setFieldsValue({
      customername: CustomerName,
      requestby: ContactCustomer,
    })
  }, [ContactCustomer, CustomerName, form]);

  useEffect(() => {
    if (!code) {
      form.setFieldsValue({
        periode: dayjs().format('YYYYMM'),
        reqdate: dayjs(),
        discount: 0,
        vat: 11,
        requestby: ContactCustomer,
      })
    }

  }, [ContactCustomer, code, form]);


  const handleSubmit = async (values) => {
    try {

      if (!dataAcCost.length > 0 || !dataSample.length > 0) {
        message.info("Complete the detail Testing Order data form!");
        return;
      }

      setLoading(true);

      const payload = {
        ...values,
        tranidx: selectedTranIdx,
        branchcode: '0001',
        customercode: CustomerCode,
        reqdate: values.reqdate.format('YYYY-MM-DD'),
        gross: TPrice.Gross,
        discount_p: TPrice.DiscountPersen,
        discount_m: TPrice.TotalDiscount,
        dpp: TPrice.DPP,
        vat: TPrice.VATPersen,
        net: TPrice.NET,
        testing_order_ac: dataAcCost,
        testing_order_sample: dataSample,
      }

      if (code) {
        const res = await updateTestingOrder(payload);
        message.success(res.data.message);
      } else {
        const res = await postTestingOrder(payload);
        message.success(res.data.message);
        console.log(payload);

      }

      navigate('/sample_handling/testing_order');
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
    setLoading(false);
  }

  const onReset = () => {
    form.resetFields();
  };


  return (
    <>
      <div className="flex justify-between items-center px-2 pb-4">
        <HeaderTitle title="TESTING ORDER" subtitle="form data a testing order" />
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
              label="Request Number"
              name="reqnumber"
              rules={[
                !code &&
                {
                  validator: prefix,
                },
              ]}
            >
              <Input placeholder="Input Request Number" maxLength={6} defaultValue="" />
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
              <Input placeholder="Input Periode" autoFocus />
            </Form.Item>

            <Form.Item
              label="Request Date"
              name="reqdate"
              rules={[
                {
                  required: true,
                  message: "Please input your Request Date!",
                },
              ]}
            >
              <DatePicker placeholder="Input Request Date" className="w-full" />
            </Form.Item>

            <InputModal
              title="CUSTOMER"
              label="Customer"
              name="customername"
              dataSource={dataCustomer}
              loading={isLoading}
              columns={columnsCustomer}
              onData={(values) => setSelectCustomer(values)}
              onOpenModal={(values) => setOpenCustomer(values)}
              onEdit={selectCustomer}
            />

            <Form.Item
              label="Request By"
              name="requestby"
              rules={[
                {
                  required: true,
                  message: "Please input your Request By!",
                },
              ]}
            >
              <Input placeholder="Input Request By" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
            >
              <Input.TextArea placeholder="Input Description" />
            </Form.Item>

          </div>

          <div className="m-4 p-4 border rounded-md">
            <FormTestingOrderAcCost onSaveData={(values) => setDataAcCost(values)} onEdit={dataOne} />
          </div>

          <div className="m-4 p-4 border rounded-md">
            <FormTestingOrderSample onSaveData={(values) => setDataSample(values)} onEdit={dataOne} />
          </div>

          <div className="m-4 my-8 px-4 border rounded-md">
            <DetailPriceSample valueGross={Total_Gross} onData={(values) => setTPrice(values)} onEdit={dataOne} />
          </div>

          <ButtonSubmit onReset={onReset} onLoading={loading} />

        </Form>
      </div>
    </>
  );
};

export default FormTestingOrder;
