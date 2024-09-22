import React from "react";
import { Button, Modal, Tooltip } from "antd";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import ButtonDelete from "../../../../components/Dashboard/Global/Button/ButtonDelete";

const { confirm } = Modal;

const DeleteCustomer = () => {
  const handleDelete = () => {
    Modal.destroyAll();
    console.log("Delete Data!");
  };

  const content = "Data Customer..";

  const showConfirm = () => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: content,
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

export default DeleteCustomer;
