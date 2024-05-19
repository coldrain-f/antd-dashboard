import React from "react";
import {
  BellOutlined,
  LaptopOutlined,
  MoonOutlined,
  NotificationOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Col,
  Input,
  Layout,
  Menu,
  Popover,
  Row,
  Space,
  Tabs,
  theme,
} from "antd";
import { Routes, Route } from "react-router-dom";
import AntdContentsTable from "./AntdContentsTable";
import CloudLogin from "./CloudLogin";

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = [
  { key: 1, label: "Home" },
  { key: 2, label: "Dashboard" },
];

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const tabItems = [
  { label: "Tab 1", key: "1", children: <AntdContentsTable /> },
  { label: "Tab 2", key: "2", children: "Hello world! - 2" },
];

const CloudMain: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header>
        <div className="demo-logo" />
        <Row>
          <Col span={22}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={items1}
              style={{ flex: 1, minWidth: 0 }}
            />
          </Col>
          <Col
            span={2}
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Space>
              <a href="#">
                <Avatar icon={<MoonOutlined />} />
              </a>
              <a>
                <Avatar icon={<BellOutlined />} />
              </a>
              <Popover
                placement="bottomRight"
                title={"Profile"}
                content={"Content"}
                trigger={"click"}
              >
                <Avatar
                  style={{
                    backgroundColor: "#87d068",
                    cursor: "pointer",
                    marginLeft: "12px",
                  }}
                  icon={<UserOutlined />}
                />
              </Popover>
            </Space>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "93vh",
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* hideAdd */}
            <Tabs type="editable-card" items={tabItems} accessKey="1"></Tabs>
            <Routes>
              <Route path="/tree" element={<AntdContentsTable />}></Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CloudMain;
