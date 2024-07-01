import React from "react";
import { Menu, theme } from "antd";
import {
  CalendarOutlined,
  FileOutlined,
  FolderOpenOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useRecoilState } from "recoil";

import Sider from "antd/es/layout/Sider";
import type { MenuProps } from "antd";
import type { SubMenuType } from "antd/es/menu/hooks/useItems";
import { antdRecoilState } from "../../recoil/antdRecoilState";
import { tasktrekTabState } from "../../recoil/tasktrekTabState";
import CloudExampleEditTable from "../guide/GuideDefaultEditGrid";
import AdminMenuManagement from "../admin/AdminMenuManagement";
import GuideDefaultEditGrid from "../guide/GuideDefaultEditGrid";
import TaskManagement from "../task/TaskManagement";
import TaskSampleGrid from "../task/TaskSampleGrid";

type MenuItem = Required<MenuProps>["items"][number];

const tabComponents = [
  {
    menuKey: "TODO_ADMIN_001_01",
    tabComponent: <TaskManagement />,
  },
  {
    menuKey: "TODO_ADMIN_001_02",
    tabComponent: <TaskSampleGrid />,
  },
  {
    menuKey: "TODO_ADMIN_001_03",
    tabComponent: <></>,
  },
  {
    menuKey: "EXERCISE_ADMIN_001_01",
    tabComponent: <GuideDefaultEditGrid />,
  },
];

const items: MenuItem[] = [
  {
    key: "EXERCISE_ADMIN_001",
    icon: React.createElement(FolderOpenOutlined),
    label: "트레이닝",
    children: [
      {
        key: "EXERCISE_ADMIN_001_01",
        label: "운동 관리",
      },
    ],
  },
];

const DashboardSiderBegin: React.FC = () => {
  const [recoilState] = useRecoilState(antdRecoilState);
  const [tabRecoilState, setTabRecoilState] = useRecoilState(tasktrekTabState);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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

    const tabComponent = tabComponents.find(
      (item) => item.menuKey == menuItem.key
    );

    if (tabComponent !== undefined) {
      addTab(menuItem.key, menuItem.label, tabComponent.tabComponent);
    }
  };

  return (
    <Sider width={200} style={{ background: colorBgContainer }}>
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
    </Sider>
  );
};
export default DashboardSiderBegin;
