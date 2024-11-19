"use client";

import ButtonDelete from "../../../../components/Dashboard/Global/Button/ButtonDelete";
import { DeleteFilled, ExclamationCircleFilled, StopOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import React from "react";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { setSuspendLabour } from "../../../../Api/Master/updateData";

const { confirm } = Modal;

const DeleteLabour = ({ labourCode, name, onDelete }) => {
  const { messageApi } = useMessageContext();

  const handleDelete = async () => {
    try {
      const response = await setSuspendLabour(labourCode);
      messageApi.open({
        type: "success",
        content: response.data.message,
      });
      onDelete(true);
      Modal.destroyAll();
    } catch (error) {
      console.log(error);
    }
  }

  const showConfirm = () => {
    confirm({
      title: "Do you want to suspend this item?",
      icon: <ExclamationCircleFilled />,
      content: `Labour ${name}`,
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

export default DeleteLabour;
