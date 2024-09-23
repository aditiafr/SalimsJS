"use client";

import React from "react";
import { Layout, theme } from "antd";
const { Footer } = Layout;

const MyFooter = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Footer
      style={{
        textAlign: "center",
        backgroundColor: colorBgContainer,
        color: "white",
      }}
    >
      Ant Design ©2018 Created by Ant UED
    </Footer>
  );
};

export default MyFooter;
