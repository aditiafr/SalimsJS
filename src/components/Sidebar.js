"use client";

import React, { useState } from "react";
import {
  FileOutlined,
  HomeOutlined,
  LayoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  ApartmentOutlined,
  ToolOutlined,
  InboxOutlined,
  ShoppingOutlined,
  ProductOutlined,
  ArrowUpOutlined,
  SlidersOutlined,
  ControlOutlined,
  GroupOutlined,
  HddOutlined,
  ShopOutlined,
  ReconciliationOutlined,
  FieldTimeOutlined,
  DropboxOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
const { Header, Sider, Content, Footer } = Layout;

const MySidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function getItem(label, key, icon, href, children) {
    return {
      key,
      icon,
      label: href ? <Link to={href}>{label}</Link> : label,
      children,
    };
  }

  const items = [
    getItem("dashboard", "1", <PieChartOutlined />, "/dashboard"),
    getItem("Building", "2", <LayoutOutlined />, "/master/building"),
    getItem("Warehouse", "3", <HomeOutlined />, "/master/warehouse"),
    getItem(
      "Sample Storage Location",
      "4",
      <GroupOutlined />,
      "/master/samplestoragelocation"
    ),
    getItem(
      "Storage Location",
      "5",
      <HddOutlined />,
      "/master/storagelocation"
    ),
    getItem("Vendor", "6", <ShopOutlined />, "/master/vendor"),
    getItem(
      "Test Methode",
      "7",
      <ReconciliationOutlined />,
      "/master/testmethode"
    ),
    getItem("Time Point", "8", <FieldTimeOutlined />, "/master/timepoint"),
    getItem("Customer", "9", <TeamOutlined />, "/master/customer"),
    getItem("Product", "10", <DropboxOutlined />, "/master/product"),

    getItem("Department", "11", <ApartmentOutlined />, "/master/department"),
    getItem("Equipment Type", "12", <ToolOutlined />, "/master/equipmenttype"),
    getItem("Packing Type", "13", <InboxOutlined />, "/master/packingtype"),
    getItem(
      "Product Category",
      "14",
      <ShoppingOutlined />,
      "/master/productcategory"
    ),
    getItem("Product Type", "15", <ProductOutlined />, "/master/producttype"),
    getItem("Other Expense", "16", <ArrowUpOutlined />, "/master/otherexpense"),
    getItem(
      "Parameter Category",
      "17",
      <SlidersOutlined />,
      "/master/parametercategory"
    ),
    getItem("Parameter", "18", <ControlOutlined />, "/master/parameter"),
    getItem("Equipment", "19", <ToolOutlined />, "/master/equipment"),
    getItem("Labour", "20", <UserOutlined />, "/master/labour"),
    getItem("Formula", "21", <CalculatorOutlined />, "/master/formula"),
    getItem(
      "Formula Table Reference",
      "22",
      <CalculatorOutlined />,
      "/master/formulatableref"
    ),
    // getItem("User", "sub1", <UserOutlined />, null, [
    //   getItem("Tom", "3", null, "/user/tom"),
    //   getItem("Bill", "4", null, "/user/bill"),
    //   getItem("Alex", "5", null, "/user/alex"),
    // ]),
    // getItem("Team", "sub2", <TeamOutlined />, null, [
    //   getItem("Team 1", "6", null, "/team/team1"),
    //   getItem("Team 2", "8", null, "/team/team2"),
    // ]),
    // getItem("Files", "9", <FileOutlined />, "/files"),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: colorBgContainer,
        }}
      >
        <div className="demo-logo-vertical" />
        <div className="w-full px-4 py-2">
          <img src="/assets/image/salims.png" alt="..." />
        </div>
        <Menu
          theme="light"
          mode="inline"
          // defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            flex: 1,
          }}
        >
          {children}
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default MySidebar;
