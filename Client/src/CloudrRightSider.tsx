import React from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Flex,
  Row,
  Tooltip,
  Typography,
} from "antd";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  FormOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

import { antdSiderState } from "./recoil/antdSiderState";
import { useRecoilState } from "recoil";

const CloudRightSider: React.FC = () => {
  const [siderState, setSiderState] = useRecoilState(antdSiderState);

  const handleClick = () => {
    setSiderState({ collapsed: true });
  };

  return (
    <>
      {!siderState.collapsed ? (
        <Flex justify="start" vertical style={{ height: "100%" }}>
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
      ) : (
        <>
          <Card
            style={{ height: "100%" }}
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
                icon={<CloseOutlined />}
                style={{
                  borderRadius: 0,
                }}
                onClick={() => {
                  setSiderState({ collapsed: false });
                }}
              />
            }
          ></Card>
        </>
      )}
    </>
  );
};

export default CloudRightSider;
