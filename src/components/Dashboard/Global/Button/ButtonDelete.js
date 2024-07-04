import { Button, Modal } from "antd";
import React from "react";

const ButtonDelete = ({ onDelete }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "16px",
      }}
    >
      <Button onClick={() => Modal.destroyAll()} style={{ marginRight: 8 }}>
        Cancel
      </Button>
      <Button danger type="primary" onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
};

export default ButtonDelete;
