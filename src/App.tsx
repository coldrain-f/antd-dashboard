import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, theme } from "antd";
import CloudLogin from "./CloudLogin";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CloudMain from "./CloudMain";

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CloudLogin />}></Route>
        <Route path="/dashboard/*" element={<CloudMain />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
