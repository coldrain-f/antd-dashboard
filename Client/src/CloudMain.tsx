import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Drawer,
  FloatButton,
  Layout,
  Row,
  Space,
  theme,
} from "antd";

import CloudTabs from "./CloudTabs";
import CloudNavbar from "./CloudNavbar";
import CloudSideNavbar from "./CloudSideNavbar";
import Link from "antd/es/typography/Link";
import CloudRightSider from "./CloudrRightSider";

import { antdSiderState } from "./recoil/antdSiderState";
import { useRecoilState } from "recoil";
import CloudHomeV2 from "./pages/CloudHomeV2";
import CloudHomeV3 from "./pages/CloudHomeV3";

const { Header, Content, Sider } = Layout;

const CloudMain: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const [siderState] = useRecoilState(antdSiderState);

  // 임시
  const [isMain, setIsMain] = useState(true);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Layout>
        <Header style={{ paddingLeft: 25 }}>
          <CloudNavbar />
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{ background: colorBgContainer }}
            // collapsible
            // collapsed={collapsed}
            // onCollapse={(value) => setCollapsed(value)}
          >
            <CloudSideNavbar />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Row style={{ marginRight: "50px" }}>
              <Col span={12}>
                <Breadcrumb
                  style={{ margin: "16px 0" }}
                  items={[
                    { title: "Admin" },
                    { title: "회원 관리" },
                    { title: "회원 관리" },
                  ]}
                ></Breadcrumb>
              </Col>
              <Col span={12} style={{ display: "flex", justifyContent: "end" }}>
                <Button
                  style={{ margin: "10px" }}
                  onClick={() => {
                    setIsMain(!isMain);
                  }}
                >
                  {isMain ? "Tabs" : "Analysis"}
                </Button>
              </Col>
            </Row>
            <Content
              style={{
                overflow: "auto",
                padding: 24,
                margin: 0,
                marginRight: "58px",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {isMain ? <CloudHomeV2 /> : <CloudTabs />}

              {/* <CloudTabs /> */}
            </Content>
          </Layout>
          <Sider
            width={60}
            collapsedWidth={340}
            style={{
              background: colorBgContainer,
              position: "absolute",
              top: 65,
              right: 0,
              bottom: 0,
              zIndex: 100,
            }}
            collapsed={siderState.collapsed}
          >
            <CloudRightSider />
          </Sider>
        </Layout>

        {/* Common */}
        <FloatButton.BackTop
          style={{ right: 70 }}
          tooltip={<div>맨 위로</div>}
        />

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
