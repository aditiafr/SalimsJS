import { ExclamationCircleFilled, StopOutlined } from "@ant-design/icons";
import { Button, message, Modal, Tooltip } from "antd";
import React from "react";
import ButtonDelete from "../../../../components/Dashboard/Global/Button/ButtonDelete";
import { deleteMaintenanceRequest } from "../../../../Api/Maintenance/DeleteData";

const { confirm } = Modal;

const DeleteMaintenanceRequest = ({ dataSource, onDelete }) => {

  const handleDelete = async () => {
    try {
      console.log(dataSource);
      let detail = [
        {
          equipmentversion: dataSource.equipmentversion,
          equipmentcode: dataSource.equipmentcode
        }
      ];
      console.log(detail);


      const res = await deleteMaintenanceRequest(dataSource.branchcode, dataSource.mrnumber, detail);
      message.success(res.data.message);
      onDelete(true);
      Modal.destroyAll();
    } catch (error) {
      console.log(error);
    }
  };

  const content = `Data Maintenance Request Number ${dataSource.mrnumber} in Branch ${dataSource.branchcode}...`;

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

export default DeleteMaintenanceRequest;