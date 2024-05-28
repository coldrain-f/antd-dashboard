import React, { useState } from "react";
import { Breadcrumb, FloatButton, Layout, theme } from "antd";

import CloudTabs from "./CloudTabs";
import CloudNavbar from "./CloudNavbar";
import CloudSideNavbar from "./CloudSideNavbar";
import {
  CommentOutlined,
  CustomerServiceOutlined,
  MoreOutlined,
  ToolOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const CloudMain: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  return (
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
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 42 }}
        icon={<ToolOutlined />}
      >
        <FloatButton icon={<CommentOutlined />} tooltip={<div>채팅창</div>} />
        <FloatButton.BackTop
          visibilityHeight={0}
          tooltip={<div>맨 위로</div>}
        />
      </FloatButton.Group>
    </Layout>
  );
};

export default CloudMain;
