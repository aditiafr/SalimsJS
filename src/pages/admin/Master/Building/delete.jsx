import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, message, Modal, Tooltip } from "antd";
import React from "react";
import ButtonDelete from "../../../../components/Dashboard/Global/Button/ButtonDelete";
import { deleteBuilding } from "../../../../Api/Master/DeleteData";

const { confirm } = Modal;

const DeleteBuilding = ({ dataSource, onDelete }) => {

  const handleDelete = async () => {
    try {
      const res = await deleteBuilding(dataSource.buildingcode);
      message.success(res.data.message);
      onDelete(true);
      Modal.destroyAll();
    } catch (error) {
      console.log(error);
    }
  };

  const content = `Data Building Code ${dataSource.buildingcode} & Building Name ${dataSource.buildingname} ..`;

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

export default DeleteBuilding;