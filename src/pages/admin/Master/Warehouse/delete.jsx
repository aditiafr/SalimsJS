import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import ButtonDelete from "../../../../components/Dashboard/Global/Button/ButtonDelete";
import { useMessageContext } from "../../../../components/Dashboard/Global/MessageContext";
import { deleteWarehouse } from "../../../../Api/Master/DeleteData";

const { confirm } = Modal;

const DeleteWarehouse = ({ dataSource, onDelete }) => {
  const { messageApi } = useMessageContext();

  const handleDelete = async () => {
    try {
      const res = await deleteWarehouse(dataSource.warehousecode);
      messageApi.open({
        type: 'success',
        content: res.data.msg,
      });
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
