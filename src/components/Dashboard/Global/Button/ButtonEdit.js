import { Button } from "antd";
import React from "react";

const ButtonEdit = ({ onReset }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        position: "sticky",
        top: 0,
        bottom: 0,
        zIndex: 1000,
        width: "100%",
        padding: "8px 14px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Button type="primary" danger htmlType="button" onClick={onReset}>
        Cancel
      </Button>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </div>
  );
};

export default ButtonEdit;
