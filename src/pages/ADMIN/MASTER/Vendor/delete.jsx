import { ExclamationCircleFilled, StopOutlined } from "@ant-design/icons";
import { Button, message, Modal, Tooltip } from "antd";
import React from "react";
import ButtonDelete from "../../../../components/Dashboard/Global/Button/ButtonDelete";
import { deleteVendor } from "../../../../Api/Master/DeleteData";

const { confirm } = Modal;

const DeleteVendor = ({ dataSource, onDelete }) => {

  const handleDelete = async () => {
    try {
      const res = await deleteVendor(dataSource.branchcode, dataSource.vendorcode);
      message.success(res.data.message);
      onDelete(true);
      Modal.destroyAll();
    } catch (error) {
      console.log(error);
    }
  };

  const content = `Data Vendor Code ${dataSource.vendorcode} & Vendor Name ${dataSource.vendorname} ..`;

  const showConfirm = () => {
    confirm({
      title: "Do you want to suspend these items?",
      icon: <ExclamationCircleFilled />,
      content: content,
      centered: true,
      footer: <ButtonDelete onDelete={handleDelete} />,
    });
  };

  return (
    <>
      <Tooltip title="Suspend">
        <Button icon={<StopOutlined />} onClick={showConfirm} type="text" />
      </Tooltip>
    </>
  );
};

export default DeleteVendor;