import React from "react";
import { Button, Card, Flex, Tooltip, Typography } from "antd";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  FormOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { antdSiderState } from "./recoil/antdSiderState";
import { antdRecoilState } from "./recoil/antdRecoilState";
import { useRecoilState } from "recoil";

const CloudRightSider: React.FC = () => {
  const [siderState, setSiderState] = useRecoilState(antdSiderState);
  const [recoilState] = useRecoilState(antdRecoilState);

  const handleClick = () => {
    setSiderState({ collapsed: true });
  };

  return (
    <>
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
              type="text"
              icon={<CheckCircleOutlined />}
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
        </Flex>
        {siderState.collapsed && (
          <Card
            style={{
              width: "100%",
              borderLeft: "0px",
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
    </>
  );
};

export default CloudRightSider;
