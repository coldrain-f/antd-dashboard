import React, { useState } from "react";
import {
  Breadcrumb,
  ConfigProvider,
  Drawer,
  FloatButton,
  Layout,
  Space,
  theme,
} from "antd";

import CloudTabs from "./CloudTabs";
import CloudNavbar from "./CloudNavbar";
import CloudSideNavbar from "./CloudSideNavbar";
import { BookOutlined, CommentOutlined, LinkOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";

const { Header, Content, Sider } = Layout;

const CloudMain: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Layout>
        <Header>
          <div className="demo-logo" />
          <CloudNavbar />
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{ background: colorBgContainer }}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <CloudSideNavbar />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>회원 관리</Breadcrumb.Item>
              <Breadcrumb.Item>회원 관리</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                overflow: "auto",
                padding: 24,
                margin: 0,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <CloudTabs />
            </Content>
          </Layout>
        </Layout>

        {/* Common */}
        <FloatButton.Group
          trigger="click"
          type="primary"
          style={{ right: 40 }}
          icon={<BookOutlined />}
        >
          <FloatButton
            icon={<LinkOutlined />}
            tooltip={<div>퀵 링크</div>}
            onClick={showDrawer}
          />
          <FloatButton icon={<CommentOutlined />} tooltip={<div>채팅</div>} />
          <FloatButton.BackTop
            visibilityHeight={0}
            tooltip={<div>맨 위로</div>}
          />
        </FloatButton.Group>

        <Drawer
          title="퀵 링크"
          onClose={onClose}
          open={open}
          extra={
            <Space>
              <Link>Edit</Link>
            </Space>
          }
        ></Drawer>
      </Layout>
    </>
  );
};

export default CloudMain;
