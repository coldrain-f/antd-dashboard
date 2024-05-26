import { BellOutlined, MoonOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Menu, MenuProps, Popover, Row, Space } from "antd";
import React from "react";

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
            title={"Profile"}
            content={"Content"}
            trigger={"click"}
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
