import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  CalendarOutlined,
  ContainerOutlined,
  FileOutlined,
  FileTextOutlined,
  InboxOutlined,
  MenuOutlined,
  TableOutlined,
  TagsOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";

import { antdRecoilState } from "./recoil/antdRecoilState";
import { tasktrekTabState } from "./recoil/tasktrekTabState";
import { useRecoilState } from "recoil";

import type { MenuProps } from "antd";
import type { SubMenuType } from "antd/es/menu/hooks/useItems";
import CloudExampleEditTable from "./CloudExampleEditTable";
import TaskTrekMenuManagement from "./pages/guide/TaskTrekMenuManagement";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "TODO_ADMIN_001",
    icon: React.createElement(CalendarOutlined),
    label: "자기 관리",
    children: [
      {
        key: "TODO_ADMIN_001_01",
        label: "할 일 관리",
      },
      {
        key: "TODO_ADMIN_001_02",
        label: "메모 관리",
      },
      {
        key: "TODO_ADMIN_001_03",
        label: "일정 관리",
      },
    ],
  },
  {
    key: "USER_ADMIN_001",
    icon: React.createElement(UserOutlined),
    label: "회원 관리",
    children: [
      {
        key: "USER_ADMIN_001_01",
        label: "회원 관리",
      },
    ],
  },
  {
    key: "EXERCISE_ADMIN_001",
    icon: React.createElement(UserOutlined),
    label: "운동 관리",
    children: [
      {
        key: "EXERCISE_ADMIN_01",
        label: "운동 관리",
      },
    ],
  },
];

const CloudSideNavbar: React.FC = () => {
  const [recoilState] = useRecoilState(antdRecoilState);
  const [tabRecoilState, setTabRecoilState] = useRecoilState(tasktrekTabState);

  const addTab = (
    key: string,
    label: React.ReactNode,
    children: JSX.Element
  ) => {
    const newItem = { label, children, key, icon: <MenuOutlined /> };

    // 탭이 이미 존재하는지 체크
    const duplicate = tabRecoilState.items.find(
      (item) => item.key === newItem.key
    );
    if (duplicate !== undefined) {
      // 중복인 경우 activeKey만 설정
      setTabRecoilState((prevState) => ({
        items: [...prevState.items],
        activeKey: key,
      }));
      return;
    }

    setTabRecoilState((prevState) => ({
      items: [...prevState.items, newItem],
      activeKey: key,
    }));
  };

  const onClick: MenuProps["onClick"] = (e) => {
    const menuItem = items
      .find((item): item is SubMenuType => item?.key === e.keyPath[1])
      ?.children.find(
        (item): item is SubMenuType => item?.key === e.keyPath[0]
      ) as SubMenuType;

    addTab(menuItem.key, menuItem.label, <CloudExampleEditTable />);
  };

  return (
    <Menu
      onClick={onClick}
      mode="inline"
      // defaultOpenKeys={["TODO_ADMIN_001"]}
      // defaultSelectedKeys={["USER_ADMIN_001_1"]}
      style={{
        height: "93vh",
        borderLeft: recoilState.isDarkMode
          ? "0px solid #363636"
          : "1px solid #e0e0e0",
        borderRight: recoilState.isDarkMode
          ? "0px solid #363636"
          : "1px solid #e0e0e0",
      }}
      items={items}
    />
  );
};

export default CloudSideNavbar;
