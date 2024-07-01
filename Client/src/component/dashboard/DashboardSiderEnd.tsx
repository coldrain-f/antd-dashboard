import React, { useState } from "react";
import {
  Button,
  Card,
  Collapse,
  ConfigProvider,
  Divider,
  Drawer,
  Flex,
  List,
  Space,
  Tooltip,
  Typography,
  theme,
} from "antd";
import {
  BarsOutlined,
  CalendarOutlined,
  CaretRightOutlined,
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
              disabled
              type="text"
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
              disabled
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
              disabled
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
              disabled
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
              type={siderState.collapsed ? "link" : "text"}
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
                  퀵 링크
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
          >
            <Typography.Title
              level={5}
              style={{ padding: 0, margin: 0, marginBottom: 12 }}
            >
              <Space>
                <BarsOutlined />
                생산성 관리
              </Space>
            </Typography.Title>

            <Space direction="vertical">
              <Typography.Link
                href="https://calendar.google.com/calendar"
                target="_blank"
              >
                ⦁ Google Calendar
              </Typography.Link>
              <Typography.Link
                href="https://calendar.google.com/calendar/u/0/r/tasks"
                target="_blank"
              >
                ⦁ Google Tasks
              </Typography.Link>
              <Typography.Link
                href="https://keep.google.com/u/0/"
                target="_blank"
              >
                ⦁ Google Keep
              </Typography.Link>
            </Space>

            <Divider />
            <Typography.Title
              level={5}
              style={{ padding: 0, margin: 0, marginBottom: 12 }}
            >
              <Space>
                <BarsOutlined />
                개발 도우미
              </Space>
            </Typography.Title>
            <Space direction="vertical">
              <Typography.Link
                href="https://gemini.google.com/app"
                target="_blank"
              >
                ⦁ Google Gemini
              </Typography.Link>
              <Typography.Link
                href="https://ant.design/components/overview/"
                target="_blank"
              >
                ⦁ Antd Design
              </Typography.Link>
              <Typography.Link href="https://apexcharts.com/" target="_blank">
                ⦁ Apex Charts
              </Typography.Link>
              <Typography.Link href="https://apexcharts.com/" target="_blank">
                ⦁ Icon Font
              </Typography.Link>
            </Space>
          </Card>
        )}
      </Flex>
    </Sider>
  );
};

export default DashboardSiderEnd;
