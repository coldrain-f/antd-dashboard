import React from "react";
import { Menu, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";

const CloudSideNavbar: React.FC = () => {
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
