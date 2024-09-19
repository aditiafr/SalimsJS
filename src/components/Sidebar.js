import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Layout, Menu, message, theme } from 'antd';
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
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getTran } from '../Api/General/GetData';

const { Header, Content, Footer, Sider } = Layout;

const MySidebar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth <= 768);
  const [selectedKeys, setSelectedKeys] = useState(["1"]);
  const [openKeys, setOpenKeys] = useState();

  const [dataTran, setDataTran] = useState([]);
  const [TranMaster, setTranMaster] = useState([]);

  useEffect(() => {
    const fetchTran = async () => {
      try {
        const res = await getTran();
        setDataTran(res);
        setTranMaster(res.filter((item) => item.trantype === 'Master'));
      } catch (error) {
        console.log(error);
      }
    }

    fetchTran();

  }, []);

  // console.log("DATA TRAN", dataTran);
  console.log("DATA TRAN Master", TranMaster);


  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
    };
    if (mobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobile]);

  useEffect(() => {
    // Read the selected key and open keys from localStorage
    const storedSelectedKey = localStorage.getItem('selectedMenuKey');
    const storedOpenKeys = localStorage.getItem('openMenuKeys');

    if (storedSelectedKey) {
      setSelectedKeys([storedSelectedKey]);
    }

    if (storedOpenKeys) {
      setOpenKeys(JSON.parse(storedOpenKeys));
    }
  }, []);

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
      ...TranMaster.map((item) =>
        getItem(item.tranname, item.tranidx, '', `/${item.trantype.toLowerCase()}/${item.tranformname.toLowerCase()}`)
      ),
      // getItem("Building", "2", <LayoutOutlined />, "/master/building"),
      // getItem("Warehouse", "3", <HomeOutlined />, "/master/warehouse"),
      // getItem("Sample Storage Location", "4", <GroupOutlined />, "/master/sample-storage-location"),
      // getItem("Storage Location", "5", <HddOutlined />, "/master/storage-location"),
      // getItem("Vendor", "6", <ShopOutlined />, "/master/vendor"),
      // getItem("Test Methode", "7", <ReconciliationOutlined />, "/master/test-methode"),
      // getItem("Time Point", "8", <FieldTimeOutlined />, "/master/time-point"),
      // getItem("Customer", "9", <TeamOutlined />, "/master/customer"),
      // getItem("Product", "10", <DropboxOutlined />, "/master/product"),
      // getItem("Department", "11", <ApartmentOutlined />, "/master/department"),
      // getItem("Equipment Type", "12", <ToolOutlined />, "/master/equipment-type"),
      // getItem("Packing Type", "13", <InboxOutlined />, "/master/packing-type"),
      // getItem("Product Category", "14", <ShoppingOutlined />, "/master/product-category"),
      // getItem("Product Type", "15", <ProductOutlined />, "/master/product-type"),
      // getItem("Other Expense", "16", <ArrowUpOutlined />, "/master/other-expense"),
      // getItem("Parameter Category", "17", <SlidersOutlined />, "/master/parameter-category"),
      // getItem("Parameter", "18", <ControlOutlined />, "/master/parameter"),
      // getItem("Equipment", "19", <ToolOutlined />, "/master/equipment"),
      // getItem("Labour", "20", <UserOutlined />, "/master/labour"),
      // getItem("Formula", "21", <CalculatorOutlined />, "/master/formula"),
      // getItem("Formula Table Reference", "22", <CalculatorOutlined />, "/master/formula-table-ref"),
      // getItem("Zona", "23", <BorderOuterOutlined />, "/master/zona"),
      // getItem("Sub Zona", "24", <BorderInnerOutlined />, "/master/sub-zona"),
      // getItem("Price List M", "25", <TagOutlined />, "/master/price-list-m"),
      // getItem("Price List D", "26", <TagsOutlined />, "/master/price-list-d"),
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


  const handleMenuClick = (e) => {
    // Save the clicked menu key to localStorage
    if (mobile) {
      setCollapsed(true);
    }
    localStorage.setItem('selectedMenuKey', e.key);
    setSelectedKeys([e.key]);
  };

  const handleOpenChange = (keys) => {
    // Save the open keys to localStorage
    localStorage.setItem('openMenuKeys', JSON.stringify(keys));
    setOpenKeys(keys);
  };

  const handleSignOut = () => {
    Cookies.remove('auth_token');
    localStorage.clear();
    navigate('/');
    message.success('You have successfully Sign out.');
  }

  const menuItems = [
    {
      key: 'account',
      icon: <UserOutlined />,
      label: 'Profile Account',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: <button onClick={handleSignOut}>Sign Out</button>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!mobile || (mobile && !collapsed) ? (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={300}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: "#001529",
            color: "#fff"
          }}
        >
          <div className="demo-logo-vertical" />
          {/* <div className="w-full px-4 py-2 flex items-center justify-center">
            {!collapsed ? (
              <p className="text-4xl font-bold">SA-CRMS</p>
            ) : (
              <p className="text-xl font-bold">SA</p>
            )}
          </div> */}
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            items={items}
            onClick={handleMenuClick}
            onOpenChange={handleOpenChange}
            style={{
              color: '#ffffff'
            }}
          />
        </Sider>
      ) : null}
      <Layout
        style={{
          marginLeft: mobile && collapsed ? 0 : (collapsed ? 80 : 300),
          transition: "margin-left 0.2s",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 42,
              height: 42,
            }}
          />

          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <div className="flex items-center justify-center gap-2 mr-5 cursor-pointer">
              <div className="border rounded-full p-2 flex items-center justify-center">
                <UserOutlined style={{ fontSize: '16px' }} />
              </div>
              <p>{location.pathname.startsWith('/customer') ? "Customer" : "Admin"}</p>
            </div>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
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
