import React from "react";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import ButtonDelete from "../../../../components/Dashboard/Global/Button/ButtonDelete";

const { confirm } = Modal;

const DeletePackingType = ({ name }) => {
  const handleDelete = () => {
    Modal.destroyAll();
    console.log("Delete Data!");
  };

  const showConfirm = () => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: `Packing Type ${name}`,
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

export default DeletePackingType;
