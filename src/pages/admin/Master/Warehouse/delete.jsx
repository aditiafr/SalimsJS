import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, message, Modal, Tooltip } from "antd";
import ButtonDelete from "../../../../components/Dashboard/Global/Button/ButtonDelete";
import { deleteWarehouse } from "../../../../Api/Master/DeleteData";

const { confirm } = Modal;

const DeleteWarehouse = ({ dataSource, onDelete }) => {

  const handleDelete = async () => {
    try {
      const res = await deleteWarehouse(dataSource.warehousecode);
      message.success(res.data.message);
      onDelete(true);
      Modal.destroyAll();
    } catch (error) {

    }
  };

  const content = `Data Warehouse Code ${dataSource.warehousecode} & Warehouse ${dataSource.warehousename}..`;

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

export default DeleteWarehouse;
