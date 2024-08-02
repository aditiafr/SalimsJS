import React, { useState } from "react";
import {
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
  DatabaseOutlined,
  ContainerOutlined,
  BorderOuterOutlined,
  BorderInnerOutlined,
  TagOutlined,
  TagsOutlined,
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

    getItem("Master", "Master", <DatabaseOutlined />, null, [
      getItem("Building", "2", <LayoutOutlined />, "/master/building"),
      getItem("Warehouse", "3", <HomeOutlined />, "/master/warehouse"),
      getItem("Sample Storage Location", "4", <GroupOutlined />, "/master/sample-storage-location"),
      getItem("Storage Location", "5", <HddOutlined />, "/master/storage-location"),
      getItem("Vendor", "6", <ShopOutlined />, "/master/vendor"),
      getItem("Test Methode", "7", <ReconciliationOutlined />, "/master/test-methode"),
      getItem("Time Point", "8", <FieldTimeOutlined />, "/master/time-point"),
      getItem("Customer", "9", <TeamOutlined />, "/master/customer"),
      getItem("Product", "10", <DropboxOutlined />, "/master/product"),
      getItem("Department", "11", <ApartmentOutlined />, "/master/department"),
      getItem("Equipment Type", "12", <ToolOutlined />, "/master/equipment-type"),
      getItem("Packing Type", "13", <InboxOutlined />, "/master/packing-type"),
      getItem("Product Category", "14", <ShoppingOutlined />, "/master/product-category"),
      getItem("Product Type", "15", <ProductOutlined />, "/master/product-type"),
      getItem("Other Expense", "16", <ArrowUpOutlined />, "/master/other-expense"),
      getItem("Parameter Category", "17", <SlidersOutlined />, "/master/parameter-category"),
      getItem("Parameter", "18", <ControlOutlined />, "/master/parameter"),
      getItem("Equipment", "19", <ToolOutlined />, "/master/equipment"),
      getItem("Labour", "20", <UserOutlined />, "/master/labour"),
      getItem("Formula", "21", <CalculatorOutlined />, "/master/formula"),
      getItem("Formula Table Reference", "22", <CalculatorOutlined />, "/master/formula-table-ref"),
      getItem("Zona", "23", <BorderOuterOutlined />, "/master/zona"),
      getItem("Sub Zona", "24", <BorderInnerOutlined />, "/master/sub-zona"),
      getItem("Price List M", "25", <TagOutlined />, "/master/price-list-m"),
      getItem("Price List D", "26", <TagsOutlined />, "/master/price-list-d"),
    ]),

    getItem("Transaction", "Transaction", <ContainerOutlined />, null, [
      getItem("Taking Sample", "27", null, "/transaction/taking-sample"),
      getItem("Sample Registration", "28", null, "/transaction/sample-registration"),
      getItem("Sample Handling", "29", null, "/transaction/sample-handling"),
      getItem("Testing Result", "30", null, "/transaction/testing-result"),
      getItem("Maintenance Request", "31", null, "/transaction/maintenance-request"),
      getItem("Maintenance Process", "32", null, "/transaction/maintenance-process"),
      getItem("Testing Order", "33", null, "/transaction/testing-order"),
      getItem("Planning Taking Sample", "34", null, "/transaction/planning-taking-sample"),
      getItem("Testing process", "35", null, "/transaction/testing-process"),
      getItem("Adjustment", "36", null, "/transaction/adjustment"),
    ]),
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
        width={250} // Menambahkan lebar Sider
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
        <div className="w-full px-6 pt-2 pb-4">
          <img src="/assets/images/salims.png" alt="..." className="w-32" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250, // Menyesuaikan margin kiri sesuai dengan lebar Sider
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
