import { Button } from "antd";
import React from "react";

const ButtonSubmit = ({ onReset, onLoading }) => {
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
        padding: "20px",
        boxShadow: "0px -4px 4px #00000016",
        backgroundColor: "#FFFFFF",
        borderRadius: "0 0 8px 8px",
      }}
    >
      <Button type="primary" danger htmlType="button" onClick={onReset}>
        Cancel
      </Button>
      <Button type="primary" htmlType="submit" loading={onLoading}>
        Submit
      </Button>
    </div>
  );
};

export default ButtonSubmit;
