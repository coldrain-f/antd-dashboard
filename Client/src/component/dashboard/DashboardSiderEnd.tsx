import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Drawer,
  Flex,
  Tooltip,
  Typography,
  theme,
} from "antd";
import {
  CalendarOutlined,
  CheckSquareOutlined,
  CommentOutlined,
  FormOutlined,
  LinkOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { useRecoilState } from "recoil";
import { antdSiderState } from "../../recoil/antdSiderState";
import { antdRecoilState } from "../../recoil/antdRecoilState";
import Sider from "antd/es/layout/Sider";

const DashboardSiderEnd: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [siderState, setSiderState] = useRecoilState(antdSiderState);
  const [recoilState] = useRecoilState(antdRecoilState);

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setSiderState({ collapsed: true });
    // showDrawer();
  };

  return (
    <Sider
      width={60}
      collapsedWidth={340}
      // style={{
      //   background: colorBgContainer,
      //   position: "absolute",
      //   top: 65,
      //   right: 0,
      //   bottom: 0,
      //   zIndex: 100,
      // }}
      collapsed={siderState.collapsed}
    >
      <Drawer
        title="할 일"
        onClose={onClose}
        open={open}
        mask={false}
        maskClosable={true}
        keyboard={true}
        width={327}
      ></Drawer>
      <Flex style={{ height: "100%" }}>
        <Flex
          justify="start"
          vertical
          style={{
            // #141414
            // #303030 border
            height: "100%",
            width: "60px",
            backgroundColor: recoilState.isDarkMode ? "#141414" : "#fafafa",
            borderLeft: recoilState.isDarkMode
              ? "1px solid #363636"
              : "1px solid #e0e0e0",
            borderRight: recoilState.isDarkMode
              ? "1px solid #363636"
              : "1px solid #e0e0e0",
          }}
        >
          <Tooltip title={"할 일"} placement={"left"}>
            <Button
              type={siderState.collapsed ? "link" : "text"}
              icon={<CheckSquareOutlined />}
              block
              size="large"
              style={{
                borderRadius: 0,
                height: "45px",
              }}
              onClick={handleClick}
            />
          </Tooltip>
          <Tooltip title={"메모"} placement={"left"}>
            <Button
              type="text"
              icon={<FormOutlined />}
              block
              size="large"
              style={{
                borderRadius: 0,
                height: "45px",
              }}
              onClick={handleClick}
            />
          </Tooltip>
          <Tooltip title={"일정"} placement={"left"}>
            <Button
              type="text"
              icon={<CalendarOutlined />}
              block
              size="large"
              style={{
                borderRadius: 0,
                height: "45px",
              }}
              onClick={handleClick}
            />
          </Tooltip>

          <Divider
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <Tooltip title={"채팅"} placement={"left"}>
            <Button
              type="text"
              icon={<CommentOutlined />}
              block
              size="large"
              style={{
                borderRadius: 0,
                height: "45px",
              }}
              onClick={handleClick}
            />
          </Tooltip>
          <Tooltip title={"퀵 링크"} placement={"left"}>
            <Button
              type="text"
              icon={<LinkOutlined />}
              block
              size="large"
              style={{
                borderRadius: 0,
                height: "45px",
              }}
              onClick={handleClick}
            />
          </Tooltip>
        </Flex>
        {siderState.collapsed && (
          <Card
            style={{
              width: "100%",
              borderLeft: "0px",
              borderRadius: 0,
            }}
            title={
              <Typography>
                <Typography.Title level={5} style={{ margin: 0 }}>
                  할 일
                </Typography.Title>
              </Typography>
            }
            extra={
              <Button
                type={"text"}
                icon={<MenuUnfoldOutlined />}
                style={{
                  borderRadius: 0,
                }}
                onClick={() => {
                  setSiderState({ collapsed: false });
                }}
              />
            }
          ></Card>
        )}
      </Flex>
    </Sider>
  );
};

export default DashboardSiderEnd;
