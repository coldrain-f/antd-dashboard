import React from "react";
import { ConfigProvider, Menu, MenuProps, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { antdRecoilState } from "./recoil/antdRecoilState";
import { useRecoilState } from "recoil";

const CloudSideNavbar: React.FC = () => {
  const [antdState] = useRecoilState(antdRecoilState);

  const items: MenuProps["items"] = [
    {
      key: "USER_ADMIN_001",
      icon: React.createElement(UserOutlined),
      label: "회원 관리",
      children: [
        {
          key: "USER_ADMIN_001_1",
          label: "회원 관리",
        },
      ],
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          //colorPrimary: antdState.isDarkMode ? "#1677FF" : "",
          //colorPrimaryBg: antdState.isDarkMode ? "" : "#f3f4f6",
        },
      }}
    >
      <Menu
        mode="inline"
        defaultOpenKeys={["USER_ADMIN_001"]} // 부모
        defaultSelectedKeys={["USER_ADMIN_001_1"]} // 자식
        style={{
          height: "88vh",
          borderRight: 0,
        }}
        items={items}
      />
    </ConfigProvider>
  );
};

export default CloudSideNavbar;
