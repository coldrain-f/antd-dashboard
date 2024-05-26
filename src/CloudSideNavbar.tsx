import React from "react";
import { Menu, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    key: "USER_ADMIN_001",
    icon: React.createElement(UserOutlined),
    label: "사용자 관리",
    children: [
      {
        key: "USER_ADMIN_001_1",
        label: "사용자 관리",
      },
    ],
  },
];

const CloudSideNavbar: React.FC = () => {
  return (
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
  );
};

export default CloudSideNavbar;
