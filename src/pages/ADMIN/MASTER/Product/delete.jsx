import { ExclamationCircleFilled, StopOutlined } from "@ant-design/icons";
import { Button, message, Modal, Tooltip } from "antd";
import React from "react";
import ButtonDelete from "../../../../components/Dashboard/Global/Button/ButtonDelete";
import { deleteProduct } from "../../../../Api/Master/DeleteData";

const { confirm } = Modal;

const DeleteProduct = ({ dataSource, onDelete }) => {

    const handleDelete = async () => {
        try {
            const res = await deleteProduct(dataSource.branchcode, dataSource.prodcode);
            message.success(res.data.message);
            onDelete(true);
            Modal.destroyAll();
        } catch (error) {
            console.log(error);
        }
    };

    const content = `Data Product Code ${dataSource.prodcode} & Product Name ${dataSource.prodname}...`;

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

export default DeleteProduct;