import { ExclamationCircleFilled, StopOutlined } from "@ant-design/icons";
import { Button, message, Modal, Tooltip } from "antd";
import React from "react";
import ButtonDelete from "../../../../components/Dashboard/Global/Button/ButtonDelete";
import { deleteSampleLocation } from "../../../../Api/Master/DeleteData";

const { confirm } = Modal;

const DeleteSampleLocation = ({ dataSource, onDelete }) => {

  const handleDelete = async () => {
    try {
      const res = await deleteSampleLocation(dataSource.buildingcode, dataSource.locationcode);
      message.success(res.data.message);
      onDelete(true);
      Modal.destroyAll();
    } catch (error) {
      console.log(error);
    }
  };

  const content = `Data Building Name ${dataSource.buildingname} Sample Location Code ${dataSource.locationcode}, Sample Location Name ${dataSource.locationname}...`;

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

export default DeleteSampleLocation;