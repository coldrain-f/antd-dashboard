import React from "react";
import { Breadcrumb, Col, FloatButton, Layout, Row, theme } from "antd";

import CloudTabs from "./CloudTabs";
import CloudNavbar from "./CloudNavbar";
import CloudSideNavbar from "./CloudSideNavbar";
import CloudRightSider from "./CloudrRightSider";

import { antdSiderState } from "./recoil/antdSiderState";
import { tasktrekTabState } from "./recoil/tasktrekTabState";
import { useRecoilState } from "recoil";

import CloudHomeV2 from "./pages/CloudHomeV2";

const { Header, Content, Sider } = Layout;

const CloudMain: React.FC = () => {
  const [tabRecoilState] = useRecoilState(tasktrekTabState);
  const [siderState] = useRecoilState(antdSiderState);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout>
        <Header style={{ paddingLeft: 25 }}>
          <CloudNavbar />
        </Header>
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }}>
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
                />
              </Col>
              <Col
                span={12}
                style={{ display: "flex", justifyContent: "end" }}
              ></Col>
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
              {tabRecoilState.items.length ? <CloudTabs /> : <CloudHomeV2 />}
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
        <FloatButton.BackTop
          style={{ right: 70 }}
          tooltip={<div>맨 위로</div>}
        />
      </Layout>
    </>
  );
};

export default CloudMain;
