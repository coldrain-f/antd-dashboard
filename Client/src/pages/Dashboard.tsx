import React from "react";
import { Breadcrumb, FloatButton, Layout } from "antd";

import CloudNavbar from "../component/dashboard/DashboardNavbar";
import DashboardContent from "../component/dashboard/DashboardContent";
import DashboardSiderEnd from "../component/dashboard/DashboardSiderEnd";
import DashboardSiderBegin from "../component/dashboard/DashboardSiderBegin";

const { Header } = Layout;

const contentLayoutStyle: React.CSSProperties = {
  padding: "0 24px 24px",
};

const headerStyle: React.CSSProperties = {
  paddingLeft: "25px",
};

const floatButtonBackTopStyle: React.CSSProperties = {
  right: "70px",
};

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <Header style={headerStyle}>
        <CloudNavbar />
      </Header>
      <Layout>
        <DashboardSiderBegin />
        <Layout style={contentLayoutStyle}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[
              { title: "Admin" },
              { title: "회원 관리" },
              { title: "회원 관리" },
            ]}
          />
          <DashboardContent />
        </Layout>
        <DashboardSiderEnd />
      </Layout>
      <FloatButton.BackTop
        style={floatButtonBackTopStyle}
        tooltip={<div>맨 위로</div>}
      />
    </Layout>
  );
};

export default Dashboard;
