import React from "react";
import {
  BellOutlined,
  LaptopOutlined,
  MoonOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Avatar,
  Breadcrumb,
  Col,
  Layout,
  Menu,
  Popover,
  Row,
  Space,
  theme,
} from "antd";

import CloudTabs from "./CloudTabs";

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
            <CloudTabs />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CloudMain;
