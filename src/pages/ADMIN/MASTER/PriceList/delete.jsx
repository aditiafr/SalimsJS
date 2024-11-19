import React from "react";
import { DeleteFilled, ExclamationCircleFilled, StopOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import ButtonDelete from "../../../../components/Dashboard/Global/Button/ButtonDelete";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { setSuspendPriceList } from "../../../../Api/Master/updateData";

const { confirm } = Modal;

const DeletePriceList = ({ priceListCode, name, onDelete }) => {
  const { messageApi } = useMessageContext();

  const handleDelete = async () => {
    try {
      const response = await setSuspendPriceList(priceListCode);
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
      title: "Do you want to suspend this item?",
      icon: <ExclamationCircleFilled />,
      content: `Price List ${name}`,
      centered: true,
      footer: <ButtonDelete onDelete={handleDelete} />,
    });
  };

  return (
    <>
      <Tooltip title="Delete">
        <Button icon={<StopOutlined />} onClick={showConfirm} type="text" />
      </Tooltip>
    </>
  );
};

export default DeletePriceList;
