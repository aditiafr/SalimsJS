import React from "react";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import ButtonDelete from "../../../../components/Dashboard/Global/Button/ButtonDelete";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { deleteProductType } from "../../../../Api/Master/DeleteData";

const { confirm } = Modal;

const DeleteProductType  = ({ ProductTypeCode, name, onDelete }) => {
  const { messageApi } = useMessageContext();

  const handleDelete = async () => {
    try {
      const response = await deleteProductType(ProductTypeCode);
      messageApi.open({
        type: "success",
        content: response.data.message,
      });
      onDelete(true);
      Modal.destroyAll();
    } catch (error) {
      console.log(error);
    }
  };

  const showConfirm = () => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: `Product Type ${name}`,
      centered: true,
      footer: <ButtonDelete onDelete={handleDelete} />,
    });
  };

  return (
    <>
      <Tooltip title="Delete">
        <Button icon={<DeleteFilled />} onClick={showConfirm} type="text" />
      </Tooltip>
    </>
  );
};

export default DeleteProductType;
