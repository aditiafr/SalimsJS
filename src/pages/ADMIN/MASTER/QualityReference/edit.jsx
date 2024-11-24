import { EditFilled } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/Dashboard/Global/HeaderTitle";
import ButtonEdit from "../../../../components/Dashboard/Global/Button/ButtonEdit";
import { updateQualityReference } from "../../../../Api/Master/updateData";
import SwitchComponent from "../../../../components/Dashboard/Global/SwitchComponent";
import InputModal from "../../../../components/Dashboard/Global/InputModal";
import { columnsProdCat } from "./columnsModal";
import { getProductCat } from "../../../../Api/Master/getData";

const EditQualityReference = ({ dataSource, onEdit }) => {

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuspend, setIsSuspend] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [dataProductCategory, setDataProductCategory] = useState([]);
  const [selectProductCategory, setSelectProductCategory] = useState("");
  // const [openProductCategory, setOpenProductCategory] = useState(null);
  const ProductCategoryName = selectProductCategory ? selectProductCategory.productcategoryname : '';
  const ProductCategoryCode = selectProductCategory ? selectProductCategory.productcategorycode : '';


  // PRODUCT CATEGORY
  useEffect(() => {
    const fetchProdCat = async () => {
      try {
        const res = await getProductCat();
        setDataProductCategory(res);

        const selected = res.filter((item) => item.productcategorycode === dataSource.prodcatcode);
        setSelectProductCategory(selected[0])

      } catch (error) {
        console.log(error);
      }
    }

    if (isModalOpen) {
      fetchProdCat();
      setIsLoading(false);
    }

  }, [dataSource.prodcatcode, isModalOpen]);


  useEffect(() => {
    form.setFieldsValue({
      ProductCategoryName: ProductCategoryName
    })
  }, [ProductCategoryName, form]);


  const handleSwitchChange = (checked) => {
    setIsSuspend(checked);
    form.setFieldsValue(dataSource);
  };

  useEffect(() => {
    form.setFieldsValue(dataSource);
  }, [dataSource, form])

  const showModal = () => {
    setIsModalOpen(true);
    setIsSuspend(dataSource.issuspend);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        issuspend: isSuspend,
        prodcatcode: ProductCategoryCode,
      }
      const response = await updateQualityReference(dataSource.qrid, payload);
      message.success(response.data.message);
      onEdit(true);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onReset = () => {
    form.setFieldsValue(dataSource);
    setIsSuspend(dataSource.Issuspend);
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title="Edit">
        <Button icon={<EditFilled />} type="text" onClick={showModal} />
      </Tooltip>

      <Modal
        title={
          <div className="flex justify-between items-center">
            <HeaderTitle title="QUALITY REFERENCE" subtitle="Edit data a Qualtity Reference" />
            <SwitchComponent
              isSuspend={isSuspend}
              handleSwitchChange={handleSwitchChange}
            />
          </div>
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
          autoComplete="off"
          form={form}
        >

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 p-6">

            <Form.Item
              label="Quality Reference Id"
              name="qrid"
            >
              <Input placeholder="Input Quality Referece Id" disabled />
            </Form.Item>

            <Form.Item
              label="Quality Reference Name"
              name="qrname"
              rules={[
                {
                  required: true,
                  message: "Please input your Quality Reference Name!",
                },
              ]}
            >
              <Input placeholder="Input Quality Reference Name" autoFocus />
            </Form.Item>

            <InputModal
              title="PRODUCT CATEGORY"
              label="Product Category"
              name="ProductCategoryName"
              dataSource={dataProductCategory}
              loading={isLoading}
              columns={columnsProdCat}
              onData={(values) => setSelectProductCategory(values)}
            // onOpenModal={(values) => setOpenProductCategory(values)}
            />

            <Form.Item
              label="Reference Value Quality"
              name="refvalueqty"
              rules={[
                {
                  required: true,
                  message: "Please input your Reference Value Quality!",
                },
              ]}
            >
              <InputNumber min={0} placeholder="Input Reference Value Quality" className="w-full" />
            </Form.Item>

            <Form.Item label="Description" name="description" className="lg:col-span-2">
              <Input.TextArea placeholder="Input Description" />
            </Form.Item>

          </div>

          <ButtonEdit onReset={onReset} onLoading={loading} />
        </Form>
      </Modal >
    </>
  );
};

export default EditQualityReference;
