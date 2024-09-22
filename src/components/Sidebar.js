import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button, Dropdown, Input, Layout, Menu, message, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  SearchOutlined,
  ExperimentOutlined,
  InboxOutlined,
  ReconciliationOutlined,
  FileProtectOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getTran } from '../Api/General/GetData';

const { Header, Content, Sider } = Layout;

const MySidebar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth <= 768);
  const [selectedKeys, setSelectedKeys] = useState(["1"]);
  const [openKeys, setOpenKeys] = useState();
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef(null);

  // const [dataTran, setDataTran] = useState([]);
  const [TranMaster, setTranMaster] = useState([]);
  const [TranSample, setTranSample] = useState([]);
  const [TranInventory, setTranInventory] = useState([]);
  const [TranEquipmentMaintenance, setTranEquipmentMaintenance] = useState([]);
  const [TranSetup, setTranSetup] = useState([]);
  const [Approval, setApproval] = useState([]);

  useEffect(() => {
    const fetchTran = async () => {
      try {
        const res = await getTran();
        // setDataTran(res);
        setTranMaster(res.filter((item) => item.trantype === 'Master'));
        setTranSample(res.filter((item) => item.trantype === 'Sample_Handling'));
        setTranInventory(res.filter((item) => item.trantype === 'Inventory'));
        setTranEquipmentMaintenance(res.filter((item) => item.trantype === 'Equipment_Maintenance'));
        setTranSetup(res.filter((item) => item.trantype === 'Setup'));
        setApproval(res.filter((item) => item.trantype === 'Approval'));
      } catch (error) {
        console.log(error);
      }
    }

    fetchTran();

  }, []);


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
    getItem("DASHBOARD", "1", <PieChartOutlined />, "/dashboard"),

    getItem("MASTER", "Master", <DatabaseOutlined />, null, [
      ...TranMaster.map((item) =>
        getItem(item.tranname, item.tranidx, '', `/${item.trantype.toLowerCase()}/${item.tranformname.toLowerCase()}`)
      ),
    ]),

    getItem("SAMPLE HANDLING", "Sample_Handling", <ExperimentOutlined />, null, [
      ...TranSample.map((item) =>
        getItem(item.tranname, item.tranidx, '', `/${item.trantype.toLowerCase()}/${item.tranformname.toLowerCase()}`)
      ),
    ]),

    getItem("INVENTORY", "Inventory", <InboxOutlined />, null, [
      ...TranInventory.map((item) =>
        getItem(item.tranname, item.tranidx, '', `/${item.trantype.toLowerCase()}/${item.tranformname.toLowerCase()}`)
      ),
    ]),

    getItem("EQUIPMENT MAINTENANCE", "Equipment_Maintenance", <ReconciliationOutlined />, null, [
      ...TranEquipmentMaintenance.map((item) =>
        getItem(item.tranname, item.tranidx, '', `/${item.trantype.toLowerCase()}/${item.tranformname.toLowerCase()}`)
      ),
    ]),

    getItem("SETUP", "Setup", <SettingOutlined />, null, [
      ...TranSetup.map((item) =>
        getItem(item.tranname, item.tranidx, '', `/${item.trantype.toLowerCase()}/${item.tranformname.toLowerCase()}`)
      ),
    ]),

    getItem("APPROVAL", "Approval", <FileProtectOutlined />, null, [
      ...Approval.map((item) =>
        getItem(item.tranname, item.tranidx, '', `/${item.trantype.toLowerCase()}/${item.tranformname.toLowerCase()}`)
      ),
    ]),

    // getItem("Transaction", "Transaction", <ContainerOutlined />, null, [
    //   getItem("Taking Sample", "27", null, "/transaction/taking-sample"),
    //   getItem("Sample Registration", "28", null, "/transaction/sample-registration"),
    //   getItem("Sample Handling", "29", null, "/transaction/sample-handling"),
    //   getItem("Testing Result", "30", null, "/transaction/testing-result"),
    //   getItem("Maintenance Request", "31", null, "/transaction/maintenance-request"),
    //   getItem("Maintenance Process", "32", null, "/transaction/maintenance-process"),
    //   getItem("Testing Order", "33", null, "/transaction/testing-order"),
    //   getItem("Planning Taking Sample", "34", null, "/transaction/planning-taking-sample"),
    //   getItem("Testing process", "35", null, "/transaction/testing-process"),
    //   getItem("Adjustment", "36", null, "/transaction/adjustment"),
    // ]),
    // getItem("Team", "sub2", <TeamOutlined />, null, [
    //   getItem("Team 1", "6", null, "/team/team1"),
    //   getItem("Team 2", "8", null, "/team/team2"),
    // ]),
    // getItem("Files", "9", <FileOutlined />, "/files"),
  ];

  const flattenItems = (items) => {
    return items.reduce((acc, item) => {
      if (item.children) {
        return [...acc, item, ...flattenItems(item.children)];
      }
      return [...acc, item];
    }, []);
  };

  const filteredItems = useMemo(() => {
    const flatItems = flattenItems(items);
    if (!searchValue) return items;

    const filtered = flatItems.filter(item =>
      item.label.props?.children.toLowerCase().includes(searchValue.toLowerCase())
    );

    // console.log(filtered);

    if (filtered.length === 0) {
      // console.log("not found");
      return [
        {
          label: <div className="flex w-full justify-center font-semibold text-xl">Menu Not Found!</div>
        }
      ]
    }

    return filtered.map(item => ({
      ...item,
      children: undefined // Remove children to avoid nested results
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, searchValue]);


  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'f') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

          <div className="p-4">
            <Input
              ref={searchInputRef}
              allowClear
              size="large"
              placeholder="Search Menu.. (Ctrl+F)"
              prefix={<SearchOutlined />}
              onChange={handleSearch}
              value={searchValue}
            />
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            items={filteredItems}
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
