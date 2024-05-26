import {
  BellOutlined,
  DashboardOutlined,
  LoginOutlined,
  MoonOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Menu,
  MenuProps,
  Popover,
  Row,
  Space,
} from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const CloudProfileContent: React.FC = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/");
  };

  return (
    <>
      <Button
        block
        type="text"
        style={{ textAlign: "start" }}
        icon={<UserOutlined />}
      >
        내 정보
      </Button>
      <Button
        block
        type="text"
        style={{ textAlign: "start" }}
        icon={<DashboardOutlined />}
      >
        대시보드
      </Button>
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      <Button block icon={<LoginOutlined />} onClick={onLogout}>
        로그아웃
      </Button>
    </>
  );
};

const CloudNavbar: React.FC = () => {
  const items: MenuProps["items"] = [
    { key: 1, label: "Home" },
    { key: 2, label: "Admin" },
  ];

  return (
    <Row>
      <Col span={22}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Col>
      <Col
        span={2}
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Space>
          <a href="#">
            <Avatar icon={<MoonOutlined />} />
          </a>
          <a>
            <Avatar icon={<BellOutlined />} />
          </a>
          <Popover
            placement="bottomRight"
            title={"프로필"}
            content={<CloudProfileContent />}
            trigger={"click"}
            overlayStyle={{ width: "12vw" }}
          >
            <Avatar
              style={{
                backgroundColor: "#87d068",
                cursor: "pointer",
                marginLeft: "12px",
              }}
              icon={<UserOutlined />}
            />
          </Popover>
        </Space>
      </Col>
    </Row>
  );
};

export default CloudNavbar;