import { SVGProps, useState } from "react";
import {
  BellOutlined,
  CompressOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Flex,
  Menu,
  MenuProps,
  Popconfirm,
  Space,
  Tooltip,
  theme,
} from "antd";

import { useRecoilState } from "recoil";
import { antdRecoilState } from "../../recoil/antdRecoilState";
import { tasktrekTabState } from "../../recoil/tasktrekTabState";

import DashboardNavbarProfile from "./DashboardNavbarProfile";
import TaskTrekWhiteLogo from "../logo/TaskTrekWhiteLogo";

const TaskTrekLogoProps: SVGProps<SVGSVGElement> = {
  width: "125px",
  viewBox: "0 0 4096 1554.887939983557",
  style: { cursor: "pointer" },
};

const initalItems: MenuProps["items"] = [
  { key: 1, label: "Home" },
  { key: 2, label: "Admin" },
  { key: 3, label: "Guide" },
];

const DashboardNavbar: React.FC = () => {
  const [antdState, setAntdState] = useRecoilState(antdRecoilState);
  const [tabRecoilState, setTabRecoilState] = useRecoilState(tasktrekTabState);

  const [items] = useState<MenuProps["items"]>(initalItems);

  const toggleDarkMode = () => {
    if (antdState.isDarkMode) {
      setAntdState((prevState) => ({
        ...prevState,
        algorithm: antdState.isCompactMode ? [theme.compactAlgorithm] : [],
        isDarkMode: false,
      }));
    } else {
      setAntdState((prevState) => ({
        ...prevState,
        algorithm: antdState.isCompactMode
          ? [theme.compactAlgorithm, theme.darkAlgorithm]
          : [theme.darkAlgorithm],
        isDarkMode: true,
      }));
    }
  };

  const toggleCompactMode = () => {
    if (antdState.isCompactMode) {
      setAntdState((prevState) => ({
        ...prevState,
        algorithm: antdState.isDarkMode ? [theme.darkAlgorithm] : [],
        isCompactMode: false,
      }));
    } else {
      setAntdState((prevState) => ({
        ...prevState,
        algorithm: antdState.isDarkMode
          ? [theme.darkAlgorithm, theme.compactAlgorithm]
          : [theme.compactAlgorithm],
        isCompactMode: true,
      }));
    }
  };

  return (
    <>
      <Flex justify="start" style={{ height: "100%" }}>
        {tabRecoilState.items.length > 0 ? (
          <Popconfirm
            title={"안내"}
            description={"정말로 모든 탭을 닫으시겠습니까?"}
            okText="확인"
            cancelText="취소"
            placement="bottomLeft"
            okType="primary"
            onConfirm={() => {
              setTabRecoilState({ items: [] });
            }}
          >
            <TaskTrekWhiteLogo
              {...TaskTrekLogoProps}
              height={antdState.isCompactMode ? "56px" : "64px"}
            />
          </Popconfirm>
        ) : (
          <TaskTrekWhiteLogo
            {...TaskTrekLogoProps}
            height={antdState.isCompactMode ? "56px" : "64px"}
          />
        )}

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["3"]}
          items={items}
          style={{ flex: 1, minWidth: 0, marginLeft: "20px" }}
        />
        <Space>
          <Space>
            <a href="#">
              <Avatar
                icon={antdState.isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                onClick={toggleDarkMode}
              />
            </a>
            <a href="#">
              <Avatar icon={<CompressOutlined />} onClick={toggleCompactMode} />
            </a>
            <a href="#">
              <Tooltip placement="bottom" title={"설정"} arrow>
                <Avatar icon={<SettingOutlined />} />
              </Tooltip>
            </a>
            <a href="#">
              <Tooltip placement="bottom" title={"알림"} arrow>
                <Avatar icon={<BellOutlined />} />
              </Tooltip>
            </a>
          </Space>
          <DashboardNavbarProfile />
        </Space>
      </Flex>
    </>
  );
};

export default DashboardNavbar;
